import { empty, el } from './helpers';

export default class List {
  constructor() {
    this.container = document.querySelector('.list');
    this.filterCategories = [];
  }

  /**
   * Hleður og birtir lista af fyrirlestrum.
   * @param {*} list array af fyrirlestrunum sem skal birta
   */
  showList(list) {
    empty(this.container);
    const finarr = JSON.parse(localStorage.getItem('finishedArray')) || [];
    const row = el('div', 'list__row');

    list.forEach((item) => {
      const img = el('img', 'list__col__img');
      if (item.thumbnail) img.src = item.thumbnail;

      const checkmark = el('div', 'list__col__banner__checkmark');
      if (finarr.includes(item.slug)) {
        checkmark.classList.add('list__col__banner__checkmark--checked');
      }

      const banner = el('div', 'list__col__banner',
        el('div', 'list__col__banner__text',
          el('div', 'list__col__banner__text__category', item.category),
          el('div', 'list__col__banner__text__title', item.title)),
        checkmark);

      const col = el('a', 'list__col', img, banner);
      col.href = `./fyrirlestur.html?slug=${item.slug}`;

      row.appendChild(col);
    });

    this.container.appendChild(row);
  }

  /**
   * Hleður gögn sem innihalda listann af fyrirlestrum.
   * Kallar á showList() til að birta listann.
   * @param {*} data
   */
  loadList(data) {
    this.list = data.lectures;
    this.showList(this.list);
  }

  /**
   * Sækir gögn sem innihalda listann af fyrirlestrum.
   * Kallar á loadList() til að hlaða gögnin.
   */
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
