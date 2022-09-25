import GlobalModal from '@/components/GlobalModal';
import TodoForm from '@/components/TodoForm';
import api from '@/helpers/api';
import IColumn from '@/interface/IColumn';
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
    this.count = 0;
    this.onModify = false;
    this.onAddForm = false;
  }

  setCount = (count: number) => {
    this.count = count;
  };

  addCount = () => {
    this.count += 1;
    if (this.element) {
      const countElement = this.element.querySelector('.column__count');
      if (countElement) {
        countElement.innerHTML = this.count.toString();
      }
    }
  };

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
            const modalContent =
              '이전 칼럼명과 동일하거나 또는 중복된 칼럼명 입니다.';
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

          const response = await api.postOrPatchColumnFetch(this.uuid, {
            title: this.changeTitle,
          });

          if (response.id) {
            document.removeEventListener(
              'click',
              this.handleOnClickOutside,
              true,
            );
            this.element.dataset.columnStatus = response.title;
            this.title = response.title;
            titleElement.outerHTML = `<div class="column__title">${response.title}</div>`;
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

  registerEventListener = () => {
    this.element = $$(this.uuid);
    this.handleColumnDbClick();
    this.handleColumnClick();
  };

  render = () => {
    return /* html */ `
    <div class="column-list" id="${this.uuid}" data-column-status="${this.status}">
      <nav class="column">
          <div class="column__left">
              <div class="column__title">${this.title}</div>
              <div class="column__count">${this.count}</div>
          </div>
          <div class="column__right">
            <button type="button" class="column__add">+</button>
            <button type="button" class="column__delete">x</button>
          </div>
      </nav>
    </div>
    `;
  };
}
