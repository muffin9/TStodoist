import createStore from '@/store';

export const ADD_ACTION = 'ADD_ACTION';
export const GET_ACTINS = 'GET_ACTINS';

const reducer = (state, action) => {
  switch (action.type) {
    case ADD_ACTION:
      return [...state, action.payload];
    case GET_ACTINS:
      return state;
    default:
      return state;
  }
};

const initialState = [];

const actionStore = createStore(initialState, reducer);

export default actionStore;
