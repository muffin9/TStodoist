import ICount from '@/interface/ICount';
import countStore, {
  ADD_COUNT,
  MINUS_COUNT,
  SET_COUNTS,
  UPDATE_COUNT,
} from '@/store/todoCountStore';

const updateViewColumnCount = () => {
  // 각 column-list의 uuid column__count 를 찾아서 state의 카운트로 변경해주기
  const columnElements = document.querySelectorAll('.column-list');
  columnElements.forEach(columnElement => {
    const countElement = columnElement.querySelector('.column__count');
    const uuid = columnElement.getAttribute('id');
    const countObj = countStore
      .getState()
      .find((count: ICount) => count.uuid === uuid);

    if (countObj && countElement) {
      countElement.textContent = countObj.count;
    }
  });
};

export const subscribeCount = () => {
  countStore.subscribe(SET_COUNTS, () => {});

  countStore.subscribe(ADD_COUNT, () => {
    updateViewColumnCount();
  });

  countStore.subscribe(MINUS_COUNT, () => {
    updateViewColumnCount();
  });

  countStore.subscribe(UPDATE_COUNT, () => {
    updateViewColumnCount();
  });
};
