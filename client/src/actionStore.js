import createStore from '@/store';

export const ADD_ACTION = 'ADD_ACTION';
export const DRAW_ACTION = 'DRAW_ACTION';
export const SET_ACTION = 'SET_ACTION';

const reducer = (state, action) => {
  switch (action.type) {
    case ADD_ACTION:
      return [...state, action.payload];
    case DRAW_ACTION:
      return state;
    case SET_ACTION:
      return [...action.payload];
    default:
      return state;
  }
};

const initialState = [];

const actionStore = createStore(initialState, reducer);

export default actionStore;
