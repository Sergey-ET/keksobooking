const FILE_TYPES = ['gif', 'jpg', 'jpeg', 'png', 'webp', 'svg', 'avif', 'ico', 'tiff'];

const form = document.querySelector('.ad-form');
const avatarChooser = form.querySelector('#avatar');
const avatarPreviewContainer = form.querySelector('.ad-form-header__preview');
const avatarPreview = form.querySelector('.ad-form-header__preview img');
const housingPhotoChooser = form.querySelector('#images');
const housingPhotoPreviewContainer = form.querySelector('.ad-form__photo');

avatarChooser.addEventListener('change', () => {
  const file = avatarChooser.files[0];
  const fileName = file.name.toLowerCase();

  const matches = FILE_TYPES.some((it) => {
    return fileName.endsWith(it);
  });

  if (matches) {
    const reader = new FileReader();

    reader.addEventListener('load', () => {
      avatarPreview.src = reader.result;
      avatarPreview.width = '70';
      avatarPreview.height = '70';
      avatarPreview.style.borderRadius = '5px';
      avatarPreviewContainer.style.padding = '0';
    });

    reader.readAsDataURL(file);
  }
});

housingPhotoChooser.addEventListener('change', () => {
  const file = housingPhotoChooser.files[0];
  const fileName = file.name.toLowerCase();

  const matches = FILE_TYPES.some((it) => {
    return fileName.endsWith(it);
  });

  if (matches) {
    const reader = new FileReader();

    reader.addEventListener('load', () => {
      const housingPhotoPreview = document.createElement('img');
      housingPhotoPreviewContainer.appendChild(housingPhotoPreview);
      housingPhotoPreview.src = reader.result;
      housingPhotoPreview.alt = 'Фотография жилья';
      housingPhotoPreview.width = '70';
      housingPhotoPreview.height = '70';
      housingPhotoPreview.style.borderRadius = '5px';
    });

    reader.readAsDataURL(file);
  }
});

const resetPictures = () => {
  avatarPreview.src = 'img/muffin-grey.svg';
  avatarPreview.width = '40';
  avatarPreview.height = '44';
  avatarPreviewContainer.style.padding = '0 15px';
  housingPhotoPreviewContainer.innerHTML = '';
};

export { resetPictures };
