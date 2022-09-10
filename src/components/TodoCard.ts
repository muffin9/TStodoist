import closeImg from '@/assets/close.png';
import ITodo from '@/interface/ITodo';
import { $$ } from '@/utils/dom';

export default class TodoCard {
  id: string;

  title: string;

  element: HTMLElement | null;

  content: string;

  status: string;

  date: string;

  constructor(state: ITodo) {
    this.id = state.id;
    this.element = null;
    this.title = state.title;
    this.content = state.content;
    this.status = state.status;
    this.date = state.date;
  }

  handleOnMouseEnter = () => {
    this.element?.addEventListener('mouseenter', e => {
      const target = e.target as HTMLElement;
      if (target.classList.contains('card__delete')) {
        console.log('해당 카드 색상 변경 예정');
      }
    });
  };

  registerEventListener = () => {
    this.element = $$(this.id);
    this.handleOnMouseEnter();
  };

  render = () => {
    return /* html */ `
      <article class="card-wrapper" id="${this.id}">
        <div class="card__delete">
          <img src=${closeImg} alt="closeImage"/>
        </div>
        <h1 class="card__title">
        Github 공부하기
        </h1>
        <div class="card__content">
        add, commit, push
        </div>
        <div class="card__writer">
        author by web
        </div>
      </article>
    `;
  };
}
