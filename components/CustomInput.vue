<template>
  <input
    class="border-none outline-none px-4 py-2 rounded-xl text-lg bg-[#e5e7eb]"
    :placeholder="placeholder"
    :autofocus="autofocus"
    :value="model"
    :type="type"
    @input="$emit('updateData', $event.target.value)"
    @keydown.enter="$emit('onEnter')"
  />
</template>

<script setup>
const emits = defineEmits(["updateData", "onEnter"]);
const props = defineProps({
  type: {
    type: String,
    default: "text",
  },
  autofocus: {
    type: Boolean,
    default: false,
  },
  placeholder: {
    type: String,
    default: "text",
  },
  model: {
    type: String,
    default: "",
  },
});
</script>

<style></style>
