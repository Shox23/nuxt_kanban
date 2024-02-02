<template>
  <div
    v-if="columnId == taskInfo.stageId"
    draggable="true"
    class="task bg-[#e5e7eb] text-black p-4 rounded-md cursor-grab"
  >
    <div class="task__header flex justify-between">
      <h3
        @click="router.push(`/task-${taskInfo.id}`)"
        class="text-lg font-medium cursor-pointer"
      >
        {{ taskInfo.title }}
      </h3>
      <div
        @click.stop="menuOpen = !menuOpen"
        class="border-rounded cursor-pointer rounded-full h-5 w-5 flex items-center justify-center relative"
      >
        <NuxtImg
          class="h-full w-full transition-all opacity-50 hover:opacity-100"
          src="/icons/menu.svg"
        />
        <Menu
          @action="handleMenuAcions"
          :menuOpen="menuOpen"
          :menuItems="menuItems"
        />
      </div>
    </div>
    <div class="task__body">
      <p class="opacity-70 text-sm border-b-2 pb-2 border-black">
        {{ taskInfo.desc }}
      </p>
      <span class="opacity-70 font-medium text-xs">{{ taskInfo.created }}</span>
    </div>

    <Modal
      title="Delete task"
      @close="closeModal"
      @cancel="closeModal"
      @submit="deleteTask"
      submitBtnTitle="Delete"
      :isOpen="deleteModalOpen"
    >
      <template #content>
        <div class="flex flex-col gap-3">
          <h3>Do you want to delete task: {{ taskInfo.title }}</h3>
        </div>
      </template>
    </Modal>

    <Modal
      title="Edit task"
      @close="closeModal"
      @cancel="closeModal"
      @submit="editTask"
      :isOpen="editModalOpen"
    >
      <template #content>
        <div class="flex flex-col gap-3">
          <CustomInput
            @updateData="updateTitleToEdit"
            :autofocus="true"
            @onEnter="editTask"
            placeholder="Title"
            :model="titleToEdit"
          />
          <CustomInput
            @updateData="updateDescToEdit"
            @onEnter="editTask"
            placeholder="Description"
            :model="descToEdit"
          />
        </div>
      </template>
    </Modal>
  </div>
</template>

<script setup>
import { useKanbanStore } from "~/store";

const store = useKanbanStore();
const router = useRouter();
const menuOpen = ref(false);
const deleteModalOpen = ref(false);
const editModalOpen = ref(false);
const titleToEdit = ref("");
const descToEdit = ref("");

const props = defineProps({
  taskInfo: {
    type: Object,
    required: true,
  },
  columnId: {
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

const updateTitleToEdit = (val) => {
  titleToEdit.value = val;
};

const updateDescToEdit = (val) => {
  descToEdit.value = val;
};

const closeModal = () => {
  if (deleteModalOpen.value) {
    deleteModalOpen.value = false;
  } else if (editModalOpen.value) {
    editModalOpen.value = false;
    titleToEdit.value = "";
    descToEdit.value = "";
  }
};

const handleMenuAcions = (value) => {
  if (value == menuItems[0].action) {
    deleteModalOpen.value = true;
  } else {
    editModalOpen.value = true;
    titleToEdit.value = props.taskInfo.title;
    descToEdit.value = props.taskInfo.desc;
  }
};

const editTask = () => {
  if (titleToEdit.value) {
    const data = {
      id: props.taskInfo.id,
      title: titleToEdit.value,
      desc: descToEdit.value ? descToEdit.value : "",
    };
    store.editTask(data);
    closeModal();
  } else {
    alert("Title input should not be empty!");
  }
};

const deleteTask = () => {
  store.deleteTask(props.taskInfo.id);
};
</script>
