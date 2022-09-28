import GlobalModal from '@/components/GlobalModal';
import TodoForm from '@/components/TodoForm';
import { DUPLICATE_COLUMN_TEXT } from '@/constants/modal';
import { API_SUCCESS_CODE } from '@/constants/statusCode';
import api from '@/helpers/api';
import IColumn from '@/interface/IColumn';
import actionStore, { ADD_ACTION } from '@/store/actionStore';
import { $, $$ } from '@/utils/dom';

export default class TodoColumn {
  uuid: string;

  title: string;

  status: string;

  date: Date;

  element: HTMLElement | null;

  changeTitle: string;

  count: number;

  onModify: boolean;

  onAddForm: boolean;

  constructor(state: IColumn) {
    this.uuid = state.uuid;
    this.title = state.title;
    this.status = state.status;
    this.date = state.date;
    this.element = null;
    this.changeTitle = '';
    this.onModify = false;
    this.onAddForm = false;
    this.count = state.count || 0;
  }

  toggleModifyValue = () => {
    this.onModify = !this.onModify;
  };

  handleColumnClick = () => {
    if (this.element) {
      this.element.addEventListener('click', e => {
        if (e.target instanceof HTMLElement) {
          if (e.target.classList.contains('column__add')) {
            const addForm = this.element?.querySelector('.input-wrapper');
            if (addForm) {
              addForm.remove();
              return;
            }

            const newAddForm = new TodoForm({
              uuid: `todoForm-${this.uuid}`,
              columnId: this.uuid,
              status: this.status,
              type: 'add',
            });

            this.element
              ?.querySelector('.column')!
              .insertAdjacentHTML('afterend', newAddForm.render());

            newAddForm.registerEventListener();
          }
        }
      });
    }
  };

  handleOnClickOutside = (e: Event) => {
    if (e.target instanceof HTMLElement) {
      if (e.target.id === `${this.title}`) return;
      this.toggleModifyValue();
      this.changeTitleElement();
    }
  };

  handleColumnDbClick = () => {
    if (this.element) {
      this.element.addEventListener('dblclick', e => {
        if (e.target instanceof Element) {
          if (e.target.classList.contains('column__title')) {
            this.toggleModifyValue();
            this.changeTitleElement();
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

  changeTitleElement = async () => {
    if (this.element) {
      const titleElement = this.element.querySelector('.column__title');

      if (titleElement) {
        if (this.onModify) {
          titleElement.outerHTML = `<input id="${this.title}" class="column__title" type="input" maxlength="50" />`;
          document.addEventListener('click', this.handleOnClickOutside, true);
          this.handleOnChange();
        } else {
          const modalElement = $('.modal-wrapper');
          if (!modalElement && this.title === this.changeTitle) {
            const modalContent = DUPLICATE_COLUMN_TEXT;
            const globalModal = new GlobalModal(modalContent, () => {});
            globalModal.addBody();
            globalModal.registerEventListener();

            document.removeEventListener(
              'click',
              this.handleOnClickOutside,
              true,
            );
            titleElement.outerHTML = `<div class="column__title">${this.title}</div>`;
            this.changeTitle = '';
            return;
          }

          if (this.changeTitle === '') return;

          const actionData = {
            title: this.changeTitle,
            status: this.status,
            type: 'modify',
            subject: 'column',
          };

          const newAction = await api.postActionFetch(actionData);
          const newColumn = await api.postOrPatchColumnFetch(this.uuid, {
            title: this.changeTitle,
          });

          if (newColumn.id && newAction) {
            // set Action
            actionStore.dispatch({ type: ADD_ACTION, payload: newAction });

            document.removeEventListener(
              'click',
              this.handleOnClickOutside,
              true,
            );

            this.title = newColumn.title;
            titleElement.outerHTML = `<div class="column__title">${newColumn.title}</div>`;
          } else {
            document.removeEventListener(
              'click',
              this.handleOnClickOutside,
              true,
            );
            titleElement.outerHTML = `<div class="column__title">${this.title}</div>`;
          }
          this.changeTitle = '';
        }
      }
    }
  };

  handleDeleteColumn = async () => {
    const actionData = {
      title: this.title,
      status: this.status,
      type: 'delete',
      subject: 'column',
    };

    const newAction = await api.postActionFetch(actionData);
    const newColumnStatus = await api.deleteColumnFetch(this.uuid);

    if (newAction && newColumnStatus === API_SUCCESS_CODE) {
      actionStore.dispatch({ type: ADD_ACTION, payload: newAction });
      this.element?.remove();
    }
  };

  handleDeleteIconClick = () => {
    if (this.element) {
      const $deleteIcon = this.element.querySelector('.column__delete');
      if ($deleteIcon) {
        $deleteIcon.addEventListener('click', () => {
          const modalContent = `<div>${this.title} 컬럼을 삭제하시겠습니까?<p class="modal-sub-title">⚠️ 연관된 Todo들이 모두 삭제됩니다.</p></div>`;
          const globalModal = new GlobalModal(
            modalContent,
            this.handleDeleteColumn,
          );
          globalModal.addBody();
          globalModal.registerEventListener();
        });
      }
    }
  };

  registerEventListener = () => {
    this.element = $$(this.uuid);
    this.handleColumnDbClick();
    this.handleColumnClick();
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
