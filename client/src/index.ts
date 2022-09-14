import './style/index.scss';

import LoginComponent from './components/LoginComponent';
import TodoCard from './components/TodoCard';

import TodoColumn from '@/components/TodoColumn';
import TodoHeader from '@/components/TodoHeader';
import { todoColumnMap } from '@/constants/todo';
import api from '@/helpers/api';
import IColumn from '@/interface/IColumn';
import ITodo from '@/interface/ITodo';
import { $$ } from '@/utils/dom';

const root = $$('root') as HTMLElement;

const createTodos = (column: IColumn, todos: ITodo[]) => {
  todos.forEach((todo: ITodo) => {
    const newTodo = new TodoCard({
      id: todo.id,
      uuid: `todo-${todo.id}`,
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

const createColumns = async () => {
  const columnWrapperElement = document.createElement('article');
  columnWrapperElement.classList.add('column-wrapper');
  root.appendChild(columnWrapperElement);

  const response = await api.fetch();

  response.columns.forEach((column: { id: number; title: string }) => {
    const todoColumn = new TodoColumn({
      id: column.id,
      uuid: `column-${column.id}`,
      status: column.title,
      title: todoColumnMap.get(column.title),
      date: new Date(),
    });

    const todoData = response.todos.filter(
      (todo: ITodo) => todo.status === column.title,
    );

    todoColumn.setCount(todoData.length);
    columnWrapperElement.insertAdjacentHTML('beforeend', todoColumn.render());
    todoColumn.registerEventListener();
    createTodos(todoColumn, todoData);
  });
};

const app = () => {
  // 로그인 뷰 보여주기 ? 투두 뷰 보여주기 ?
  // 세션 체킹 -> 로그인 정보가 있으면 투두 보여주기.
  // 로그인 정보가 없으면 로그인 뷰 보여주기.
  const isLoggedIn = false; // 임시 로그인 처리 변수.
  if (isLoggedIn) {
    const header = new TodoHeader();
    root.insertAdjacentHTML('afterend', header.render());
    header.registerEventListener();
    createColumns();
  } else {
    const loginComponent = new LoginComponent();
    root.insertAdjacentHTML('afterend', loginComponent.render());
  }
};

app();
