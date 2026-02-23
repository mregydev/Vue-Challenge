<template>
  <AwesomeArticle>
    <UserTodos :user-id="route.params.id" />
  </AwesomeArticle>
</template>

<script setup>
const route = useRoute();
</script>
