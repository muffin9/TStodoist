import actionStore, { ADD_ACTION, DRAW_ACTION } from '@/actionStore';
import TodoAction from '@/components/TodoAction';
import IAction from '@/interface/IAction';
import IUser from '@/interface/IUser';
import { $ } from '@/utils/dom';

export default class TodoHeader {
  clicked: boolean;

  email: string;

  avatarurl: string;

  actions: IAction[];

  constructor({ email, avatarurl }: IUser, actions: IAction[]) {
    this.clicked = false;
    this.email = email;
    this.avatarurl = avatarurl;
    this.actions = actions;
    actionStore.subscribe(DRAW_ACTION, () => {
      this.drawAction();
    });
    actionStore.subscribe(ADD_ACTION, () => {
      this.addAction();
    });
  }

  drawAction = async () => {
    const $action = $('.action');
    this.actions.forEach((action: IAction) => {
      const todoAction = new TodoAction(action);
      if ($action) {
        $action.insertAdjacentHTML('afterend', todoAction.render());
      }
    });
  };

  addAction = async () => {
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
            <div class="header__user">
              <img src="${this.avatarurl}" class="header__avatar" alt="프로필 이미지" />
              <h3 class="header__email">${this.email}</h3>
              <a href="/logout">
                <button class="header__logout-btn">로그아웃</button>
              </a>
            </div>
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
