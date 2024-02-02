<template>
  <header class="bg-white p-4 flex items-center justify-between">
    <nav class="flex items-center gap-5">
      <NuxtLink to="/">Home</NuxtLink>
      <NuxtLink to="/charts">Charts</NuxtLink>
    </nav>
    <CustomButton @on-click="store.toggleModal()" title="Add stage" />
  </header>
</template>

<script setup>
import { useKanbanStore } from "~/store";

const store = useKanbanStore();
</script>

<style></style>
