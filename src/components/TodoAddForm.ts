export default class TodoAddForm {
  title: string;

  content: string;

  constructor() {
    this.title = '';
    this.content = '';
  }

  handleOnRegisterBtn = () => {
    // set TodoCard
    // Column 뒤에 붙이기
    // TodoAddForm remove
    // set Action
    // add count
  };

  registerEventListener = () => {
    this.handleOnRegisterBtn();
  };

  render = () => {
    return /* html */ `
        <article class="input-wrapper todo-border input-${this.title}">
            <input class="input-header" placeholder="제목을 입력하세요" />
            <textarea class="input-content" placeholder="내용을 입력하세요" maxlength ='500'></textarea>
            <div class="input-button-wrapper">
                <button class="input__button input--cancel" type="button">취소</button>
                <button class="input__button input--register bg-sky-blue" type="button" disabled>등록</button>
            </div>
        </article>
    `;
  };
}
