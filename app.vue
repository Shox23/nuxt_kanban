<template>
  <div class="app">
    <NuxtLayout>
      <Header />
      <NuxtPage />
    </NuxtLayout>
  </div>
</template>

<script setup>
import { useKanbanStore } from "./store";

const store = useKanbanStore();

onMounted(() => {
  store.getStages();
  store.getTasks();
});
</script>
