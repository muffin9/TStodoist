import userStore from '@/store/userStore';
import { $ } from '@/utils/dom';

export default class TodoHeader {
  handleOutSideClick = () => {
    const $actionContainer = $('.action-container');

    if ($actionContainer) {
      $actionContainer.addEventListener('click', e => {
        const $actionWrapper = $('.action-wrapper');
        const target = e.target as HTMLDivElement;

        if ($actionWrapper && target.classList.contains('action-overlay')) {
          $actionContainer.classList.remove('action-overlay');
          $actionWrapper.classList.toggle('action-translated');
        }
      });
    }
  };

  handleCancelClick = () => {
    const $actionClose = $('.action--close');

    if ($actionClose) {
      $actionClose.addEventListener('click', () => {
        const $actionWrapper = $('.action-wrapper');

        if ($actionWrapper) {
          const $actionContainer = $('.action-container');
          $actionContainer?.classList.remove('action-overlay');
          $actionWrapper.classList.toggle('action-translated');
        }
      });
    }
  };

  handleMenuClick = () => {
    const $headerMenu = $('.header__menu');
    if ($headerMenu) {
      $headerMenu.addEventListener('click', () => {
        const $actionWrapper = $('.action-wrapper');

        if ($actionWrapper) {
          const $actionContainer = $('.action-container');
          $actionContainer?.classList.add('action-overlay');
          $actionWrapper.classList.toggle('action-translated');
        }
      });
    }
  };

  registerEventListener = () => {
    this.handleMenuClick();
    this.handleCancelClick();
    this.handleOutSideClick();
  };

  render = () => {
    const { email, avatarurl } = userStore.getState();
    return /* html */ `
        <header class="header__main">
            <h1 class="header__logo">
              <a class="header__link" href="/">TO-DO-LIST</a>
            </h1>
            <div class="header__infos">
              <div class="header__user">
                <img src="${avatarurl}" class="header__avatar" alt="프로필 이미지" />
                <h3 class="header__email">${email}</h3>
                <a href="/logout">
                  <button class="header__logout-btn">로그아웃</button>
                </a>
              </div>
              <nav class="header__menu">
                <div></div>
                <div></div>
                <div></div>
              </nav>
            </div>
        </header>
        <article class="action-wrapper action-translated">
          <div class="action--close"></div>
          <div class="action"></div>
        </article>
    `;
  };
}
