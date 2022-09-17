export function createCardGallery(array) {
  console.log(array);
  const searchCard = array
    .map(
      object => `<div class="photo-card">
      <a class="gallery__item" href="${object.largeImageURL}">
        <img src="${object.webformatURL}" alt="${object.tags}" loading="lazy" class="img-gallery" />
        </a>
        <div class="info">
          <p class="info-item">
            <b>Likes</b>
            ${object.likes}
          </p>
          <p class="info-item">
            <b>Views</b>
            ${object.views}
          </p>
          <p class="info-item">
            <b>Comments</b>
            ${object.comments}
          </p>
          <p class="info-item">
            <b>Downloads</b>
            ${object.downloads}
          </p>
        </div>
      </div>`
    )
    .join('');
  return searchCard;
}
