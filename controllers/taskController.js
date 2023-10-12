const Task = require("../models/taskModel");
const { getPostData } = require("../utils");

// @desc Gets All tasks with filter
// @route   GET /api/tasks?filterByCompleted=true|false
const getTasks = async (query, res) => {
  // implement logic to obtain all tasks or tasks with filtering and send tasks as pesponse
  try {
    let tasks;
    if(query){
      tasks = await Task.findByCompleted(query.filterByCompleted);
    }else{
      tasks = await Task.findAll();
    }
    res.writeHead(200, { "Content-Type": "application/json" });
    res.end(JSON.stringify(tasks)); 

  } catch (e) {
    res.writeHead(404, { "Content-Type": "application/json" });
    res.end(
      JSON.stringify({
        error: e.message,
      })
    );
  }
};

// @desc Get task by id
// @route   GET /api/tasks/:id
const getTaskById = async (id, res) => {
  // implement logic to obtain task by id and send this task as pesponse
  try {
    const task = await Task.findById(id);
    res.writeHead(200, { "Content-Type": "application/json" });
    res.end(JSON.stringify(task));

  } catch (e) {
    res.writeHead(404, { "Content-Type": "application/json" });
    res.end(
      JSON.stringify({
        message: e.message,
      })
    );
  }
};

// @desc Create new task
// @route   POST /api/tasks
const addTask = async (req, res) => {
  // implement logic to create task and send created task as response
  try {
    const body = await getPostData(req);
    const task = await Task.create(JSON.parse(body));
    res.writeHead(201, { "Content-Type": "application/json" });
    res.end(JSON.stringify(task));
  } catch (e) {
    res.writeHead(404, { "Content-Type": "application/json" });
    res.end(
      JSON.stringify({
        error: e.message,
      })
    );
  }
};

// @desc Update task by id
// @route   PATCH /api/tasks/:id
const updateTask = async (req, id, res) => {
  // implement logic to update task and send updated task as response
  try {
    const body = JSON.parse(await getPostData(req));
    const updatedTask = await Task.update(id, body);
    res.writeHead(200, { "Content-Type": "application/json" });
    res.end(JSON.stringify(updatedTask));
  } catch (e) {
    res.writeHead(404, { "Content-Type": "application/json" });
    res.end(
      JSON.stringify({
        message: e.message,
      })
    );
  }
};

// @desc delete task by id
// @route   DELETE /api/tasks/:id
const deleteTaskById = async (id, res) => {
  // implement logic to delete task
  try {
    await Task.remove(id);
    res.writeHead(200, { "Content-Type": "application/json" });
    res.end(
      JSON.stringify({
        message: `Task with id ${id} was deleted`,
      })
    );
  } catch (e) {
    res.writeHead(404, { "Content-Type": "application/json" });
    res.end(
      JSON.stringify({
        message: e.message,
      })
    );
  }
};

module.exports = {
  getTasks,
  getTaskById,
  addTask,
  updateTask,
  deleteTaskById,
};
