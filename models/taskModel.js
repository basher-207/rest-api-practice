const { v4 } = require("uuid");
const { writeTasks, readTasks } = require("../utils");

const findAll = async () => await readTasks();

const findByCompleted = async (completed) => {
  const tasks = await readTasks();
  
  if( completed === 'true' || completed === 'false' ){
    const booleanFilter = (completed === 'true');
    const filteredCompletedTasks = tasks.filter((task) => task.completed === booleanFilter);
    return filteredCompletedTasks;
  }else{
    return tasks;
  }
};

const findById = async (id) => {
  //return task with corresponding id
  const tasks = await readTasks();
  const task = tasks.find((task) => String(id) === String(task.id));
  if(task){
    return task;
  }
  throw new Error(`Task with id ${id} not found`);
};

const create = async (todo) => {
  /* create new task with unique id, push it into array of tasks,
    write new array in file and return created task*/
    const currentTasksArray = [...(await readTasks())];
    const generatedID = v4();

    const newTask = {
      id: generatedID,
      ...todo,
      completed: false
    }

    const updatedTasksArray = currentTasksArray.concat(newTask);
    await writeTasks(updatedTasksArray);

    return newTask;  
};

const update = async (id, task) => {
  /* find task, update info in it,
    write new array of tasks into file
    return updated task*/
  const tasks = [...(await readTasks())];
  const taskIndex = tasks.findIndex( task => String(task.id) === String(id));

  if(taskIndex >= 0){
    const updatedTask = {
      ...tasks[taskIndex],
      ...task
    };
    tasks[taskIndex] = updatedTask;
    await writeTasks(tasks);
    return updatedTask;
  }else{
    throw new Error(`Task with id ${id} not found`);
  }
};

const remove = async (id) => {
  /* find task, delete it from array of tasks,
  write new array of tasks into file*/
  const tasks = [...(await readTasks())];
  const taskIndex = tasks.findIndex( task => String(task.id) === String(id));

  if(taskIndex >= 0){
    tasks.splice(taskIndex,1);
    await writeTasks(tasks);
  }else{
    throw new Error(`Task with id ${id} not found`);
  }
};

module.exports = {
  findAll,
  findByCompleted,
  findById,
  create,
  update,
  remove,
};
