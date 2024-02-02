export const useKanbanStore = defineStore("useKanbanStore", () => {
  const stages = ref([]);
  const tasks = ref([]);
  const isEmpty = ref(false);
  const addStagesModal = ref(false);
  const currentTask = ref(null);
  const currentStage = ref(null);

  const createStage = (data) => {
    const newStage = {
      id: new Date().getTime(),
      title: data.title,
      items: [],
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

  const getStages = () => {
    if (localStorage.allStages) {
      const allStages = JSON.parse(localStorage.allStages);
      if (allStages.length) {
        allStages.forEach((element) => {
          if (stages.value.find((item) => item.id == element.id)) return;
          stages.value.push(element);
        });
      } else {
        isEmpty.value = true;
      }
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
    if (!stages.value.length) isEmpty.value = true;
  };

  const deleteStageTasks = (id) => {
    tasks.value = tasks.value.filter((item) => item.stageId !== id);
    let allTasks = JSON.parse(localStorage.allTasks);
    allTasks = allTasks.filter((item) => item.stageId !== id);
    localStorage.allTasks = JSON.stringify(allTasks);
  };

  const createTask = (data) => {
    const newTask = {
      id: new Date().getTime(),
      title: data.title,
      desc: data.desc,
      stageId: data.stageId,
      created: new Date().toLocaleDateString(),
    };

    const currentStage = stages.value.find(
      (item) => item.id == newTask.stageId
    );
    currentStage.items.push(newTask);
    const allStages = JSON.parse(localStorage.allStages);
    const currentLocalStage = allStages.findIndex(
      (item) => item.id == data.stageId
    );
    allStages[currentLocalStage].items.push(newTask);
    localStorage.allStages = JSON.stringify(allStages);

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
    } else if (localStorage.allStages) {
      const allStages = JSON.parse(localStorage.allStages);
      allStages.forEach((element) => {
        tasks.value.push([...element.items]);
      });
      if (tasks.value.length)
        localStorage.allTasks = JSON.stringify(tasks.value);
    }
  };

  const deleteTask = (id, stageId) => {
    tasks.value = tasks.value.filter((item) => item.id !== id);
    let allTasks = JSON.parse(localStorage.allTasks);
    allTasks = allTasks.filter((item) => item.id !== id);
    localStorage.allTasks = JSON.stringify(allTasks);
    const currentStage = stages.value.findIndex((item) => item.id == stageId);
    stages.value[currentStage].items = stages.value[currentStage].items.filter(
      (task) => task.id !== id
    );
    const allStages = JSON.parse(localStorage.allStages);
    const currentLocalStage = allStages.findIndex((item) => item.id == stageId);
    allStages[currentLocalStage].items = allStages[
      currentLocalStage
    ].items.filter((task) => task.id !== id);
    localStorage.allStages = JSON.stringify(allStages);
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

    const currentStage = stages.value.findIndex(
      (item) => item.id == data.stageId
    );
    const currentTask = stages.value[currentStage].items.findIndex(
      (item) => item.id == data.id
    );
    stages.value[currentStage].items[currentTask].title = data.title;
    stages.value[currentStage].items[currentTask].desc = data.desc;

    const allStages = JSON.parse(localStorage.allStages);
    const currentLocalStage = allStages.findIndex(
      (item) => item.id == data.stageId
    );
    const currentLocalTask = stages.value[currentStage].items.findIndex(
      (item) => item.id == data.id
    );
    allStages[currentLocalStage].items[chosenLocalTask].title = data.title;
    allStages[currentLocalStage].items[chosenLocalTask].desc = data.desc;
    localStorage.allStages = JSON.stringify(allStages);
  };

  const toggleModal = () => {
    if (addStagesModal.value) {
      addStagesModal.value = false;
    } else {
      addStagesModal.value = true;
    }
  };

  const dragStartHandler = (stage, task) => {
    currentTask.value = task;
    currentStage.value = stage;
  };

  const dropHandler = (stage, task) => {
    const taskIndex = currentStage.value.items.indexOf(currentTask.value);
    currentStage.value.items.splice(taskIndex, 1);
    const stageIndex = stage.items.indexOf(task);
    currentTask.value.stageId = stage.id;
    stage.items.splice(stageIndex + 1, 0, currentTask.value);
    stages.value = stages.value.map((element) => {
      if (element.id === stage.id) {
        return stage;
      }
      if (element.id === currentStage.value.id) {
        return currentStage.value;
      }
      return element;
    });

    let allStages = JSON.parse(localStorage.allStages);
    allStages = allStages.map((element) => {
      if (element.id === stage.id) {
        return stage;
      }
      if (element.id === currentStage.value.id) {
        return currentStage.value;
      }
      return element;
    });
    localStorage.allStages = JSON.stringify(allStages);
  };

  const stageDropHandler = (stage) => {
    const stageIndex = stages.value.indexOf(stage);
    currentTask.value.stageId = stage.id;
    stages.value[stageIndex].items.push(currentTask.value);
    const taskIndex = currentStage.value.items.indexOf(currentTask.value);
    currentStage.value.items.splice(taskIndex, 1);
    stages.value = stages.value.map((element) => {
      if (element.id === stage.id) {
        return stage;
      }
      if (element.id === currentStage.value.id) {
        return currentStage.value;
      }
      return element;
    });

    let allStages = JSON.parse(localStorage.allStages);
    allStages = allStages.map((element) => {
      if (element.id === stage.id) {
        return stage;
      }
      if (element.id === currentStage.value.id) {
        return currentStage.value;
      }
      return element;
    });
    localStorage.allStages = JSON.stringify(allStages);
    console.log(stages.value);
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
    dragStartHandler,
    editTask,
    stageDropHandler,
    dropHandler,
    addStagesModal,
    stages,
    tasks,
    isEmpty,
  };
});
