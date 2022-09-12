import { $ } from '@/utils/dom';

export default class GlobalModal {
  content: string;

  handleOk: () => void;

  constructor(content: string, handleOk: () => void) {
    this.content = content;
    this.handleOk = handleOk;
  }

  handleOnClick = () => {
    $('.modal-wrapper')?.addEventListener('click', e => {
      const target = e.target as HTMLButtonElement;
      if (target.classList.contains('modal-button--ok')) {
        this.handleOk();
        this.handleRemoveModal();
      } else if (target.classList.contains('modal-button--cancel')) {
        this.handleRemoveModal();
      }
    });
  };

  handleRemoveModal = () => {
    $('.overlay')?.remove();
    $('.modal-wrapper')?.remove();
  };

  registerEventListener = () => {
    this.handleOnClick();
  };

  render() {
    const globalModalHTML = /* html */ `
        <div class="overlay"></div>
        <div class="modal-wrapper">
            <header class="modal-header">
                <img class="modal-header--close">
                </img>
            </header>
            <div class="modal-content">${this.content}</div>
            <div class="modal-button">
                <button class="modal-button--ok">확인</button>
                <button class="modal-button--cancel">취소</button>
            </div>
        </div>
        
    `;
    document.body.insertAdjacentHTML('afterend', globalModalHTML);
  }
}