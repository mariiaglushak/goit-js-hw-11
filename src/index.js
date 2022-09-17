// import axios from 'axios';
import Notiflix from 'notiflix';
import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';
import { fetchCurrentPhoto } from './fetch.js';
import { createCardGallery } from './createString';

const simplGallery = new SimpleLightbox('.gallery__item', {
  captionsData: 'alt',
  captionDelay: 250,
});

const searchFofm = document.querySelector('#search-form');

const searchBtn = document.querySelector('button');
const loadMoreBtn = document.querySelector('.load-more');
loadMoreBtn.classList.add('is-hidden');

let pageCountMain = null;

const onSearch = async event => {
  event.preventDefault();
  pageCountMain = 1;
  const searchInput = document.querySelector('input');

  const namePhoto = searchInput.value;

  const gallery = document.querySelector('.gallery');
  try {
    data = await fetchCurrentPhoto(namePhoto, pageCountMain);
    console.log(data);
    const searchString = data.data.hits;
    console.log(data.data.totalHits);
    const totalPage = searchString.length;

    if (totalPage === 0) {
      Notiflix.Notify.failure(
        'Sorry, there are no images matching your search query. Please try again.'
      );
    }
    if (totalPage > 0) {
      Notiflix.Notify.success(
        `Hooray! We found ${data.data.totalHits} images.`
      );
    }

    const totalHits = searchString.length;
    gallery.innerHTML = createCardGallery(searchString);
    simplGallery.refresh();
    if (totalHits >= 39) {
      loadMoreBtn.classList.remove('is-hidden');
    }
    searchFofm.removeEventListener('submit', onSearch);
  } catch (err) {
    console.log(err);
  }
};

document.querySelector('input').addEventListener('change', e => {
  searchFofm.addEventListener('submit', onSearch);
});
searchFofm.addEventListener('submit', onSearch);
searchFofm.addEventListener('submit', e => {
  e.preventDefault();
});

////////////////////////////////////////////////////////////////////
const moreBtnHendler = async event => {
  pageCountMain += 1;

  const searchInput = document.querySelector('input');

  const namePhoto = searchInput.value;
  console.log(namePhoto);

  const gallery = document.querySelector('.gallery');
  try {
    data = await fetchCurrentPhoto(namePhoto, pageCountMain);

    const searchString = data.data.hits;
    console.log(searchString.length);

    if (searchString.length === 0) {
      loadMoreBtn.classList.add('is-hidden');
      Notiflix.Notify.info(
        "We're sorry, but you've reached the end of search results."
      );
    }
    gallery.insertAdjacentHTML('beforeend', createCardGallery(searchString));
    simplGallery.refresh();
  } catch (err) {
    console.log(err);
  }
};

loadMoreBtn.addEventListener('click', moreBtnHendler);
