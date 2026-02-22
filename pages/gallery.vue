<template>
  <div class="gallery-page">
    <h2>Gallery</h2>
    <div v-if="usersPending || galleryPending">Loading…</div>
    <div v-else-if="usersError">Error loading users: {{ usersError.message }}</div>
    <div v-else class="gallery-users">
      <div
        v-for="(userGallery, index) in usersWithGallery"
        :key="userGallery.id"
        class="gallery-user-card"
      >
        <hr v-if="index !== 0" />
        <h2>{{ userGallery.name }}</h2>
        <div class="gallery-user-stats">
          <p>Albums: {{ userGallery.albums.length }}</p>
          <p>Posts: {{ userGallery.posts.length }}</p>
          <p>Comments: {{ userGallery.comments.length }}</p>
        </div>
        <div class="gallery">
          <template v-for="img in userGallery.photos" :key="img.id">
            <div class="photo-wrap">
              <img
                :src="img.picture"
                :alt="img.title"
                class="photo"
                loading="lazy"
                @load="onImageLoad(userGallery.id)"
              />
            </div>
          </template>
          <div
            v-if="isUserLoading(userGallery.id)"
            class="gallery-loading"
            aria-hidden="true"
          >
            Loading images…
          </div>
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
const galleryPending = ref(false);

watch(
  users,
  async (userList) => {
    if (!userList?.length) return;
    galleryPending.value = true;
    try {
      const results = await Promise.all(
        userList.map((u) =>
          $fetch(`/api/gallery/${u.id}`).then((photos) => ({
            userId: u.id,
            photos,
          }))
        )
      );
      galleryByUser.value = Object.fromEntries(
        results.map((r) => [r.userId, r.photos ?? []])
      );
    } finally {
      galleryPending.value = false;
    }
  },
  { immediate: true }
);

const usersWithGallery = computed(() => {
  const list = users.value;
  const gallery = galleryByUser.value;
  if (!list?.length) return [];
  return list
    .map((u) => ({
      ...u,
      photos: gallery[u.id] ?? [],
    }))
    .filter((u) => (u.photos || []).length > 0);
});

const loadedCount = ref({});

watch(
  usersWithGallery,
  (u) => {
    if (u?.length) {
      loadedCount.value = Object.fromEntries(u.map((user) => [user.id, 0]));
    }
  },
  { immediate: true }
);

function onImageLoad(userId) {
  const user = usersWithGallery.value.find((u) => u.id === userId);
  if (!user) return;
  const count = (loadedCount.value[userId] || 0) + 1;
  loadedCount.value = { ...loadedCount.value, [userId]: count };
}

function isUserLoading(userId) {
  const user = usersWithGallery.value.find((u) => u.id === userId);
  if (!user) return false;
  const loaded = loadedCount.value[userId] || 0;
  return loaded < (user.photos?.length ?? 0);
}
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
  position: relative;
  min-height: 120px;
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

.gallery-loading {
  position: absolute;
  inset: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  background: rgba(255, 255, 255, 0.8);
  font-size: 0.9rem;
  color: #666;
}
</style>
