const url = require("url");
const {
  getTasks,
  getTaskById,
  addTask,
  updateTask,
  deleteTaskById,
} = require("./controllers/taskController");

const router = (req, res) => {
  //write logic to parse request url and choose method from taskController according to endpoint
  const { pathname, query} = url.parse(req.url, true);

  if( pathname === '/api/v1/tasks'){
    if(req.method === "GET"){
      getTasks(query, res);
    }else if(req.method === "POST"){
      addTask(req, res);
    }
    
  }else if(pathname.match(/^\/api\/v1\/tasks\/([a-zA-Z0-9-]+)$/)){
    const id = pathname.split('/')[4];

    if(req.method === 'GET'){
      getTaskById(id, res);
    }else if(req.method === 'DELETE'){
      deleteTaskById(id, res);
    }else if(req.method === 'PATCH'){
      updateTask(req, id, res);
    }

  }else{
    res.writeHead(404, { "Content-Type": "application/json" });
    res.end(
      JSON.stringify({
        message: "Route Not Found: Please use the /api/v1/tasks endpoint",
      })
    );
  }
};

module.exports = router;
