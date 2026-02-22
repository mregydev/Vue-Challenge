export default defineEventHandler(async () => {
  const storage = useStorage('storage');
  return await storage.getItem('/gallery/gallery-db.json');
});
