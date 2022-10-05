import './style/index.scss';

import TodoColumnFab from '@/components/TodoColumnFab';
import TodoHeader from '@/components/TodoHeader';
import api from '@/helpers/api';
import { setInitColumns } from '@/helpers/app';
import { subscribeAction } from '@/helpers/subscribeAction';
import { subscribeCount } from '@/helpers/subscribeCount';
import { subscribeUser } from '@/helpers/subsribeUser';
import actionStore, { DRAW_ACTION, SET_ACTIONS } from '@/store/actionStore';
import userStore, { SET_USER } from '@/store/userStore';
import { $$ } from '@/utils/dom';
import { eventDragHandler } from '@/utils/eventDragHandler';

const root = $$('root') as HTMLElement;

const init = async () => {
  eventDragHandler();
  const response = await api.fetch();
  if (!response) return;

  const header = new TodoHeader();

  subscribeUser();
  subscribeAction();
  subscribeCount();

  userStore.dispatch({
    type: SET_USER,
    payload: { email: response.email, avatarurl: response.avatarurl },
  });

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
