import TodoForm from './TodoForm';

import { TYPE_MODIFY, TYPE_DELETE, SUBJECT_TODO } from '@/constants/actionType';
import { API_SUCCESS_CODE } from '@/constants/statusCode';
import api from '@/helpers/api';
import { createGlobalModal } from '@/helpers/globalModal';
import ITodo from '@/interface/ITodo';
import actionStore, { ADD_ACTION } from '@/store/actionStore';
import countStore, { MINUS_COUNT } from '@/store/todoCountStore';
import userStore from '@/store/userStore';
import { getToday } from '@/utils/date';
import { $$ } from '@/utils/dom';

export default class TodoCard {
  uuid: string;

  columnId: string;

  title: string;

  content: string;

  status: string;

  date: string;

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
          createGlobalModal(
            `${this.title} 삭제하시겠습니까?`,
            this.handleDeleteTodo,
          );
        });
      }
    }
  };

  handleOnDbClick = () => {
    if (this.element) {
      const $clickedclickedTodoCard = this.element;
      this.element.addEventListener('dblclick', () => {
        const cardData = {
          uuid: this.uuid,
          columnId: this.columnId,
          title: this.title,
          content: this.content,
          status: this.status,
          type: TYPE_MODIFY,
        };

        const todoForm = new TodoForm(cardData, {
          element: this.element,
          registerEventListener: this.registerEventListener,
        });

        $clickedclickedTodoCard.outerHTML = todoForm.render();
        todoForm.registerEventListener();
      });
    }
  };

  handleDeleteTodo = async () => {
    const actionData = {
      subject: SUBJECT_TODO,
      title: this.title,
      status: this.status,
      type: TYPE_DELETE,
      date: getToday(),
    };

    const newAction = await api.postActionFetch(actionData);
    const status = await api.deleteTodoFetch(this.uuid);

    if (newAction && status === API_SUCCESS_CODE) {
      actionStore.dispatch({ type: ADD_ACTION, payload: newAction });
      countStore.dispatch({ type: MINUS_COUNT, payload: this.columnId });

      if (this.element) {
        this.element.remove();
      }
    }
  };

  handleDeleteIconMouseEvent = () => {
    if (this.element) {
      const $deleteIcon = this.element.querySelector('.card__delete--img');
      const $clickedTodoCard = this.element;
      if ($deleteIcon) {
        $deleteIcon.addEventListener('mouseover', () => {
          $clickedTodoCard.classList.toggle('todo-delete-border');
        });
        $deleteIcon.addEventListener('mouseout', () => {
          $clickedTodoCard.classList.toggle('todo-delete-border');
        });
      }
    }
  };

  registerEventListener = () => {
    this.element = $$(this.uuid);
    this.handleDeleteIconMouseEvent();
    this.handleDeleteIconClick();
    this.handleOnDbClick();
  };

  render = () => {
    return /* html */ `
      <article class="card-wrapper" id="${this.uuid}">
        <div class="card-inner">
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
            author by ${userStore.getState() && userStore.getState().email}
            </div>
        </div>
      </article>
    `;
  };
}
