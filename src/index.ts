import './style/index.scss';

import TodoColumn from '@/components/TodoColumn';
import TodoHeader from '@/components/TodoHeader';

const app = () => {
  const root = document.getElementById('root')!;
  const header = new TodoHeader();
  const column = new TodoColumn();
  root.insertAdjacentHTML('afterend', column.render());
  root.insertAdjacentHTML('afterend', header.render());
  header.handleEventListener();
};

app();
