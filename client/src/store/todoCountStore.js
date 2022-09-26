import createStore from '@/store';

export const ADD_COUNT = 'ADD_COUNT';
export const MINUS_COUNT = 'MINUS_COUNT';
export const SET_COUNTS = 'SET_COUNTS';

const reducer = (state, action) => {
  switch (action.type) {
    case ADD_COUNT:
      return [...state, action.payload];
    case MINUS_COUNT:
      return state;
    case SET_COUNTS:
      return action.counts;
    default:
      return state;
  }
};

const initialState = [];

const countStore = createStore(initialState, reducer);

export default countStore;
