import './style/index.scss';
import TodoColumnFab from '@/components/TodoColumnFab';
import TodoHeader from '@/components/TodoHeader';
import api from '@/helpers/api';
import { setInitColumns } from '@/helpers/app';
import { subscribeAction } from '@/helpers/subscribeAction';
import { subscribeCount } from '@/helpers/subscribeCount';
import actionStore, { DRAW_ACTION, SET_ACTIONS } from '@/store/actionStore';
import { $$ } from '@/utils/dom';

const root = $$('root') as HTMLElement;

const init = async () => {
  const response = await api.fetch();
  if (!response) return;

  const header = new TodoHeader({
    email: response.email,
    avatarurl: response.avatarurl,
  });

  subscribeAction();
  subscribeCount();

  root.insertAdjacentHTML('beforeend', header.render());
  header.registerEventListener();

  actionStore.dispatch({ type: SET_ACTIONS, newActions: response.actions });
  actionStore.dispatch({ type: DRAW_ACTION });
  setInitColumns(root, response.columns, response.todos);

  const todoColumnFab = new TodoColumnFab();
  root.insertAdjacentHTML('beforeend', todoColumnFab.render());
  todoColumnFab.registerEventListener();
};

init();
