import './style/index.scss';

import TodoCard from './components/TodoCard';
import { dummyColumns } from './mocks/column';
import { dummyTodos } from './mocks/todos';

import TodoColumn from '@/components/TodoColumn';
import TodoHeader from '@/components/TodoHeader';
import { $, $$ } from '@/utils/dom';

interface IColumn {
  id: number;
  title: string;
  isDeleted: boolean;
}

export interface ITodo {
  id: number;
  title: string;
  content: string;
  status: string;
  userId?: number;
  date: string;
}

type Todo = 'todo' | 'doing' | 'done';

const root = $$('root')!;

const createTodos = (column: any, todos: ITodo[]) => {
  todos.forEach((todo: ITodo) => {
    const newTodo = new TodoCard(
      todo.id,
      todo.title,
      todo.content,
      todo.status,
      todo.date,
    );
    $(`.${column.title}`)!.insertAdjacentHTML('beforeend', newTodo.render());
    newTodo.handleEventListener();
  });
};

const createColumns = () => {
  const columnWrapperElement = document.createElement('article');
  columnWrapperElement.classList.add('column-wrapper');
  root.appendChild(columnWrapperElement);

  dummyColumns.forEach((data: IColumn) => {
    const column = new TodoColumn(data.id, data.title, data.isDeleted);
    const todoData = dummyTodos[data.title as Todo];
    column.setCount(todoData.length);
    columnWrapperElement.insertAdjacentHTML('beforeend', column.render());
    column.registerEventListener();
    createTodos(column, todoData);
  });
};

const app = () => {
  const header = new TodoHeader();
  root.insertAdjacentHTML('afterend', header.render());
  header.handleEventListener();
  createColumns();
};

app();
