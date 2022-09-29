import IAction from '@/interface/IAction';
import createStore from '@/store';

export const ADD_ACTION = 'ADD_ACTION';
export const DRAW_ACTION = 'DRAW_ACTION';
export const SET_ACTIONS = 'SET_ACTIONS';

const reducer = (
  state: IAction[],
  action: { type: string; payload: string; newActions: IAction[] },
) => {
  switch (action.type) {
    case ADD_ACTION:
      return [...state, action.payload];
    case DRAW_ACTION:
      return state;
    case SET_ACTIONS:
      return action.newActions;
    default:
      return state;
  }
};

const initialState: Array<IAction> = [];

const actionStore = createStore(initialState, reducer);

export default actionStore;
