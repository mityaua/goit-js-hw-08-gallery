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

let currentIndex;

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
  image.dataset.index = images.indexOf(slide);

  link.append(image);
  item.append(link);

  return item;
};

const imagesList = images.map(slide => createGallery(slide));
galleryRef.append(...imagesList);

// Проверяем на клик по превью + прерываем переход по ссылке
function onGalleryClick(event) {
  event.preventDefault();
  currentIndex = Number(event.target.dataset.index);

  if (event.target.nodeName !== 'IMG') {
    return;
  }
  setLargeImage(event);
  onOpenModal();
}

// Подменяем картинку на оригинал и меняем alt
function setLargeImage(event) {
  modalImgRef.src = event.target.dataset.source;
  modalImgRef.alt = event.target.alt;
}

// Открываем модальное окно
function onOpenModal() {
  window.addEventListener('keydown', onPressEscape);
  window.addEventListener('keydown', keyNavigation);
  document.body.style.overflow = 'hidden'; // Найти не инлайновый вариант
  backdropRef.classList.add('is-open');
}

// Закрываем модальное окно
function onCloseModal() {
  window.removeEventListener('keydown', onPressEscape);
  window.removeEventListener('keydown', keyNavigation);
  modalImgRef.src = '';
  modalImgRef.alt = '';
  document.body.style.overflow = ''; // Найти не инлайновый вариант
  backdropRef.classList.remove('is-open');
}

// Закрываем слайд при клике по бекдропу
function onBackDropClick(event) {
  if (event.target === overlayRef) {
    onCloseModal();
  }
}

// Закрываем слайд при нажатии на Escape
function onPressEscape(event) {
  if (event.code === 'Escape') {
    onCloseModal();
  }
}

// Перелистывание слайдов кнопками
function keyNavigation(event) {
  if (event.code === 'ArrowLeft') {
    if (currentIndex > 0) {
      modalImgRef.src = images[(currentIndex -= 1)].original;
    }
  }

  if (event.code === 'ArrowRight') {
    if (currentIndex < images.length - 1) {
      modalImgRef.src = images[(currentIndex += 1)].original;
    }
  }
}

// Создание и рендер разметки по массиву данных и предоставленному шаблону.
// Реализация делегирования на галерее ul.js-gallery и получение url большого изображения.
// Открытие модального окна по клику на элементе галереи.
// Подмена значения атрибута src элемента img.lightbox__image.
// Закрытие модального окна по клику на кнопку button[data-action="close-lightbox"].
// Очистка значения атрибута src элемента img.lightbox__image. Это необходимо для того, чтобы при следующем открытии модального окна, пока грузится изображение, мы не видели предыдущее.

// Закрытие модального окна по клику на div.lightbox__overlay.
// Закрытие модального окна по нажатию клавиши ESC.
// Пролистывание изображений галереи в открытом модальном окне клавишами "влево" и "вправо".
