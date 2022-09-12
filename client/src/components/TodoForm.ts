import TodoCard from './TodoCard';

import api from '@/helpers/api';
import { $, $$ } from '@/utils/dom';
import { newID } from '@/utils/util';

export default class TodoForm {
  id: number;

  uuid: string;

  columnId: number;

  element: HTMLElement | null;

  title: string;

  content: string;

  status: string;

  type: string;

  addCount?: () => void;

  constructor(
    state: {
      id?: any;
      uuid?: string;
      columnId: number;
      title?: string;
      content?: string;
      status: string;
      type: string;
    },
    addCount?: () => void,
  ) {
    this.id = state.id;
    this.uuid = state.uuid || newID();
    this.columnId = state.columnId;
    this.element = null;
    this.title = state.title || '';
    this.content = state.content || '';
    this.status = state.status;
    this.type = state.type;
    this.addCount = addCount;
  }

  setInitValue = () => {
    if (this.content) {
      const $textArea = this.element?.querySelector(
        '.input-content',
      ) as HTMLTextAreaElement;

      $textArea!.value = this.content;
    }
  };

  checkValue = () => {
    const registerButton = this.element?.querySelector(
      '.input--register',
    ) as HTMLButtonElement;

    if (this.title && this.content) {
      registerButton.disabled = false;
      registerButton.classList.remove('bg-sky-blue');
      registerButton.classList.add('bg-dark-blue');
    } else {
      registerButton.disabled = true;
      registerButton.classList.remove('bg-dark-blue');
      registerButton.classList.add('bg-sky-blue');
    }
  };

  heightResize = () => {
    const target = this.element?.querySelector('.input-content') as HTMLElement;
    target.style.height = 'auto';
    target.style.height = `${target.scrollHeight + 6}px`;
  };

  handleOnChangeValue = () => {
    this.element?.addEventListener('keyup', e => {
      const target = e.target as HTMLInputElement;
      if (target.classList.contains('input-title')) {
        this.title = target.value;
      } else if (target.classList.contains('input-content')) {
        this.content = target.value;
        this.heightResize();
      }
      this.checkValue();
    });
  };

  handleOnClick = () => {
    this.element?.addEventListener('click', async e => {
      const target = e.target as HTMLInputElement;
      if (target.classList.contains('input--cancel')) {
        this.element?.remove();
      } else if (target.classList.contains('input--register')) {
        // set TodoCard
        const columnElement = $(`[data-column-status=${this.status}]`);

        const cardData = {
          id: this.id,
          uuid: this.uuid,
          columnId: this.columnId,
          title: this.title,
          content: this.content,
          status: this.status,
          date: new Date().toString(),
        };

        const todoId = this.type === 'modify' ? this.id : 0;
        const responseStatus = await api.postOrPatchFetch(todoId, cardData);

        if (responseStatus === 200) {
          const newCard = new TodoCard(cardData);

          // Column 뒤에 붙이기
          columnElement
            ?.querySelector('.column')
            ?.insertAdjacentHTML('afterend', newCard.render());
          newCard.registerEventListener();
          // TodoForm remove

          this.element?.remove();
          // set Action

          // add count
          this.addCount?.();
        }
      }
    });
  };

  registerEventListener = () => {
    this.element = $$(this.uuid);
    this.setInitValue();
    this.checkValue();
    this.handleOnChangeValue();
    this.handleOnClick();
  };

  render = () => {
    return /* html */ `
        <article class="input-wrapper todo-border" id="${this.uuid}">
            <input class="input-title" placeholder="제목을 입력하세요"
            value=${this.title}>
            <textarea class="input-content" placeholder="내용을 입력하세요" maxlength ='500'></textarea>
            <div class="input-button-wrapper">
                <button class="input__button input--cancel" type="button">취소</button>
                <button class="input__button input--register bg-sky-blue" type="button" disabled>
                ${this.type === 'add' ? '등록' : '수정'}</button>
            </div>
        </article>
    `;
  };
}
