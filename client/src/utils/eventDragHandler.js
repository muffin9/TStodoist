import { $$ } from '@/utils/dom';

const dragElement = $$('drag');
let copyElement = null; // 마우스를 따라다니는 복사된 카드
let shadowElement = null; // 잔상카드
let firstStatus = '';
let status = '';

const setInitValues = () => {
  copyElement = null;
  shadowElement = null;
  firstStatus = null;
  status = null;
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

    firstStatus = clickedCardElement.parentNode.getAttribute('data-status');
    status = firstStatus;

    if (target.className === 'card__delete--img') {
      return;
    }

    shadowElement = clickedCardElement;
    shadowElement.classList.add('spectrum');
    copyElement = clickedCardElement.cloneNode(true);

    dragElement.appendChild(copyElement);
    console.log(window.scrollY, clickedCardElement.getBoundingClientRect().y);
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
      status = columnList.getAttribute('data-status');
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

const handleBodyMouseUp = () => {
  document.body.addEventListener('mouseup', e => {
    if (shadowElement) {
      shadowElement.classList.remove('spectrum');
    }

    if (e.target.className !== 'card-wrapper' || status === firstStatus) {
      copyElement?.remove();
      setInitValues();
      return;
    }

    if (copyElement) {
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
