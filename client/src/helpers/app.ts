import TodoCard from '@/components/TodoCard';
import TodoColumn from '@/components/TodoColumn';
import IColumn from '@/interface/IColumn';
import ICount from '@/interface/ICount';
import ITodo from '@/interface/ITodo';
import countStore, { SET_COUNTS } from '@/store/todoCountStore';
import { $$ } from '@/utils/dom';

export const createTodos = (columnId: string, todos: ITodo[]) => {
  if (!columnId || todos.length === 0) return;

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

export const setInitColumns = async (
  root: HTMLElement,
  columns: IColumn[],
  todos: ITodo[],
) => {
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
      title: column.title,
      status: column.title,
      date: new Date(),
      count: todoData.length,
    });

    newCounts.push({
      uuid: column.uuid,
      status: column.title,
      count: todoData.length,
      clicked: false,
    });

    columnWrapperElement.insertAdjacentHTML('beforeend', todoColumn.render());
    todoColumn.registerEventListener();
    createTodos(todoColumn.uuid, todoData);
  });

  countStore.dispatch({ type: SET_COUNTS, newCounts: newCounts });
};
