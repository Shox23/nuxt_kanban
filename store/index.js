export const useKanbanStore = defineStore("useKanbanStore", () => {
  const stages = ref([]);
  const tasks = ref([]);
  const isEmpty = ref(false);
  const addStagesModal = ref(false);

  const createStage = (data) => {
    const newStage = {
      id: new Date().getTime(),
      title: data.title,
    };

    stages.value.push(newStage);
    isEmpty.value = false;
    if (localStorage.allStages) {
      const allStages = JSON.parse(localStorage.allStages);
      allStages.push(newStage);
      localStorage.allStages = JSON.stringify(allStages);
    } else {
      const allStages = [];
      allStages.push(newStage);
      localStorage.allStages = JSON.stringify(allStages);
    }
  };

  const createTask = (data) => {
    const newTask = {
      id: new Date().getTime(),
      title: data.title,
      desc: data.desc,
      stageId: data.stageId,
      created: new Date().toLocaleDateString(),
    };
    tasks.value.push(newTask);
    if (localStorage.allTasks) {
      const allStages = JSON.parse(localStorage.allTasks);
      allStages.push(newTask);
      localStorage.allTasks = JSON.stringify(allStages);
    } else {
      const allTasks = [];
      allTasks.push(newTask);
      localStorage.allTasks = JSON.stringify(allTasks);
    }
  };

  const getTasks = () => {
    if (localStorage.allTasks) {
      const allTasks = JSON.parse(localStorage.allTasks);
      allTasks.forEach((element) => {
        if (tasks.value.find((item) => item.id == element.id)) return;
        tasks.value.push(element);
      });
    }
  };

  const getStages = () => {
    if (localStorage.allStages) {
      const allStages = JSON.parse(localStorage.allStages);
      allStages.forEach((element) => {
        if (stages.value.find((item) => item.id == element.id)) return;
        stages.value.push(element);
      });
    } else {
      isEmpty.value = true;
    }
  };

  const editStage = (data) => {
    const chosenStage = stages.value.findIndex((item) => item.id == data.id);
    stages.value[chosenStage].title = data.title;
    const allStages = JSON.parse(localStorage.allStages);
    const chosenLocalStage = allStages.findIndex((item) => item.id == data.id);
    allStages[chosenLocalStage].title = data.title;
    localStorage.allStages = JSON.stringify(allStages);
  };

  const deleteStage = (id) => {
    stages.value = stages.value.filter((item) => item.id !== id);
    let allStages = JSON.parse(localStorage.allStages);
    allStages = allStages.filter((item) => item.id !== id);
    localStorage.allStages = JSON.stringify(allStages);
    deleteStageTasks(id);
  };

  const deleteStageTasks = (id) => {
    tasks.value = tasks.value.filter((item) => item.stageId !== id);
    let allTasks = JSON.parse(localStorage.allTasks);
    allTasks = allTasks.filter((item) => item.stageId !== id);
    localStorage.allTasks = JSON.stringify(allTasks);
  };

  const deleteTask = (id) => {
    tasks.value = tasks.value.filter((item) => item.id !== id);
    let allTasks = JSON.parse(localStorage.allTasks);
    allTasks = allTasks.filter((item) => item.id !== id);
    localStorage.allTasks = JSON.stringify(allTasks);
  };

  const editTask = (data) => {
    const chosenTask = tasks.value.findIndex((item) => item.id == data.id);
    tasks.value[chosenTask].title = data.title;
    tasks.value[chosenTask].desc = data.desc;
    const allTasks = JSON.parse(localStorage.allTasks);
    const chosenLocalTask = allTasks.findIndex((item) => item.id == data.id);
    allTasks[chosenLocalTask].title = data.title;
    allTasks[chosenLocalTask].desc = data.desc;
    localStorage.allTasks = JSON.stringify(allTasks);
  };

  const toggleModal = () => {
    if (addStagesModal.value) {
      addStagesModal.value = false;
    } else {
      addStagesModal.value = true;
    }
  };

  return {
    createStage,
    getTasks,
    getStages,
    createTask,
    deleteStage,
    deleteTask,
    toggleModal,
    editStage,
    editTask,
    addStagesModal,
    stages,
    tasks,
    isEmpty,
  };
});
