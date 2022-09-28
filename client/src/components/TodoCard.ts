import TodoForm from './TodoForm';

import GlobalModal from '@/components/GlobalModal';
import { API_SUCCESS_CODE } from '@/constants/statusCode';
import api from '@/helpers/api';
import ITodo from '@/interface/ITodo';
import actionStore, { ADD_ACTION } from '@/store/actionStore';
import countStore, { MINUS_COUNT } from '@/store/todoCountStore';
import { $$ } from '@/utils/dom';

export default class TodoCard {
  uuid: string;

  columnId: string;

  title: string;

  content: string;

  status: string;

  date: Date;

  element: HTMLElement | null;

  constructor(state: ITodo) {
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
      title: this.title,
      status: this.status,
      type: 'delete',
      subject: 'todo',
    };

    actionStore.dispatch({
      type: ADD_ACTION,
      payload: actionData,
    });

    const newAction = await api.postActionFetch(actionData);
    const status = await api.deleteTodoFetch(this.uuid);

    if (newAction && status === API_SUCCESS_CODE) {
      countStore.dispatch({ type: MINUS_COUNT, payload: this.columnId });

      if (this.element) {
        this.element.remove();
      }
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
          <div class="card__delete--img"></div>
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
