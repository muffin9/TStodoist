import { $ } from '@/utils/dom';
import { newID } from '@/utils/util';

export default class TodoAddForm {
  id: string;

  title: string;

  content: string;

  constructor() {
    this.id = newID();
    this.title = '';
    this.content = '';
  }

  checkValue = () => {
    const registerButton = $(
      `.input-${this.id} .input--register`,
    ) as HTMLButtonElement;

    if (this.title && this.content) {
      registerButton.disabled = false;
    } else {
      registerButton.disabled = true;
    }
  };

  handleOnRegisterBtn = () => {
    $(`.input-${this.id} .input--register`)?.addEventListener('click', () => {
      console.log('clicked');
    });

    // set TodoCard
    // Column 뒤에 붙이기
    // TodoAddForm remove
    // set Action
    // add count
  };

  handleOnChangeTitle = () => {
    $(`.input-${this.id} .input-title`)?.addEventListener(
      'change',
      (e: any) => {
        this.title = e.target.value;
        this.checkValue();
      },
    );
  };

  handleOnChangeContent = () => {
    $(`.input-${this.id} .input-content`)?.addEventListener(
      'change',
      (e: any) => {
        this.content = e.target.value;
        this.checkValue();
      },
    );
  };

  handleOnRemoveForm = () => {
    $(`.input-${this.id} .input--cancel`)?.addEventListener('click', () => {
      $(`.input-${this.id}`)?.remove();
    });
  };

  registerEventListener = () => {
    this.handleOnChangeTitle();
    this.handleOnChangeContent();
    this.handleOnRegisterBtn();
    this.handleOnRemoveForm();
  };

  render = () => {
    return /* html */ `
        <article class="input-wrapper todo-border input-${this.id}">
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
