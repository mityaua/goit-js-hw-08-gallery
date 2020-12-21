// https://github.com/goitacademy/javascript-homework/tree/master/homework-08
// Создание и рендер разметки по массиву данных и предоставленному шаблону.
// Реализация делегирования на галерее ul.js-gallery и получение url большого изображения.

import images from '../gallery-items.js';

const galleryRef = document.querySelector('.js-gallery');
const modalImgRef = document.querySelector('.lightbox__image');

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

galleryRef.addEventListener('click', onGalleryClick);

function onGalleryClick(event) {
  event.preventDefault();

  if (event.target.nodeName !== 'IMG') {
    console.log('Кликнули не по картинке');
    return;
  }

  // console.log(event.target.nodeName);
  console.log(event.target.dataset.source);

  setLargeImage(event);
}

function setLargeImage(event) {
  modalImgRef.src = event.target.dataset.source;
  modalImgRef.alt = event.target.alt;
}
