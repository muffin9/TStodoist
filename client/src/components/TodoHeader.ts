import TodoAction from '@/components/TodoAction';
import IAction from '@/interface/IAction';
import IUser from '@/interface/IUser';
import actionStore, {
  ADD_ACTION,
  SET_ACTIONS,
  DRAW_ACTION,
} from '@/store/actionStore';
import { $ } from '@/utils/dom';

export default class TodoHeader {
  email: string;

  avatarurl: string;

  constructor({ email, avatarurl }: IUser) {
    this.email = email;
    this.avatarurl = avatarurl;

    actionStore.subscribe(SET_ACTIONS, () => {});
    actionStore.subscribe(DRAW_ACTION, () => {
      this.drawAction();
    });
    actionStore.subscribe(ADD_ACTION, () => {
      this.addAction();
    });
  }

  drawAction = () => {
    const $action = $('.action');
    const actions = actionStore.getState();
    if ($action) $action.innerHTML = '';

    actions.forEach((action: IAction) => {
      const todoAction = new TodoAction(action);
      if ($action) {
        $action.insertAdjacentHTML('beforeend', todoAction.render());
        todoAction.registerEventListener();
      }
    });
  };

  addAction = () => {
    const lastValue = actionStore.getState().slice(-1)[0];
    const todoAction = new TodoAction(lastValue);
    const $action = $('.action');

    if ($action) {
      $action.insertAdjacentHTML('beforeend', todoAction.render());
      todoAction.registerEventListener();
    }
  };

  handleOutSideClick = () => {
    const $actionContainer = $('.action-container');
    $actionContainer?.addEventListener('click', (e: any) => {
      const $actionWrapper = $('.action-wrapper');

      if ($actionWrapper && e.target.classList.contains('action-overlay')) {
        $actionContainer?.classList.remove('action-overlay');
        $actionWrapper.classList.toggle('action-translated');
      }
    });
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
        const $actionWrapper = $('.action-wrapper') as HTMLElement;

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
    return /* html */ `
        <header class="header__main">
            <h1 class="header__logo">
              <a class="header__link" href="/">TO-DO-LIST</a>
            </h1>
            <div class="header__infos">
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
            </div>
        </header>
        <article class="action-wrapper action-translated">
          <div class="action--close"></div>
          <div class="action"></div>
        </article>
    `;
  };
}
