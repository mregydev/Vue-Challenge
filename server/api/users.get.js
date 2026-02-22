const jsonplaceholder = (path) =>
  $fetch(path, {
    baseURL: 'https://jsonplaceholder.typicode.com',
    headers: {
      'User-Agent': 'NuxtApp/1.0',
      Accept: 'application/json',
    },
  });

export default defineEventHandler(async () => {
  const users = await jsonplaceholder('/users');

  const usersWithStats = await Promise.all(
    users.map(async (user) => {
      const [albums, posts, comments] = await Promise.all([
        jsonplaceholder(`/users/${user.id}/albums`),
        jsonplaceholder(`/users/${user.id}/posts`),
        jsonplaceholder(`/users/${user.id}/comments`),
      ]);
      return {
        id: user.id,
        name: user.name,
        albums: albums ?? [],
        posts: posts ?? [],
        comments: comments ?? [],
      };
    })
  );

  return { users: usersWithStats };
});
