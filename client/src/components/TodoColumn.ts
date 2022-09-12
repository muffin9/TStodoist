import TodoForm from '@/components/TodoForm';
import IColumn from '@/interface/IColumn';
import { $$ } from '@/utils/dom';

export default class TodoColumn {
  id: number;

  uuid: string;

  element: HTMLElement | null;

  title: string;

  changeTitle: string;

  date?: string;

  count: number;

  onModify: boolean;

  onAddForm: boolean;

  constructor(state: IColumn) {
    this.id = state.id;
    this.uuid = state.uuid;
    this.element = null;
    this.title = state.title;
    this.changeTitle = this.title;
    this.date = new Date().toString();
    this.onModify = false;
    this.onAddForm = false;
    this.count = 0;
  }

  setCount = (count: number) => {
    this.count = count;
  };

  addCount = () => {
    this.count += 1;
    this.element!.querySelector('.column__count')!.innerHTML =
      this.count.toString();
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

        const newAddForm = new TodoForm(
          { columnId: this.id, status: this.title, type: 'add' },
          this.addCount,
        );
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
    this.element = $$(this.uuid);
    this.handleOnDbClick();
    this.handleOnClick();
  };

  render = () => {
    return /* html */ `
    <div class="column-list" id="${this.uuid}" data-column-status="${this.title}">
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
