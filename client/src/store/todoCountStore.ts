import ICount from '@/interface/ICount';
import createStore from '@/store';
import { DragPayload } from '@/types/count';

export const ADD_COUNT = 'ADD_COUNT';
export const MINUS_COUNT = 'MINUS_COUNT';
export const SET_COUNTS = 'SET_COUNTS';
export const UPDATE_COUNT = 'UPDATE_COUNT';

const reducer = (
  state: ICount[],
  action: {
    type: string;
    payload: DragPayload | string;
    newCounts: ICount[];
  },
) => {
  const existCount = state.find(count => count.uuid === action.payload);

  switch (action.type) {
    case ADD_COUNT:
      if (!existCount)
        return [...state, { uuid: action.payload, count: 0, clicked: true }];
      else
        return state.map(countObj => {
          if (countObj.uuid !== action.payload)
            return { ...countObj, clicked: false };
          return { ...countObj, count: countObj.count + 1, clicked: true };
        });
    case MINUS_COUNT:
      if (!existCount)
        return [...state, { uuid: action.payload, count: 0, clicked: true }];
      return state.map(countObj => {
        if (countObj.uuid !== action.payload)
          return { ...countObj, clicked: false };
        return { ...countObj, count: countObj.count - 1, clicked: true };
      });
    case UPDATE_COUNT:
      const { status, endStatus } = action.payload as DragPayload;

      return state.map(countObj => {
        if (countObj.status === status)
          return { ...countObj, count: countObj.count - 1 };
        else if (countObj.status === endStatus)
          return { ...countObj, count: countObj.count + 1 };
        else return { ...countObj };
      });
    case SET_COUNTS:
      return action.newCounts;
    default:
      return state;
  }
};

const initialState: Array<ICount> = [];

const countStore = createStore(initialState, reducer);

export default countStore;
