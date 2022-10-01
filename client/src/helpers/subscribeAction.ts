import TodoAction from '@/components/TodoAction';
import IAction from '@/interface/IAction';
import actionStore, {
  ADD_ACTION,
  SET_ACTIONS,
  DRAW_ACTION,
} from '@/store/actionStore';
import { $ } from '@/utils/dom';

const drawAction = () => {
  const $action = $('.action');
  const actions = actionStore.getState();

  if ($action) $action.innerHTML = '';

  actions.forEach((action: IAction) => {
    const todoAction = new TodoAction(action);

    if ($action) {
      $action.insertAdjacentHTML('beforeend', todoAction.render());
      todoAction.registerEventListener();
    }
  });
};

const addAction = () => {
  const lastValue = actionStore.getState().slice(-1)[0];
  const todoAction = new TodoAction(lastValue);
  const $action = $('.action');

  if ($action) {
    $action.insertAdjacentHTML('afterbegin', todoAction.render());
    todoAction.registerEventListener();
  }
};

export const subscribeAction = () => {
  actionStore.subscribe(SET_ACTIONS, () => {});

  actionStore.subscribe(DRAW_ACTION, () => {
    drawAction();
  });

  actionStore.subscribe(ADD_ACTION, () => {
    addAction();
  });
};
