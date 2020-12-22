// https://github.com/goitacademy/javascript-homework/tree/master/homework-08
// Создание и рендер разметки по массиву данных и предоставленному шаблону.
// Реализация делегирования на галерее ul.js-gallery и получение url большого изображения.
// Открытие модального окна по клику на элементе галереи.
// Подмена значения атрибута src элемента img.lightbox__image.
// Закрытие модального окна по клику на кнопку button[data-action="close-lightbox"].
// Очистка значения атрибута src элемента img.lightbox__image. Это необходимо для того, чтобы при следующем открытии модального окна, пока грузится изображение, мы не видели предыдущее.

// Следующий функционал не обязателен при сдаче задания, но будет хорошей практикой по работе с событиями.

// Закрытие модального окна по клику на div.lightbox__overlay.
// Закрытие модального окна по нажатию клавиши ESC.
// Пролистывание изображений галереи в открытом модальном окне клавишами "влево" и "вправо".

import images from '../gallery-items.js';

// Находим элементы в DOM
const galleryRef = document.querySelector('.js-gallery');
const backdropRef = document.querySelector('.js-lightbox');
const overlayRef = document.querySelector('.lightbox__overlay');
const modalImgRef = document.querySelector('.lightbox__image');
const closeModalBtn = document.querySelector(
  'button[data-action="close-lightbox"]',
);

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
  image.title = slide.description;
  image.loading = 'lazy';
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

  setLargeImage(event);
  onOpenModal();
}

// При клике подменяем ссылку на большую картинку и меняем alt
function setLargeImage(event) {
  modalImgRef.src = event.target.dataset.source;
  modalImgRef.alt = event.target.alt;
}

// Открываем модальное окно
function onOpenModal() {
  window.addEventListener('keydown', onPressEscape);
  backdropRef.classList.add('is-open');
  document.body.style.overflow = 'hidden'; // Найти не инлайновый вариант
}

// Закрываем модальное окно
function onCloseModal() {
  window.removeEventListener('keydown', onPressEscape);
  modalImgRef.src = '';
  modalImgRef.alt = '';  
  document.body.style.overflow = ''; // Найти не инлайновый вариант
  backdropRef.classList.remove('is-open');
}

// Закрываем при клике по бекдропу
function onBackDropClick(event) {
  if (event.target === overlayRef) {
    onCloseModal();
  }
}

// Закрываем при нажатии на Escape
function onPressEscape(event) {
  if (event.code === 'Escape') {
    onCloseModal();
  }
}

// Перелистывание слайдов кнопками