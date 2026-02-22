import galleryDb from '../../../storage/gallery/gallery-db.json';

export default defineEventHandler((event) => {
  const userId = parseInt(getRouterParam(event, 'userId'), 10);
  if (isNaN(userId)) {
    throw createError({ statusCode: 400, message: 'Invalid userId' });
  }

  const images = Array.isArray(galleryDb) ? galleryDb : [];
  const userPhotos = images.filter((img) => img.userId === userId);

  return userPhotos;
});
