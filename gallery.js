import photoArray from './gallery-items.js';

const refs = {
  imageGallery: document.querySelector('.js-gallery'),
  modalWindow: document.querySelector('.js-lightbox'),
  closeButton: document.querySelector('.lightbox__button'),
  modalImage: document.querySelector('.lightbox__image'),
  modalOverlay: document.querySelector('.lightbox__overlay'),
};

refs.imageGallery.addEventListener('click', onImageClick);
refs.closeButton.addEventListener('click', closeModal);
refs.modalOverlay.addEventListener('click', closeModal);

const createGalleryItem = (element, index) => {
  const galleryItem = document.createElement('li');
  galleryItem.setAttribute('class', 'gallery__item');

  const galleryLink = document.createElement('a');
  galleryLink.setAttribute('class', 'gallery__link');

  const galleryImage = document.createElement('img');
  galleryImage.setAttribute('class', 'gallery__image');
  galleryImage.setAttribute('src', element.original);
  galleryImage.setAttribute('data-source', element.preview);
  galleryImage.setAttribute('alt', element.description);
  galleryImage.setAttribute('data-position', index);

  console.log(galleryImage.dataset.position);

  galleryLink.appendChild(galleryImage);
  galleryItem.appendChild(galleryLink);

  return galleryItem;
};

const elements = photoArray.map(createGalleryItem);
refs.imageGallery.append(...elements);

function addEvent(event) {
  if (event.code === 'Escape') {
    closeModal();
  }
  if (event.code === 'ArrowRight') {
    switchToNext();
  }
  if (event.code === 'ArrowLeft') {
    switchToPrev();
  }
}

function onImageClick(event) {
  if (event.target.nodeName !== 'IMG') {
    return;
  }

  window.addEventListener('keydown', addEvent);

  refs.modalWindow.classList.add('is-open');
  refs.modalImage.src = event.target.src;
  refs.modalImage.dataset.position = event.target.dataset.position;
}

function closeModal() {
  window.removeEventListener('keydown', addEvent);

  refs.modalWindow.classList.remove('is-open');
  refs.modalImage.src = '';
}

function switchToNext() {
  let imagePosition = Number(refs.modalImage.dataset.position); //перевожу индекс в число и присваиваю переменной

  if (imagePosition === photoArray.length - 1) {
    // проверка на последнюю картинку
    refs.modalImage.src = photoArray[0].original;
    refs.modalImage.dataset.position = 0;
  } else {
    refs.modalImage.src = photoArray[imagePosition + 1].original; //присвиваю новыйй индекс
    refs.modalImage.dataset.position = imagePosition + 1; //заменяю индекс на новом изображении на index+1
  }
}

function switchToPrev() {
  let imagePosition = Number(refs.modalImage.dataset.position);

  if (imagePosition === 0) {
    refs.modalImage.src = photoArray[photoArray.length - 1].original;
    refs.modalImage.dataset.position = photoArray.length - 1;
  } else {
    refs.modalImage.src = photoArray[imagePosition - 1].original;
    refs.modalImage.dataset.position = imagePosition - 1;
  }
}
