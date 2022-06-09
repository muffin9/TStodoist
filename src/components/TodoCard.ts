import closeImg from '@/assets/close.png';
import { $ } from '@/utils/dom';

export default class TodoCard {
  id: number;

  title: string;

  content: string;

  status: string;

  date: string;

  constructor(
    id: number,
    title: string,
    content: string,
    status: string,
    date: string,
  ) {
    this.id = id;
    this.title = title;
    this.content = content;
    this.status = status;
    this.date = date;
  }

  handleEventListener = () => {
    $('.card__delete')!.addEventListener('mouseenter', () => {
      console.log('해당 카드 색상 변경 예정');
    });
  };

  render = () => {
    return /* html */ `
      <article class="card-wrapper">
        <div class="card__delete">
          <img src=${closeImg} alt="closeImage"/>
        </div>
        <h1 class="card__title">
        Github 공부하기
        </h1>
        <div class="card__content">
        add, commit, push
        </div>
        <div class="card__writer">
        author by web
        </div>
      </article>
    `;
  };
}
