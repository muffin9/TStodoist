import { $$ } from '@/utils/dom';
import { newID } from '@/utils/util';

export default class TodoAddForm {
  id: string;

  element: HTMLElement | null;

  title: string;

  content: string;

  constructor() {
    this.id = newID();
    this.element = null;
    this.title = '';
    this.content = '';
  }

  checkValue = () => {
    const registerButton = this.element?.querySelector(
      '.input--register',
    ) as HTMLButtonElement;

    if (this.title && this.content) {
      registerButton.disabled = false;
    } else {
      registerButton.disabled = true;
    }
  };

  handleOnChangeValue = () => {
    this.element?.addEventListener('change', e => {
      const target = e.target as HTMLInputElement;
      if (target.classList.contains('input-title')) {
        this.title = target.value;
      } else if (target.classList.contains('input-content')) {
        this.content = target.value;
      }
      this.checkValue();
    });
  };

  handleOnClick = () => {
    this.element?.addEventListener('click', e => {
      const target = e.target as HTMLInputElement;
      if (target.classList.contains('input--cancel')) {
        this.element?.remove();
      } else if (target.classList.contains('input--register')) {
        // set TodoCard
        // Column 뒤에 붙이기
        // TodoAddForm remove
        // set Action
        // add count
      }
    });
  };

  registerEventListener = () => {
    this.element = $$(this.id);
    this.handleOnChangeValue();
    this.handleOnClick();
  };

  render = () => {
    return /* html */ `
        <article class="input-wrapper todo-border" id="${this.id}">
            <input class="input-title" placeholder="제목을 입력하세요" />
            <textarea class="input-content" placeholder="내용을 입력하세요" maxlength ='500'></textarea>
            <div class="input-button-wrapper">
                <button class="input__button input--cancel" type="button">취소</button>
                <button class="input__button input--register bg-sky-blue" type="button" disabled>등록</button>
            </div>
        </article>
    `;
  };
}
