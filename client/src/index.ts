import './style/index.scss';

import TodoCard from './components/TodoCard';

import TodoColumn from '@/components/TodoColumn';
import TodoHeader from '@/components/TodoHeader';
import { todoColumnMap } from '@/constants/todo';
import api from '@/helpers/api';
import ITodo from '@/interface/ITodo';
import { $$ } from '@/utils/dom';

const columnMap = new Map();
const root = $$('root') as HTMLElement;

const createTodos = (column: any, todos: ITodo[]) => {
  todos.forEach((todo: any) => {
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

const setTodos = (datas: ITodo[]) => {
  datas.forEach((data: any) => {
    const status = data.status;
    const values = columnMap.get(status);
    if (values) {
      const newValues = { id: values.id, data: [...values.data, data] };
      columnMap.set(status, newValues);
    } else {
      const newValues = { id: data.id, data: [data] };
      columnMap.set(status, newValues);
    }
  });
};

const createColumns = async () => {
  const columnWrapperElement = document.createElement('article');
  columnWrapperElement.classList.add('column-wrapper');
  root.appendChild(columnWrapperElement);

  const datas = await api.fetch();
  setTodos(datas);

  for (const [key, values] of columnMap.entries()) {
    const column = new TodoColumn({
      id: values.id,
      uuid: `column-${values.id}`,
      status: key,
      title: todoColumnMap.get(key),
    });
    const todoData = values.data;
    column.setCount(todoData.length);
    columnWrapperElement.insertAdjacentHTML('beforeend', column.render());
    column.registerEventListener();
    createTodos(column, todoData);
  }
};

const app = () => {
  const header = new TodoHeader();
  root.insertAdjacentHTML('afterend', header.render());
  header.registerEventListener();
  createColumns();
};

app();
