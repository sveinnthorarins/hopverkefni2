import { empty, el } from './helpers';

export default class List {
  constructor() {
    this.container = document.querySelector('.list');
    this.filterCategories = [];
  }

  showList(list) {
    empty(this.container);
    const finarr = JSON.parse(localStorage.getItem('finishedArray')) || [];
    let row = el('div', 'list__row');

    list.forEach((item) => {
      let img = el('img', 'list__col__img');
      if (item.thumbnail) img.src = item.thumbnail;

      let checkmark = el('div', 'list__col__banner__checkmark');
      if (finarr.includes(item.slug)) {
        console.log(item.slug, ' is included.');
        checkmark.classList.add('list__col__banner__checkmark--checked');
      }

      let banner = el('div', 'list__col__banner', 
        el('div', 'list__col__banner__text',
          el('div', 'list__col__banner__text__category', item.category),
          el('div', 'list__col__banner__text__title', item.title)),
        checkmark);

      let col = el('a', 'list__col', img, banner);
      col.href = `./fyrirlestur.html?slug=${item.slug}`;

      row.appendChild(col);
    });

    this.container.appendChild(row);
  }

  loadList(data) {
    this.list = data.lectures;
    this.showList(this.list);
  }

  load() {
    fetch('../lectures.json')
    .then((request) => {
      if (request.ok) return request.json();
      throw new Error('Error fetching data.');
    })
    .then((data) => {
      this.loadList(data);
    })
    .catch((err) => {
      console.error(err);
    });
  }
}
