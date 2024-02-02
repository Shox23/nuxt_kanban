<template>
  <div
    class="column rounded-lg bg-[#1f1d24] p-4 w-[300px] min-w-[300px] column__height text-white flex flex-col gap-4"
  >
    <div class="column__header flex items-start gap-2 justify-between">
      <h3 class="text-xl font-semibold">
        {{ title }}
      </h3>
      <div class="flex items-center gap-2">
        <div
          @click="openModal = !openModal"
          class="border-rounded cursor-pointer font-black rounded-full h-6 w-6 flex items-center justify-center transition-all opacity-50 hover:opacity-100"
        >
          <NuxtImg class="h-full w-full" src="/icons/add.svg" />
        </div>
        <div
          @click="menuOpen = !menuOpen"
          class="border-rounded cursor-pointer rounded-full h-6 w-6 flex items-center justify-center relative"
        >
          <NuxtImg
            class="h-full w-full transition-all opacity-50 hover:opacity-100"
            src="/icons/whiteMenu.svg"
          />
          <Menu
            @action="handleMenuAcions"
            :menuOpen="menuOpen"
            :menuItems="menuItems"
          />
        </div>
      </div>
    </div>

    <div
      class="column__body flex flex-col h-full gap-4 overflow-y-auto scrollbar-hide"
    >
      <slot name="tasks"></slot>
      <!-- <Task v-for="item in 7" :key="item" :taskInfo="taskInfo" /> -->
    </div>

    <Modal
      title="Add task"
      @close="closeModal"
      @cancel="closeModal"
      @submit="createNewTask"
      :isOpen="openModal"
    >
      <template #content>
        <div class="flex flex-col gap-3">
          <CustomInput
            @updateData="updateNewTaskTitle"
            :autofocus="true"
            @onEnter="createNewTask"
            placeholder="Title"
            :model="newTaskTitle"
          />
          <CustomInput
            @updateData="updateNewTaskDesc"
            @onEnter="createNewTask"
            placeholder="Description"
            :model="newTaskDesc"
          />
        </div>
      </template>
    </Modal>

    <Modal
      title="Delete stage"
      @close="closeModal"
      @cancel="closeModal"
      @submit="deleteStage"
      submitBtnTitle="Delete"
      :isOpen="openDeleteModal"
    >
      <template #content>
        <div class="flex flex-col gap-3 max-w-[300px]">
          <h3>
            Do you want to delete stage: "{{ title }}" and all relative tasks?
          </h3>
        </div>
      </template>
    </Modal>

    <Modal
      title="Edit stage"
      @close="closeModal"
      @cancel="closeModal"
      @submit="editStage"
      :isOpen="openEditModal"
    >
      <template #content>
        <div class="flex flex-col gap-3">
          <CustomInput
            :autofocus="true"
            @updateData="updateInputValue"
            @onEnter="editStage"
            placeholder="Title"
            :model="titleToEdit"
          />
        </div>
      </template>
    </Modal>
  </div>
</template>

<script setup>
import { useKanbanStore } from "~/store";

const store = useKanbanStore();
const openModal = ref(false);
const openDeleteModal = ref(false);
const openEditModal = ref(false);
const menuOpen = ref(false);
const titleToEdit = ref("");
const newTaskTitle = ref("");
const newTaskDesc = ref("");

const props = defineProps({
  title: {
    type: String,
    default: "",
  },
  id: {
    type: Number,
    required: true,
  },
});

const menuItems = [
  {
    title: "Delete",
    action: "delete",
  },
  {
    title: "Edit",
    action: "edit",
  },
];

const handleMenuAcions = (value) => {
  if (value == menuItems[0].action) {
    openDeleteModal.value = true;
  } else {
    titleToEdit.value = props.title;
    openEditModal.value = true;
  }
};

const updateNewTaskTitle = (val) => {
  newTaskTitle.value = val.trim();
};

const updateNewTaskDesc = (val) => {
  newTaskDesc.value = val.trim();
};

const updateInputValue = (val) => {
  titleToEdit.value = val.trim();
};

const editStage = () => {
  if (titleToEdit.value) {
    const data = {
      id: props.id,
      title: titleToEdit.value,
    };
    store.editStage(data);
    closeModal();
  } else {
    alert("Title input should not be empty!");
  }
};

const closeModal = () => {
  if (openModal.value) {
    openModal.value = false;
    newTaskTitle.value = "";
    newTaskDesc.value = "";
  } else if (openDeleteModal.value) {
    openDeleteModal.value = false;
  } else if (openEditModal.value) {
    openEditModal.value = false;
    titleToEdit.value = "";
  }
};

const deleteStage = () => {
  store.deleteStage(props.id);
};

const createNewTask = () => {
  if (newTaskTitle.value) {
    const newTask = {
      title: newTaskTitle.value,
      desc: newTaskDesc.value ? newTaskDesc.value : "",
      stageId: props.id,
    };
    store.createTask(newTask);
    closeModal();
  } else {
    alert("Title input should not be empty!");
  }
};
</script>
