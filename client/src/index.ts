import './style/index.scss';

import actionStore, { DRAW_ACTION, SET_ACTIONS } from '@/actionStore';
import TodoCard from '@/components/TodoCard';
import TodoColumn from '@/components/TodoColumn';
import TodoColumnFab from '@/components/TodoColumnFab';
import TodoHeader from '@/components/TodoHeader';
import { getColumnMap, setColumnMap } from '@/constants/todo';
import api from '@/helpers/api';
import IColumn from '@/interface/IColumn';
import ITodo from '@/interface/ITodo';
import { $$ } from '@/utils/dom';

const root = $$('root') as HTMLElement;

const createTodos = (column: IColumn, todos: ITodo[]) => {
  todos.forEach((todo: ITodo) => {
    const newTodo = new TodoCard({
      id: todo.id,
      uuid: todo.uuid,
      columnId: column.id,
      title: todo.title,
      content: todo.content,
      status: todo.status,
      date: todo.date,
    });
    $$(column.uuid)!.insertAdjacentHTML('beforeend', newTodo.render());
    newTodo.registerEventListener();
  });
};

const createColumns = async (columns: IColumn[], todos: ITodo[]) => {
  const columnWrapperElement = document.createElement('article');
  columnWrapperElement.classList.add('column-wrapper');
  root.appendChild(columnWrapperElement);

  columns.forEach((column: { id: number; title: string }) => {
    setColumnMap(column.title);
    const todoColumn = new TodoColumn({
      id: column.id,
      uuid: `column-${column.id}`,
      status: column.title,
      title: getColumnMap(column.title),
      date: new Date(),
    });

    const todoData = todos.filter(
      (todo: ITodo) => todo.status === column.title,
    );

    todoColumn.setCount(todoData.length);
    columnWrapperElement.insertAdjacentHTML('beforeend', todoColumn.render());
    todoColumn.registerEventListener();
    createTodos(todoColumn, todoData);
  });
};

const app = async () => {
  const response = await api.fetch();
  const header = new TodoHeader({
    email: response.email,
    avatarurl: response.avatarurl,
  });
  const todoColumnFab = new TodoColumnFab();

  root.insertAdjacentHTML('afterend', todoColumnFab.render());
  root.insertAdjacentHTML('afterend', header.render());
  todoColumnFab.registerEventListener();
  header.registerEventListener();
  actionStore.dispatch({ type: SET_ACTIONS, newActions: response.actions });
  actionStore.dispatch({ type: DRAW_ACTION });
  createColumns(response.columns, response.todos);
};

app();
