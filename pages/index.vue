<template>
  <div class="home h-screen overflow-y-hidden overflow-x-auto">
    <transition-group
      name="list"
      tag="div"
      class="flex items-start gap-4 p-4 h-full"
      v-if="!store.isEmpty"
    >
      <Column
        v-for="item in store.stages"
        :key="item.id"
        :id="item.id"
        :title="item.title"
      >
        <template #tasks>
          <Task
            ref="itemRefs"
            v-for="task in store.tasks"
            @dragstart="() => dragStart(event, stage, task)"
            @dragend="dragEnd"
            @dragover.prevent="onDragOver"
            @dragleave="onDragLeave"
            @drop.prevent="onDrop"
            :key="task"
            :taskInfo="task"
            :column-id="item.id"
          />
        </template>
      </Column>
    </transition-group>
    <div
      v-else
      class="text-white h-full w-full flex items-center justify-center text-3xl uppercase"
    >
      Empty
    </div>

    <Modal
      title="Add stage"
      @close="closeModal"
      @cancel="closeModal"
      @submit="addNewStage"
      :isOpen="store.addStagesModal"
    >
      <template #content>
        <div>
          <CustomInput
            @updateData="updateNewStageTitle"
            @onEnter="addNewStage"
            placeholder="Title"
            :model="newStageTitle"
          />
        </div>
      </template>
    </Modal>
  </div>
</template>

<script setup>
import { useKanbanStore } from "~/store";

const store = useKanbanStore();
const currentTask = ref(null);
const currentStage = ref(null);
const newStageTitle = ref("");

const updateNewStageTitle = (val) => {
  newStageTitle.value = val.trim();
};

const closeModal = () => {
  store.toggleModal();
  newStageTitle.value = "";
};

const addNewStage = () => {
  if (newStageTitle.value) {
    const newStage = {
      title: newStageTitle.value,
    };
    store.createStage(newStage);
    closeModal();
  } else {
    alert("Title input should not be empty!");
  }
};

const dragStart = (stage, task) => {
  currentTask.value = task;
  currentStage.value = stage;
};

const dragEnd = () => {};

const onDragOver = () => {};

const onDragLeave = () => {};

const onDrop = () => {};
</script>
