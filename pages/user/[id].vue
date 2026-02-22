<template>
  <AwesomeArticle>
    <h1>User Todo's</h1>
    <div>
      Filters:
      <span>
        <label for="completed">Show completed</label>
        
        <input
          type="checkbox"
          id="completed"
          :key="status+'completed'"
          :checked="status==='completed' || status==='all'"
          @change="onStatusChange('completed', $event)"
        />
      </span>
      <span>
        <label for="pending">Show pending</label>
        <input
          type="checkbox"
          id="pending"
          :key="status+'pending'"
          :checked="status==='pending' || status==='all'"
          @change="onStatusChange('pending', $event)"
        />
      </span>
    </div>
    <ul>
      <li v-for="todo in filteredTodos" :key="todo.id">
        <h4>{{ todo.title }}</h4>
        <p>Status: {{ todo.completed ? 'Completed' : 'Pending' }}</p>
      </li>
    </ul>
  </AwesomeArticle>
</template>

<script setup>
const route = useRoute();
const router = useRouter();

const status = computed(() => route.query.status ?? 'all');


const { data: todos } = useAsyncData(
  `user-todos-${route.params.id}`,
  () =>
    fetch(
      `https://jsonplaceholder.typicode.com/users/${route.params.id}/todos`
    ).then((res) => res.json()),
  { server: false }
);

const filteredTodos = computed(() => {
  const list = todos.value ?? [];
  const s = status.value;
  if (!s || s === 'all') return list;
  return list.filter((todo) =>
    s === 'completed' ? todo.completed : !todo.completed
  );
});

function onStatusChange(value, event) {
  
  const checked = event.target.checked;
  let statusValue = status.value;

  if (checked) {
    statusValue =
      statusValue === 'completed' || statusValue === 'pending' ? 'all' : value;
  } else {
    if (statusValue === 'all') {
      statusValue = value === 'completed' ? 'pending' : 'completed';
    } else {
      statusValue = 'all';
    }
  }
  router.push({
    path: route.path,
    query: { ...route.query, status: statusValue },
  });
}
</script>
