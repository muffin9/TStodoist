import TodoCard from './TodoCard';

import api from '@/helpers/api';
import IForm from '@/interface/IForm';
import actionStore, { ADD_ACTION } from '@/store/actionStore';
import countStore, { ADD_COUNT } from '@/store/todoCountStore';
import { $$ } from '@/utils/dom';

export default class TodoForm {
  uuid: string;

  columnId: string;

  title: string;

  content: string;

  status: string;

  type: string;

  element: HTMLElement | null;

  previousCard?: {
    element: HTMLElement | null;
    registerEventListener: () => void;
  };

  constructor(
    state: IForm,
    previousCard?: {
      element: HTMLElement | null;
      registerEventListener: () => void;
    },
  ) {
    this.uuid = state.uuid;
    this.columnId = state.columnId;
    this.title = state.title || '';
    this.content = state.content || '';
    this.status = state.status;
    this.type = state.type;
    this.element = null;
    this.previousCard = previousCard;
  }

  setInitValue = () => {
    if (this.element && this.content) {
      const $textArea = this.element.querySelector(
        '.input-content',
      ) as HTMLTextAreaElement;

      $textArea.value = this.content;
    }
  };

  checkValue = () => {
    if (this.element) {
      const $registerButton = this.element.querySelector(
        '.input--register',
      ) as HTMLButtonElement;

      if (this.title && this.content) {
        $registerButton.disabled = false;
        $registerButton.classList.remove('bg-sky-blue');
        $registerButton.classList.add('bg-dark-blue');
      } else {
        $registerButton.disabled = true;
        $registerButton.classList.remove('bg-dark-blue');
        $registerButton.classList.add('bg-sky-blue');
      }
    }
  };

  heightResize = () => {
    if (this.element) {
      const $inputContent = this.element.querySelector(
        '.input-content',
      ) as HTMLTextAreaElement;

      $inputContent.style.height = 'auto';
      $inputContent.style.height = `${$inputContent.scrollHeight + 6}px`;
    }
  };

  handleOnChangeValue = () => {
    if (this.element) {
      this.element.addEventListener('keyup', e => {
        const target = e.target as HTMLInputElement;
        if (target.classList.contains('input-title')) {
          this.title = target.value;
        } else if (target.classList.contains('input-content')) {
          this.content = target.value;
          this.heightResize();
        }
        this.checkValue();
      });
    }
  };

  handleCancelClick = () => {
    if (this.element) {
      const $cancelButton = this.element.querySelector('.input--cancel');
      const $formElement = this.element;
      if ($cancelButton) {
        $cancelButton.addEventListener('click', () => {
          if (this.type === 'modify' && this.previousCard?.element) {
            $formElement.outerHTML = this.previousCard.element.outerHTML;
            this.previousCard.registerEventListener();
            return;
          } else {
            $formElement.remove();
          }
        });
      }
    }
  };

  handleRegisterClick = () => {
    if (this.element) {
      const $registerButton = this.element.querySelector('.input--register');
      const $formElement = this.element;
      if ($registerButton) {
        $registerButton.addEventListener('click', async () => {
          const $columnElement = $$(this.columnId);

          const cardData = {
            columnId: this.columnId,
            title: this.title,
            content: this.content,
            status: this.status,
            type: this.type,
            date: new Date(),
          };

          const actionData = {
            title: this.title,
            content: this.content,
            status: this.status,
            type: this.type,
            subject: 'todo',
          };

          let todoId = '';
          if (this.type === 'modify') {
            todoId = this.uuid;
          }

          const newAction = await api.postActionFetch(actionData);
          const newTodo = await api.postOrPatchTodoFetch(todoId, cardData);

          if (newTodo && newAction) {
            // set Action
            actionStore.dispatch({ type: ADD_ACTION, payload: newAction });
            // response todo
            const newCard = new TodoCard(newTodo);

            // Column 뒤에 붙이기
            $columnElement
              ?.querySelector('.column')
              ?.insertAdjacentHTML('afterend', newCard.render());
            newCard.registerEventListener();

            if (this.type === 'add') {
              countStore.dispatch({ type: ADD_COUNT, payload: this.columnId });
            }

            $formElement.remove();
          }
        });
      }
    }
  };

  registerEventListener = () => {
    this.element = $$(this.uuid);
    this.setInitValue();
    this.checkValue();
    this.handleOnChangeValue();
    this.handleCancelClick();
    this.handleRegisterClick();
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
