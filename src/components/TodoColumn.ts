import { $ } from '@/utils/dom';
export default class TodoColumn {
  id: number;

  title: string;

  isdeleted: boolean;

  date?: string;

  count: number;

  onModify: boolean;

  constructor(id: number, title: string, isdeleted: boolean, date?: string) {
    this.id = id;
    this.title = title;
    this.isdeleted = isdeleted;
    this.date = date;
    this.onModify = false;
    this.count = 0;
  }

  setCount = (count: number) => {
    this.count = count;
  };

  handleEventListener = () => {
    $(`.${this.title} .column__title`)!.addEventListener(
      'dblclick',
      ({ target }: any) => {
        const targetElement = target as HTMLDivElement | HTMLInputElement;
        if (targetElement.classList.contains('column__title')) {
          this.onModify = !this.onModify;
          this.changeTitle();
        }
      },
    );
  };

  changeTitle = () => {
    const titleElement = $(`.${this.title} .column__title`);
    if (this.onModify) {
      titleElement!.outerHTML =
        '<input class="column__title" type="input" maxlength="50" />';
    }
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
