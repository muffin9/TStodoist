import actionStore, { ADD_ACTION } from '@/actionStore';
import TodoAction from '@/components/TodoAction';
import { $ } from '@/utils/dom';

export default class TodoHeader {
  clicked: boolean;

  constructor() {
    this.clicked = false;
    actionStore.subscribe(ADD_ACTION, () => {
      this.addAction();
    });
  }

  addAction = () => {
    const lastValue = actionStore.getState().slice(-1)[0];
    const todoAction = new TodoAction(lastValue);
    const $action = $('.action');

    if ($action) {
      $action.insertAdjacentHTML('afterend', todoAction.render());
    }
  };

  handleCancelClick = () => {
    const $actionClose = $('.action--close');

    if ($actionClose) {
      $actionClose.addEventListener('click', () => {
        this.clicked = false;
        const $actionWrapper = $('.action-wrapper');

        if ($actionWrapper) {
          $actionWrapper.classList.toggle('action-translated');
        }
      });
    }
  };

  handleMenuClick = () => {
    const $headerMenu = $('.header__menu');
    if ($headerMenu) {
      $headerMenu.addEventListener('click', () => {
        this.clicked = true;
        if (this.clicked) {
          const $actionWrapper = $('.action-wrapper') as HTMLElement;

          if ($actionWrapper) {
            $actionWrapper.classList.toggle('action-translated');
          }
        }
      });
    }
  };

  registerEventListener = () => {
    this.handleMenuClick();
    this.handleCancelClick();
  };

  render = () => {
    return /* html */ `
        <header class="header__main">
            <h1 class="header__logo">TO-DO-LIST</h1>
            <nav class="header__menu">
              <div></div>
              <div></div>
              <div></div>
            </nav>
        </header>
        <article class="action-wrapper action-translated">
          <button class="action--close">X</button>
          <div class="action"></div>
        </article>
    `;
  };
}
