import TodoForm from './TodoForm';

import actionStore, { ADD_ACTION } from '@/actionStore';
import GlobalModal from '@/components/GlobalModal';
import api from '@/helpers/api';
import ITodo from '@/interface/ITodo';
import { $$ } from '@/utils/dom';
import { newID } from '@/utils/util';

export default class TodoCard {
  id: number;

  uuid: string;

  columnId: number;

  title: string;

  content: string;

  status: string;

  date: Date;

  element: HTMLElement | null;

  constructor(state: ITodo) {
    this.id = state.id;
    this.uuid = state.uuid;
    this.columnId = state.columnId;
    this.title = state.title;
    this.content = state.content;
    this.status = state.status;
    this.date = state.date;
    this.element = null;
  }

  handleDeleteIconClick = () => {
    if (this.element) {
      const $deleteIcon = this.element.querySelector('.card__delete--img');
      if ($deleteIcon) {
        $deleteIcon.addEventListener('click', () => {
          const modalContent = `${this.title} 삭제하시겠습니까?`;
          const globalModal = new GlobalModal(
            modalContent,
            this.handleDeleteTodo,
          );
          globalModal.addBody();
          globalModal.registerEventListener();
        });
      }
    }
  };

  handleOnDbClick = () => {
    if (this.element) {
      const $todoCard = this.element;
      this.element.addEventListener('dblclick', () => {
        const cardData = {
          id: this.id,
          uuid: this.uuid,
          columnId: this.columnId,
          title: this.title,
          content: this.content,
          status: this.status,
          type: 'modify',
        };

        const todoForm = new TodoForm(cardData, {
          element: this.element,
          registerEventListener: this.registerEventListener,
        });

        $todoCard.outerHTML = todoForm.render();
        todoForm.registerEventListener();
      });
    }
  };

  handleDeleteTodo = async () => {
    const actionData = {
      uuid: newID(),
      title: this.title,
      status: this.status,
      type: 'delete',
    };

    actionStore.dispatch({
      type: ADD_ACTION,
      payload: actionData,
    });

    const responseStatus = await Promise.all([
      api.postActionFetch(actionData),
      api.deleteTodoFetch(this.id),
    ]);

    // view 에서 해당 카드 삭제
    if (responseStatus.every(status => status === 200)) {
      this.element?.remove();
    }
  };

  handleDeleteIconMouseOver = () => {
    if (this.element) {
      const $deleteIcon = this.element.querySelector('.card__delete--img');
      const $todoCard = this.element;
      if ($deleteIcon) {
        $deleteIcon.addEventListener('mouseover', () => {
          $todoCard.classList.toggle('todo-delete-border');
        });
      }
    }
  };

  handleDeleteIconMouseOut = () => {
    if (this.element) {
      const $deleteIcon = this.element.querySelector('.card__delete--img');
      const $todoCard = this.element;
      if ($deleteIcon) {
        $deleteIcon.addEventListener('mouseout', () => {
          $todoCard.classList.toggle('todo-delete-border');
        });
      }
    }
  };

  registerEventListener = () => {
    this.element = $$(this.uuid);
    this.handleDeleteIconMouseOver();
    this.handleDeleteIconMouseOut();
    this.handleDeleteIconClick();
    this.handleOnDbClick();
  };

  render = () => {
    return /* html */ `
      <article class="card-wrapper" id="${this.uuid}">
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
