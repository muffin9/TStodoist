import { TYPE_DRAG, SUBJECT_TODO } from '@/constants/actionType';
import api from '@/helpers/api';
import actionStore, { ADD_ACTION } from '@/store/actionStore';
import countStore, { UPDATE_COUNT } from '@/store/todoCountStore';
import { getToday } from '@/utils/date';
import { $$ } from '@/utils/dom';

const dragElement = $$('drag');
let copyElement = null; // 마우스를 따라다니는 복사된 카드
let shadowElement = null; // 잔상카드
let status = '';
let endStatus = '';

const setInitValues = () => {
  copyElement = null;
  shadowElement = null;
  status = null;
  endStatus = null;
};

const isBefore = (element1, element2) => {
  if (element1.parentNode === element2.parentNode) {
    let cur = element1.previousSibling;
    while (cur) {
      if (cur === element2) return true;
      cur = cur.previousSibling;
    }
  }

  return false;
};

const handleBodyMouseDown = () => {
  document.body.addEventListener('mousedown', e => {
    const target = e.target;
    const clickedCardElement = target.closest("[data-drag='true']");

    if (!clickedCardElement) return;

    status = clickedCardElement.parentNode.getAttribute('data-status');
    endStatus = status;

    if (target.className === 'card__delete--img') {
      return;
    }

    shadowElement = clickedCardElement;
    shadowElement.classList.add('spectrum');
    copyElement = clickedCardElement.cloneNode(true);

    dragElement.appendChild(copyElement);
    dragElement.style.left =
      clickedCardElement.getBoundingClientRect().x + 'px';
    dragElement.style.top =
      window.scrollY +
      clickedCardElement.getBoundingClientRect().y +
      clickedCardElement.getBoundingClientRect().y / 6 +
      'px';
  });
};

const handleBodyMouseMove = () => {
  document.body.addEventListener('mousemove', e => {
    if (!copyElement) return;

    const { screenX, screenY } = e;
    dragElement.hidden = true; // 잠깐 가려놓기.
    const elemBelow = document.elementFromPoint(screenX, screenY);

    if (!elemBelow) {
      dragElement.hidden = false;
      return;
    }

    const cardElement = elemBelow.closest('.card-wrapper');
    const columnList = elemBelow.closest('.column-list');

    dragElement.hidden = false;

    dragElement.style.left =
      window.scrollX + screenX - dragElement.offsetWidth / 2 + 'px';
    dragElement.style.top =
      window.scrollY + screenY - dragElement.offsetHeight + 'px';

    if (columnList) {
      endStatus = columnList.getAttribute('data-status');
    } else return;

    if (!cardElement) {
      // 컬럼 위로 드래그앤드롭 했을때.
      columnList.appendChild(shadowElement);
      return;
    }

    if (isBefore(shadowElement, cardElement)) {
      cardElement.parentNode.insertBefore(shadowElement, cardElement);
    } else if (cardElement.parentNode) {
      cardElement.parentNode.insertBefore(
        shadowElement,
        cardElement.nextSibling,
      );
    }
  });
};

const handleDataUpdate = async (uuid, title) => {
  const actionData = {
    subject: SUBJECT_TODO,
    title,
    status: status,
    endStatus: endStatus,
    type: TYPE_DRAG,
    date: getToday(),
  };

  countStore.dispatch({ type: UPDATE_COUNT, payload: { status, endStatus } });

  const newTodo = await api.patchStatusTodoFetch(uuid, endStatus);
  const newAction = await api.postActionFetch(actionData);

  if (newAction && newTodo) {
    actionStore.dispatch({ type: ADD_ACTION, payload: newAction });
  }
};

const handleBodyMouseUp = () => {
  document.body.addEventListener('mouseup', e => {
    if (shadowElement) {
      shadowElement.classList.remove('spectrum');
    }

    if (status === endStatus) {
      copyElement?.remove();
      setInitValues();
      return;
    }

    if (copyElement) {
      const uuid = copyElement.getAttribute('id');
      const title = copyElement
        .querySelector('.card__title')
        .textContent.trim();

      handleDataUpdate(uuid, title);

      copyElement.remove();
      setInitValues();
    }
  });
};

export const eventDragHandler = () => {
  handleBodyMouseDown();
  handleBodyMouseMove();
  handleBodyMouseUp();
};
