<template>
  <button
    @click="$emit('onClick')"
    class="bg-[#1f1d24] rounded-xl border-none text-white px-4 py-2 cursor-pointer hover:scale-110 transition-transform duration-300"
  >
    {{ title }}
  </button>
</template>

<script setup>
const emits = defineEmits(["onClick"]);
const props = defineProps({
  title: {
    type: String,
    required: true,
  },
});
</script>

<style></style>
