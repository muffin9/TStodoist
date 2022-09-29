import IAction from '@/interface/IAction';
import createStore from '@/store';

export const GET_USER = 'GET_USER';
export const SET_USER = 'SET_USER';

const reducer = (
  state: IAction[],
  action: { type: string; payload: { email: string; avatarurl: string } },
) => {
  switch (action.type) {
    case GET_USER:
      return state;
    case SET_USER:
      return action.payload;
    default:
      throw new Error('userStore type or payload Error');
  }
};

const initialState: Array<IAction> = [];

const userStore = createStore(initialState, reducer);

export default userStore;
