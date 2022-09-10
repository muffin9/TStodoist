import GlobalModal from '@/components/GlobalModal';
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

  handleOnClick = () => {
    this.element?.addEventListener('click', e => {
      const target = e.target as HTMLElement;
      if (target.classList.contains('card__delete--img')) {
        const modalContent = `${this.title} 삭제하시겠습니까?`;
        const globalModal = new GlobalModal(
          modalContent,
          this.handleDeleteTodo,
        );
        globalModal.render();
        globalModal.registerEventListener();
      }
    });
  };

  handleDeleteTodo = () => {
    // data 삭제는 실제 데이터 사용할때.. 적용
    // view 에서 해당 카드 삭제
    this.element?.remove();
  };

  handleMouseOver = () => {
    this.element?.addEventListener('mouseover', e => {
      console.log(this.element);
      const target = e.target as HTMLElement;
      if (target.classList.contains('card__delete--img')) {
        this.element?.classList.add('todo-delete-border');
      }
    });
  };

  handleMouseOut = () => {
    this.element?.addEventListener('mouseout', e => {
      const target = e.target as HTMLElement;
      if (target.classList.contains('card__delete--img')) {
        this.element?.classList.remove('todo-delete-border');
      }
    });
  };

  registerEventListener = () => {
    this.element = $$(this.id);
    this.handleMouseOver();
    this.handleMouseOut();
    this.handleOnClick();
  };

  render = () => {
    return /* html */ `
      <article class="card-wrapper" id="${this.id}">
        <div class="card__delete">
          <img class="card__delete--img" />
        </div>
        <h1 class="card__title">
        ${this.title}
        </h1>
        <div class="card__content">
        ${this.content}
        </div>
        <div class="card__writer">
        author by web
        </div>
      </article>
    `;
  };
}
