import TodoAction from '@/components/TodoAction';
import { $ } from '@/utils/dom';

export default class TodoHeader {
  clicked: boolean;

  constructor() {
    this.clicked = false;
  }

  handleEventListener = () => {
    $('.header__menu')!.addEventListener('click', () => {
      this.clicked = true;
      if (this.clicked) {
        const todoAction = new TodoAction();
        $('.header__main')?.insertAdjacentHTML('afterend', todoAction.render());
        todoAction.handleEventListener();
      }
    });
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
    `;
  };
}
