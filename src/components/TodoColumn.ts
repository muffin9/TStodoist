import TodoAddForm from '@/components/TodoAddForm';
import { $ } from '@/utils/dom';

export default class TodoColumn {
  id: number;

  title: string;

  changeTitle: string;

  isdeleted: boolean;

  date?: string;

  count: number;

  onModify: boolean;

  onAddForm: boolean;

  constructor(id: number, title: string, isdeleted: boolean, date?: string) {
    this.id = id;
    this.title = title;
    this.changeTitle = this.title;
    this.isdeleted = isdeleted;
    this.date = date;
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

  handleOnClickAddCard = () => {
    $(`.${this.title} .column__add`)!.addEventListener('click', () => {
      const addForm = $(`.${this.title} .input-wrapper`);
      if (addForm) {
        addForm.remove();
        return;
      }

      const newAddForm = new TodoAddForm();
      $(`.${this.title} .column`)!.insertAdjacentHTML(
        'afterend',
        newAddForm.render(),
      );

      newAddForm.registerEventListener();
    });
  };

  handleOnClickOutside = (event: any) => {
    const target = event.target;
    if (target.id === `${this.title}`) return;
    this.toggleModifyValue();
    this.changeTitleElement();
  };

  handleOnDbClickTitle = () => {
    $(`.${this.title} .column__title`)!.addEventListener('dblclick', event => {
      const targetElement = event.target as HTMLDivElement | HTMLInputElement;
      if (targetElement.classList.contains('column__title')) {
        this.toggleModifyValue();
        this.changeTitleElement();
      }
    });
  };

  handleOnChangeTitle = () => {
    $(`.${this.title} .column__title`)?.addEventListener('change', (e: any) => {
      this.changeTitle = e.target.value;
    });
  };

  changeTitleElement = () => {
    const titleElement = $(`.${this.title} .column__title`);
    if (this.onModify) {
      titleElement!.outerHTML = `<input id="${this.title}" class="column__title" type="input" maxlength="50" />`;
      document.addEventListener('click', this.handleOnClickOutside, true);
      this.handleOnChangeTitle();
    } else {
      titleElement!.outerHTML = `<div class="column__title" type="input" maxlength="50">${this.changeTitle}</div>`;
      document.removeEventListener('click', this.handleOnClickOutside, true);
      this.handleOnDbClickTitle();
    }
  };

  registerEventListener = () => {
    this.handleOnDbClickTitle();
    this.handleOnClickAddCard();
  };

  render = () => {
    return /* html */ `
    <div class="column-list ${this.title}">
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
