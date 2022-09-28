import ICount from '@/interface/ICount';
import countStore, {
  ADD_COUNT,
  MINUS_COUNT,
  SET_COUNTS,
} from '@/store/todoCountStore';
import { $$ } from '@/utils/dom';

const updateViewColumnCount = () => {
  // countStore.getState() 조회후 객체에서 clicked 가 true 인 것만 변경해주기.
  const changedColumnCount = countStore
    .getState()
    .find((count: ICount) => count.clicked === true);
  const columnElement = $$(`${changedColumnCount.uuid}`);

  if (columnElement) {
    const columnCountElement = columnElement.querySelector('.column__count');

    if (columnCountElement) {
      columnCountElement.textContent = changedColumnCount.count;
    }
  }
};

export const subscribeCount = () => {
  countStore.subscribe(SET_COUNTS, () => {});

  countStore.subscribe(ADD_COUNT, () => {
    updateViewColumnCount();
  });

  countStore.subscribe(MINUS_COUNT, () => {
    updateViewColumnCount();
  });
};
