import TodoAddForm from '@/components/TodoAddForm';
import IColumn from '@/interface/IColumn';
import { $$ } from '@/utils/dom';

export default class TodoColumn {
  id: string;

  element: HTMLElement | null;

  title: string;

  changeTitle: string;

  isdeleted: boolean;

  date?: string;

  count: number;

  onModify: boolean;

  onAddForm: boolean;

  constructor(state: IColumn) {
    this.id = state.id;
    this.element = null;
    this.title = state.title;
    this.changeTitle = this.title;
    this.isdeleted = state.isDeleted;
    this.date = new Date().toString();
    this.onModify = false;
    this.onAddForm = false;
    this.count = 0;
  }

  setCount = (count: number) => {
    this.count = count;
  };

  toggleModifyValue = () => {
    this.onModify = !this.onModify;
  };

  handleOnClick = () => {
    this.element?.addEventListener('click', e => {
      const target = e.target as HTMLElement;
      if (target.classList.contains('column__add')) {
        const addForm = this.element?.querySelector('.input-wrapper');
        if (addForm) {
          addForm.remove();
          return;
        }

        const newAddForm = new TodoAddForm();
        this.element
          ?.querySelector('.column')!
          .insertAdjacentHTML('afterend', newAddForm.render());

        newAddForm.registerEventListener();
      }
    });
  };

  handleOnClickOutside = (e: any) => {
    const target = e.target as HTMLElement;
    if (target.id === `${this.title}`) return;
    this.toggleModifyValue();
    this.changeTitleElement();
  };

  handleOnDbClick = () => {
    this.element?.addEventListener('dblclick', e => {
      const targetElement = e.target as HTMLDivElement | HTMLInputElement;
      if (targetElement.classList.contains('column__title')) {
        this.toggleModifyValue();
        this.changeTitleElement();
      }
    });
  };

  handleOnChange = () => {
    this.element?.addEventListener('change', e => {
      const target = e.target as HTMLInputElement;
      this.changeTitle = target.value;
    });
  };

  changeTitleElement = () => {
    const titleElement = this.element?.querySelector('.column__title');

    if (this.onModify) {
      titleElement!.outerHTML = `<input id="${this.title}" class="column__title" type="input" maxlength="50" />`;
      document.addEventListener('click', this.handleOnClickOutside, true);
      this.handleOnChange();
    } else {
      titleElement!.outerHTML = `<div class="column__title" type="input" maxlength="50">${this.changeTitle}</div>`;
      document.removeEventListener('click', this.handleOnClickOutside, true);
      this.handleOnDbClick();
    }
  };

  registerEventListener = () => {
    this.element = $$(this.id);
    this.handleOnDbClick();
    this.handleOnClick();
  };

  render = () => {
    return /* html */ `
    <div class="column-list" id="${this.id}">
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
