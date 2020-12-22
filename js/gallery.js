// https://github.com/goitacademy/javascript-homework/tree/master/homework-08
// Создание и рендер разметки по массиву данных и предоставленному шаблону.
// Реализация делегирования на галерее ul.js-gallery и получение url большого изображения.

import images from '../gallery-items.js';

// Находим элементы в DOM
const galleryRef = document.querySelector('.js-gallery');
const modalImgRef = document.querySelector('.lightbox__image');
const closeModalBtn = document.querySelector(
  'button[data-action="close-lightbox"]',
);
const backdropRef = document.querySelector('.js-lightbox');
const overlayRef = document.querySelector('lightbox__overlay');

// Добавляем слушателей событий
galleryRef.addEventListener('click', onGalleryClick);
closeModalBtn.addEventListener('click', onCloseModal);
backdropRef.addEventListener('click', onBackDropClick);

// Собираем галлерею из массива обьектов
const createGallery = slide => {
  const item = document.createElement('li');
  item.classList.add('gallery__item');

  const link = document.createElement('a');
  link.classList.add('gallery__link');
  link.href = slide.original;

  const image = document.createElement('img');
  image.classList.add('gallery__image');
  image.src = slide.preview;
  image.alt = slide.description;
  image.dataset.source = slide.original;
  link.append(image);
  item.append(link);
  return item;
};

const imagesList = images.map(slide => createGallery(slide));
galleryRef.append(...imagesList);

// Проверяем на клик по картинке + прерываем переход по ссылке
function onGalleryClick(event) {
  event.preventDefault();

  if (event.target.nodeName !== 'IMG') {
    return;
  }

  console.log(event.target.dataset.source);

  setLargeImage(event);

  onOpenModal();
}

// При клике подменяем ссылку на большую картинку и alt
function setLargeImage(event) {
  modalImgRef.src = event.target.dataset.source;
  modalImgRef.alt = event.target.alt;
}

// Открываем модальное окно
function onOpenModal() {
  window.addEventListener('keydown', onPressEscape);
  backdropRef.classList.replace('lightbox', 'lightbox.is-open');
}

// Закрываем модальное окно
function onCloseModal() {
  window.removeEventListener('keydown', onPressEscape);
  modalImgRef.src = '';
  modalImgRef.alt = '';
  backdropRef.classList.replace('lightbox.is-open', 'lightbox');
}

// Закрываем при клике по бекдропу
function onBackDropClick(event) {
  if (event.target === event.currentTarget) {
    onCloseModal();
  }
}

// Закрываем при нажатии Escape
function onPressEscape(event) {
  if (event.code === 'Escape') {
    onCloseModal();
  }
}
