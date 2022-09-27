import './style/index.scss';

import TodoCard from '@/components/TodoCard';
import TodoColumn from '@/components/TodoColumn';
import TodoColumnFab from '@/components/TodoColumnFab';
import TodoHeader from '@/components/TodoHeader';
import api from '@/helpers/api';
import { subscribeCountStore } from '@/helpers/subscribe';
import IColumn from '@/interface/IColumn';
import ICount from '@/interface/ICount';
import ITodo from '@/interface/ITodo';
import actionStore, { DRAW_ACTION, SET_ACTIONS } from '@/store/actionStore';
import countStore, { SET_COUNTS } from '@/store/todoCountStore';
import { $$ } from '@/utils/dom';

const root = $$('root') as HTMLElement;

const createTodos = (columnId: string, todos: ITodo[]) => {
  todos.forEach((todo: ITodo) => {
    const newTodo = new TodoCard({
      uuid: todo.uuid,
      columnId: columnId,
      title: todo.title,
      content: todo.content,
      status: todo.status,
      date: todo.date,
    });
    $$(columnId)?.insertAdjacentHTML('beforeend', newTodo.render());
    newTodo.registerEventListener();
  });
};

const createColumns = async (columns: IColumn[], todos: ITodo[]) => {
  const columnWrapperElement = document.createElement('article');
  columnWrapperElement.classList.add('column-wrapper');
  root.appendChild(columnWrapperElement);

  const newCounts = [] as ICount[];

  columns.forEach((column: { uuid: string; title: string }) => {
    const todoData = todos.filter(
      (todo: ITodo) => todo.status === column.title,
    );

    const todoColumn = new TodoColumn({
      uuid: column.uuid,
      status: column.title,
      title: column.title,
      date: new Date(),
      count: todoData.length,
    });

    newCounts.push({
      uuid: column.uuid,
      count: todoData.length,
      clicked: false,
    });

    columnWrapperElement.insertAdjacentHTML('beforeend', todoColumn.render());
    todoColumn.registerEventListener();
    createTodos(todoColumn.uuid, todoData);
  });

  countStore.dispatch({ type: SET_COUNTS, newCounts: newCounts });
};

const app = async () => {
  const response = await api.fetch();
  if (!response) return;

  const header = new TodoHeader({
    email: response.email,
    avatarurl: response.avatarurl,
  });
  const todoColumnFab = new TodoColumnFab();

  subscribeCountStore();

  root.insertAdjacentHTML('afterend', todoColumnFab.render());
  root.insertAdjacentHTML('afterend', header.render());
  todoColumnFab.registerEventListener();
  header.registerEventListener();
  actionStore.dispatch({ type: SET_ACTIONS, newActions: response.actions });
  actionStore.dispatch({ type: DRAW_ACTION });
  createColumns(response.columns, response.todos);
};

app();
