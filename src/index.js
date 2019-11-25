import List from './lib/list';
import {empty, el} from './lib/helpers';

function filterButtonClicked(e) {
  const selected = e.target.className.includes('toolbar__button--selected');
  let filteredList;
  const category = e.target.innerHTML.toLowerCase();
  let filter = document.listObject.filterCategories;

  if (selected) {
    let i = filter.indexOf(category);
    filter.splice(i, 1);
    e.target.classList.remove('toolbar__button--selected');
  } else {
    filter.push(category);
    e.target.classList.add('toolbar__button--selected');
  }

  if (filter.length === 0) {
    document.listObject.showList(document.listObject.list);
  } else {
    filteredList = document.listObject.list.filter((item) => filter.includes(item.category));
    document.listObject.showList(filteredList);
  }
}

function finishLecture(e) {
  const finarr = JSON.parse(localStorage.getItem('finishedArray')) || [];
  const params = new URLSearchParams(window.location.search);
  const slug = params.get('slug');
  if (finarr.includes(slug)) {
    e.target.classList.remove('lecture-page-footer__finish--checked');
    finarr.splice(finarr.indexOf(slug), 1);
  } else {
    e.target.classList.add('lecture-page-footer__finish--checked');
    finarr.push(slug);
  }
  localStorage.setItem('finishedArray', JSON.stringify(finarr));
}

function loadLecture(data, slug) {
  const lectures = data.lectures;
  const [lecture] = lectures.filter((item) => item.slug === slug);
  const container = document.querySelector('.lecture-page');

  const header = el('header', 'header',
    el('h2', 'header__h2', lecture.category.toUpperCase()),
    el('h1', 'header__h1', lecture.title));
  header.dataset.image = lecture.image;
  container.appendChild(header);

  const content = lecture.content;
  const wrapper = el('div', 'lecture__wrapper');
  const main = el('main', 0, 
    el('div', 'lecture', wrapper));
  container.appendChild(main);
  content.forEach((item) => {
    let elmt;
    if (item.type === 'text') {
      elmt = el('div', 'lecture__text');
      const text = item.data.split("\n");
      text.forEach((str) => {
        elmt.appendChild(el('p', 0, str));
      });
    } else if (item.type === 'image') {
      elmt = el('div', 'lecture__image');
      const img = el('img', 'lecture__image__img');
      img.src = item.data;
      elmt.appendChild(img);
      if (item.caption) {
        const capt = el('div', 'lecture__image__caption', item.caption);
        elmt.appendChild(capt);
      }
    } else if (item.type == 'youtube') {
      elmt = el('div', 'lecture__video');
      const iframe = el('iframe', 'lecture__video__iframe');
      iframe.src = item.data;
      iframe.setAttribute('frameborder', '0');
      iframe.setAttribute('allowfullscreen', '0');
      elmt.appendChild(iframe);
    } else if (item.type === 'heading') {
      elmt = el('h3', 'lecture__heading', item.data);
    } else if (item.type === 'list') {
      elmt = el('ul', 'lecture__list');
      item.data.forEach((listitem) => {
        const li = el('li', 'lecture__list__item', listitem);
        elmt.appendChild(li);
      });
    } else if (item.type === 'quote') {
      elmt = el('div', 'lecture__quote', 
        el('p', 0, item.data));
      if (item.attribute) {
        elmt.appendChild(el('p', 'lecture__quote__attribute', item.attribute));
      }
    } else if (item.type === 'code') {
      elmt = el('pre', 'lecture__code', item.data);
    }
    wrapper.appendChild(elmt);
  });

  const finarr = JSON.parse(localStorage.getItem('finishedArray')) || [];
  const finishButton = el('div', 'lecture-page-footer__finish');
  const backButton = el('a', 'lecture-page-footer__back', 'Til baka');
  backButton.href = './index.html';
  const footer = el('footer', 'lecture-page-footer', finishButton, backButton);
  if (finarr.includes(lecture.slug)) finishButton.classList.add('lecture-page-footer__finish--checked');
  finishButton.addEventListener('click', finishLecture);
  container.appendChild(footer);
}

document.addEventListener('DOMContentLoaded', () => {
  if (document.querySelector('.lecture-page')) {
    const params = new URLSearchParams(window.location.search);
    const slug = params.get('slug');
    fetch('./lectures.json')
    .then((request) => {
      if (request.ok) return request.json();
      throw new Error('Error fetching data.');
    })
    .then((data) => {
      loadLecture(data, slug);
    })
    .catch((err) => {
      console.error(err);
    });
  } else {
    const list = new List();
    document.listObject = list;
    list.load();
    for (let child of document.querySelector('.toolbar').children) {
      child.addEventListener('click', filterButtonClicked);
    }
  }
});
