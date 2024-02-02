<template>
  <transition
    name="expand"
    @enter="enter"
    @leave="leave"
    @after-enter="afterEnter"
  >
    <ul
      v-if="menuOpen"
      class="absolute overflow-hidden rounded-lg top-10 -right-4 z-20 bg-[#696b6f] text-white"
    >
      <li
        class="p-3 text-sm font-medium cursor-pointer hover:bg-[#2f3033] transition-colors"
        v-for="item in menuItems"
        @click="$emit('action', item.action)"
        :key="item"
      >
        {{ item.title }}
      </li>
    </ul>
  </transition>
</template>

<script setup>
const emits = defineEmits(["action"]);
const props = defineProps({
  menuItems: {
    type: Object,
    required: true,
  },
  menuOpen: {
    type: Boolean,
    default: false,
  },
  classes: {
    type: String,
    default: "",
  },
});

const enter = (element) => {
  const el = element;
  el.style.height = "auto";
  const height = getComputedStyle(el).height;
  el.style.height = "0";
  getComputedStyle(el);
  setTimeout(() => {
    el.style.height = height;
  });
};

const afterEnter = (element) => {
  const el = element;
  el.style.height = "auto";
};

const leave = (element) => {
  const el = element;
  el.style.height = getComputedStyle(el).height;
  getComputedStyle(el);
  setTimeout(() => {
    el.style.height = "0";
  });
};
</script>

<style></style>
