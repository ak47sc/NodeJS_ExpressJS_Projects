const express = require("express");
const router = express.Router();
const {
  getAllTasks,
  createTask,
  UpdateTask,
  getTask,
  deleteTask,
} = require("../controllers/tasks");

router.route("/").get(getAllTasks).post(createTask);
router.route("/:id").get(getTask).patch(UpdateTask).delete(deleteTask);

module.exports = router;
