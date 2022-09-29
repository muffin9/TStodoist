import TodoForm from '@/components/TodoForm';
import {
  SUBJECT_COLUMN,
  TYPE_ADD,
  TYPE_DELETE,
  TYPE_MODIFY,
} from '@/constants/actionType';
import { DUPLICATE_COLUMN_TEXT } from '@/constants/modal';
import { API_SUCCESS_CODE } from '@/constants/statusCode';
import api from '@/helpers/api';
import { createGlobalModal } from '@/helpers/globalModal';
import IColumn from '@/interface/IColumn';
import actionStore, { ADD_ACTION } from '@/store/actionStore';
import { $, $$ } from '@/utils/dom';

export default class TodoColumn {
  uuid: string;

  title: string;

  changeTitle: string;

  status: string;

  date: Date;

  count: number;

  element: HTMLElement | null;

  onModify: boolean;

  onAddForm: boolean;

  constructor(state: IColumn) {
    this.uuid = state.uuid;
    this.title = state.title;
    this.changeTitle = '';
    this.status = state.status;
    this.date = state.date;
    this.count = state.count || 0;
    this.element = null;
    this.onModify = false;
    this.onAddForm = false;
  }

  toggleModifyValue = () => {
    this.onModify = !this.onModify;
  };

  handlePlusButtonClick = () => {
    if (this.element) {
      const $clickedTodoColumn = this.element;
      this.element.addEventListener('click', (e: MouseEvent) => {
        if (e.target instanceof HTMLElement) {
          if (!e.target.classList.contains('column__add')) return;
          const $addForm = $clickedTodoColumn.querySelector('.input-wrapper');
          if ($addForm) {
            $addForm.remove();
            return;
          }

          const $newAddForm = new TodoForm({
            uuid: `todoForm-${this.uuid}`,
            columnId: this.uuid,
            status: this.status,
            type: TYPE_ADD,
          });

          $clickedTodoColumn
            .querySelector('.column')
            ?.insertAdjacentHTML('afterend', $newAddForm.render());

          $newAddForm.registerEventListener();
        }
      });
    }
  };

  handleOnClickOutside = (e: MouseEvent) => {
    if (e.target instanceof HTMLElement) {
      if (e.target.id === `${this.title}`) return;
      this.toggleModifyValue();
      this.changeColumnDivElement();
    }
  };

  handleColumnDbClick = () => {
    if (this.element) {
      this.element.addEventListener('dblclick', e => {
        if (e.target instanceof HTMLDivElement) {
          if (e.target.classList.contains('column__title')) {
            this.toggleModifyValue();
            this.changeColumnInputElement();
          }
        }
      });
    }
  };

  handleOnChange = () => {
    if (this.element) {
      this.element.addEventListener('change', e => {
        if (e.target instanceof HTMLInputElement) {
          this.changeTitle = e.target.value;
        }
      });
    }
  };

  changeColumnInputElement = () => {
    if (this.element) {
      const titleElement = this.element.querySelector('.column__title');
      if (!this.onModify) return;
      if (titleElement) {
        titleElement.outerHTML = `<input id="${this.title}" class="column__title" type="input" maxlength="50" />`;
        document.addEventListener('click', this.handleOnClickOutside, true);
        this.handleOnChange();
      }
    }
  };

  checkDuplicateTitle = () => {
    if (this.element) {
      const modalElement = $('.modal-wrapper');
      const titleElement = this.element.querySelector('.column__title');

      if (titleElement && !modalElement && this.title === this.changeTitle) {
        createGlobalModal(DUPLICATE_COLUMN_TEXT, () => {});

        document.removeEventListener('click', this.handleOnClickOutside, true);
        titleElement.outerHTML = `<div class="column__title">${this.title}</div>`;
        this.changeTitle = '';

        return true;
      }
      return false;
    }
  };

  changeColumnDivElement = async () => {
    if (this.element) {
      const titleElement = this.element.querySelector('.column__title');
      if (titleElement) {
        if (this.changeTitle === '') return;
        if (this.checkDuplicateTitle()) return;

        const actionData = {
          subject: SUBJECT_COLUMN,
          title: this.changeTitle,
          status: this.status,
          type: TYPE_MODIFY,
        };

        const newAction = await api.postActionFetch(actionData);
        const newColumn = await api.postOrPatchColumnFetch(this.uuid, {
          title: this.changeTitle,
        });

        if (newColumn && newAction) {
          actionStore.dispatch({ type: ADD_ACTION, payload: newAction });
          this.title = newColumn.title;
        }

        titleElement.outerHTML = `<div class="column__title">${this.title}</div>`;
        this.changeTitle = '';
        document.removeEventListener('click', this.handleOnClickOutside, true);
      }
    }
  };

  handleDeleteColumn = async () => {
    const actionData = {
      subject: SUBJECT_COLUMN,
      title: this.title,
      status: this.status,
      type: TYPE_DELETE,
    };

    const newAction = await api.postActionFetch(actionData);
    const newColumnStatus = await api.deleteColumnFetch(this.uuid);

    if (newAction && newColumnStatus === API_SUCCESS_CODE) {
      actionStore.dispatch({ type: ADD_ACTION, payload: newAction });

      if (this.element) {
        this.element.remove();
      }
    }
  };

  handleDeleteIconClick = () => {
    if (this.element) {
      const $deleteIcon = this.element.querySelector('.column__delete');
      if ($deleteIcon) {
        $deleteIcon.addEventListener('click', () => {
          createGlobalModal(
            `<div>${this.title} 컬럼을 삭제하시겠습니까?<p class="modal-sub-title">⚠️ 연관된 Todo들이 모두 삭제됩니다.</p></div>`,
            this.handleDeleteColumn,
          );
        });
      }
    }
  };

  registerEventListener = () => {
    this.element = $$(this.uuid);
    this.handleColumnDbClick();
    this.handlePlusButtonClick();
    this.handleDeleteIconClick();
  };

  render = () => {
    return /* html */ `
    <div class="column-list" id="${this.uuid}">
      <nav class="column">
          <div class="column__left">
              <div class="column__title">${this.title}</div>
              <div class="column__count">${this.count}</div>
          </div>
          <div class="column__right">
            <button type="button" class="column__add"></button>
            <button type="button" class="column__delete"></button>
          </div>
      </nav>
    </div>
    `;
  };
}
