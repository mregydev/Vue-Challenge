<template>
  <nav class="navbar">
    <span class="navbar-label">Navigation</span>
    <ul class="navbar-list">
      <li><a href="/">Home</a></li>
      <li><a href="/">Home 2</a></li>
      <li><a href="/">Home 3</a></li>
      <li><a href="/">Home 4</a></li>
      <li><NuxtLink to="/gallery">Gallery</NuxtLink></li>
    </ul>
  </nav>
</template>

<style scoped>
.navbar {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.navbar-label {
  margin-bottom: 0.25rem;
}

.navbar-list {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  list-style: none;
  margin: 0;
  padding: 0;
}

.navbar-list li a,
.navbar-list li :deep(a) {
  display: block;
  padding: 0.5rem 0;
}
</style>
