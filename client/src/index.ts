import './style/index.scss';

import TodoCard from './components/TodoCard';
import { dummyColumns } from './mocks/column';
import { dummyTodos } from './mocks/todos';

import TodoColumn from '@/components/TodoColumn';
import TodoHeader from '@/components/TodoHeader';
import IColumn from '@/interface/IColumn';
import ITodo from '@/interface/ITodo';
import { $$ } from '@/utils/dom';
import { newID } from '@/utils/util';

type Todo = 'todo' | 'doing' | 'done';

const root = $$('root')!;

const createTodos = (column: any, todos: ITodo[]) => {
  todos.forEach((todo: ITodo) => {
    const newTodo = new TodoCard({
      id: newID(),
      title: todo.title,
      content: todo.content,
      status: todo.status,
      date: todo.date,
    });
    $$(column.id)!.insertAdjacentHTML('beforeend', newTodo.render());
    newTodo.registerEventListener();
  });
};

const createColumns = () => {
  const columnWrapperElement = document.createElement('article');
  columnWrapperElement.classList.add('column-wrapper');
  root.appendChild(columnWrapperElement);

  dummyColumns.forEach((data: IColumn) => {
    const column = new TodoColumn({
      id: newID(),
      title: data.title,
      isDeleted: data.isDeleted,
    });
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
