<template>
  <Teleport to="body">
    <Transition>
      <div
        class="absolute top-0 left-0 bottom-0 right-0 bg-modal-color z-50 flex items-center justify-center"
        @click="$emit('close')"
        v-if="isOpen"
      >
        <div @click.stop class="bg-white rounded-xl p-4 flex flex-col gap-4">
          <div v-if="title">
            <h3 class="text-xl font-semibold">
              {{ title }}
            </h3>
          </div>

          <div>
            <slot name="content"></slot>
          </div>

          <div class="w-full flex items-center justify-end gap-2">
            <CustomButton @on-click="$emit('cancel')" :title="cancelBtnTitle" />
            <CustomButton @on-click="$emit('submit')" :title="submitBtnTitle" />
          </div>
        </div>
      </div>
    </Transition>
  </Teleport>
</template>

<script setup>
const emits = defineEmits(["cancel", "close", "submit"]);
const props = defineProps({
  title: {
    type: String,
    default: "",
  },
  cancelBtnTitle: {
    type: String,
    default: "Cancel",
  },
  submitBtnTitle: {
    type: String,
    default: "Submit",
  },
  isOpen: {
    type: Boolean,
    default: false,
  },
});
</script>