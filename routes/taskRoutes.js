const express = require('express');
const {
    getAllTasks,
    getTaskById,
    createTask,
    updateTaskById,
    deleteTaskById,
    deleteAllTasks
} = require('../controllers/taskController');

const router = express.Router();

router.get('/getAllTasks', getAllTasks);
router.get('/getTask/:id', getTaskById);
router.post('/createTask', createTask);
router.put('/updateTask/:id', updateTaskById);
router.delete('/deleteTask/:id', deleteTaskById);
router.delete('/deleteAll',deleteAllTasks);
module.exports = router;