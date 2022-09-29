import { $ } from '@/utils/dom';

export default class GlobalModal {
  content: string;

  handleSubmit: () => void;

  constructor(content: string, handleSubmit: () => void) {
    this.content = content;
    this.handleSubmit = handleSubmit;
  }

  handleOnClick = () => {
    const $modalWrapper = $('.modal-wrapper');
    if ($modalWrapper) {
      $modalWrapper.addEventListener('click', e => {
        const target = e.target as HTMLButtonElement;
        if (target.classList.contains('modal-button--ok')) {
          this.handleSubmit();
          this.handleRemoveModal();
        } else if (target.classList.contains('modal-button--cancel')) {
          this.handleRemoveModal();
        }
      });
    }
  };

  handleRemoveModal = () => {
    const $overlay = $('.overlay');
    if ($overlay) {
      $overlay.remove();
    }
  };

  registerEventListener = () => {
    this.handleOnClick();
  };

  addBody = () => {
    document.body.insertAdjacentHTML('beforeend', this.render());
  };

  render() {
    return /* html */ `
      <div class="overlay">
        <div class="modal-wrapper">
            <header class="modal-header">
                <img class="modal-header--close" />
            </header>
            <div class="modal-content">${this.content}</div>
            <div class="modal-button">
                <button class="modal-button--ok">확인</button>
                <button class="modal-button--cancel">취소</button>
            </div>
        </div>
      </div>
    `;
  }
}
