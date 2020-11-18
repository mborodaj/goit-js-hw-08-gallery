import photoArray from "./gallery-items.js"

const refs = {
    imageGallery: document.querySelector('.js-gallery'),
    modalWindow: document.querySelector('.js-lightbox'),
    closeButton: document.querySelector('.lightbox__button'),
    modalImage: document.querySelector('.lightbox__image'),
    modalOverlay: document.querySelector('.lightbox__overlay'),
}

refs.imageGallery.addEventListener('click', onImageClick)
refs.closeButton.addEventListener('click', closeModal)
refs.modalOverlay.addEventListener('click', closeModal)

window.addEventListener('keydown', event => {
    if (event.code === 'Escape') {
        closeModal()
    }
    if (event.code === 'ArrowRight') {
        switchToNext()
    }
    if (event.code === 'ArrowLeft') {
        switchToPrev()
    }
})

const createGalleryItem = (element) => {

    const galleryItem = document.createElement('li')
    galleryItem.setAttribute('class', 'gallery__item')

    const galleryLink = document.createElement('a')
    galleryLink.setAttribute('class', 'gallery__link')

    const galleryImage = document.createElement('img')
    galleryImage.setAttribute('class', 'gallery__image')
    galleryImage.setAttribute('src', element.original)
    galleryImage.setAttribute('data-source', element.preview)
    galleryImage.setAttribute('alt', element.description)
    galleryImage.setAttribute('data-position', photoArray.indexOf(element))

    galleryLink.appendChild(galleryImage)
    galleryItem.appendChild(galleryLink)

    return galleryItem
}

const elements = photoArray.map(createGalleryItem)
refs.imageGallery.append(...elements)

function onImageClick(event) {
    refs.modalWindow.classList.add('is-open')

    if (event.target.nodeName !== 'IMG') {
        return
    }
    
    refs.modalImage.src = event.target.src;
    refs.modalImage.dataset.position = event.target.dataset.position
}

function closeModal() {
    refs.modalWindow.classList.remove('is-open')
    refs.modalImage.src = ''
}

function switchToNext() {
    let imagePosition = Number(refs.modalImage.dataset.position)

    if (imagePosition === photoArray.length - 1){
        refs.modalImage.src = photoArray[0].original
        refs.modalImage.dataset.position = 0
    } else {
        refs.modalImage.src = photoArray[imagePosition + 1].original
        refs.modalImage.dataset.position = imagePosition + 1
    }
}

function switchToPrev() {
    let imagePosition = Number(refs.modalImage.dataset.position)

    if (imagePosition === 0){
        refs.modalImage.src = photoArray[photoArray.length - 1].original
        refs.modalImage.dataset.position = photoArray.length - 1
    } else {
        refs.modalImage.src = photoArray[imagePosition - 1].original
        refs.modalImage.dataset.position = imagePosition - 1
    }
    
}

    
    
