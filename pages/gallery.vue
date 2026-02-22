<template>
  <div class="gallery-page">
    <h2>Gallery</h2>
    <div v-if="usersPending">Loading…</div>
    <div v-else-if="usersError">Error loading users: {{ usersError.message }}</div>
    <div v-else class="gallery-users">
      <div
        v-for="(user, index) in users"
        :key="user.id"
        class="gallery-user-card"
      >
        <hr v-if="index !== 0" />
        <h2>{{ user.name }}</h2>
        <div class="gallery-user-stats">
          <p>Albums: {{ user.albums.length }}</p>
          <p>Posts: {{ user.posts.length }}</p>
          <p>Comments: {{ user.comments.length }}</p>
        </div>
        <div class="gallery">
          <div
            v-if="!galleryByUser[user.id]"
            class="gallery-loading"
          >
            Loading images…
          </div>
          <template v-else>
            <div
              v-for="img in galleryByUser[user.id]"
              :key="img.id"
              class="photo-wrap"
            >
              <img
                :src="img.picture"
                :alt="img.title"
                class="photo"
                loading="lazy"
              />
            </div>
          </template>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
const {
  data: usersData,
  pending: usersPending,
  error: usersError,
} = await useFetch('/api/users', { lazy: true });

const users = computed(() => usersData.value?.users ?? []);

const galleryByUser = ref({});

watch(
  users,
  (userList) => {
    if (!userList?.length) return;
    userList.forEach(async (u) => {
      const photos = await $fetch(`/api/gallery/${u.id}`);
      galleryByUser.value = {
        ...galleryByUser.value,
        [u.id]: photos ?? [],
      };
    });
  },
  { immediate: true }
);
</script>

<style scoped>
.gallery-page {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.gallery-users {
  display: flex;
  flex-direction: column;
  gap: 1.25rem;
}

.gallery-user-card {
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
  min-height: 320px;
}

.gallery-user-stats {
  display: flex;
  flex-wrap: wrap;
  gap: 0.6rem 1rem;
}

.gallery-user-stats p {
  margin: 0;
  flex: 1 1 140px;
}

.gallery {
  display: flex;
  flex-wrap: wrap;
  gap: clamp(0.5rem, 1.5vw, 1rem);
  min-height: 400px;
  position: relative;
}

.gallery-loading {
  position: absolute;
  inset: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 0.9rem;
  color: #666;
}

.photo-wrap {
  flex: 1 1 220px;
  width: min(100%, 340px);
  min-width: 180px;
  aspect-ratio: 3 / 2;
  background: #f0f0f0;
  border-radius: 0.6rem;
  overflow: hidden;
}

.photo {
  width: 100%;
  height: 100%;
  object-fit: cover;
  border-radius: 0.6rem;
  border: 1px solid #e4e4e4;
}
</style>
