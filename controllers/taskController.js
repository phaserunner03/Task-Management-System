const Task = require('../models/taskModel');

exports.getAllTasks = async (req,res)=>{
    try{
      const {page =1, limit = 10}= req.query;
      const pageNumber = parseInt(page,10);
      const limitNumber = parseInt(limit,10);
      const tasks = await Task.find({userId:req.user._id}).skip((pageNumber-1)*limitNumber).limit(limitNumber);
      const totalTasks = await Task.countDocuments({userId:req.user._id});
      res.status(200).json({tasks,currentPage: pageNumber,totalPages: Math.ceil(totalTasks/limitNumber), totalTasks});
    }
    catch(err){
      res.status(500).json({message: "Error fetching tasks", error: err.message})
    }  
};

exports.getTaskById = async (req,res)=>{
  try{
    const task = await Task.findOne({_id:req.params.id, userId:req.user._id});
    if(!task){
      return res.status(404).json({message: "Task not found"});
    }
    res.status(200).json(task);
  }
  catch(err){
    res.status(500).json({message: "Error fetching task", error: err.message})
  }

}
exports.createTask = async (req,res)=>{
  try{
    const {title,description, status}=req.body;
    if(!title || !status){
      return res.status(400).json({message: "Please provide title and status"});
    }
    const now = new Date();
    const newTask = new Task({
        userId: req.user._id,
        title,
        description,
        status,
        create_at:now,
        updated_at: now
      })
    await newTask.save();
    res.status(201).json(newTask);
    
  }
  catch(err){
    res.status(500).json({ message: 'Server error', error: err.message });
  }

}
exports.updateTaskById = async (req, res) => {
    try {
        const { title, description, status } = req.body;

        if (!title && !description && !status) {
            return res.status(400).json({ message: "Please provide at least one field to update" });
        }

        const now = new Date();

        // Find and update the task or create a new one if it doesn't exist
        const task = await Task.findOneAndUpdate(
            { _id: req.params.id, userId: req.user._id },
            {
                $set: {
                    ...(title && { title }),
                    ...(description && { description }),
                    ...(status && { status }),
                    updated_at: now,
                },
                $setOnInsert: {
                    create_at: now,
                    userId: req.user._id,
                },
            },
            { new: true, upsert: true }
        );

        res.status(200).json(task);
    } catch (err) {
        res.status(500).json({ message: "Server error", error: err.message });
    }
};
exports.deleteTaskById = async (req, res) => {
    try {
        // Find the task by ID and userId
        const task = await Task.findOneAndDelete({ _id: req.params.id, userId: req.user._id });

        // If task is not found, return a 404 error
        if (!task) {
            return res.status(404).json({ message: 'Task not found or you are not authorized to delete this task' });
        }

        // If task is successfully deleted, return a success message
        res.status(200).json({ message: 'Task deleted successfully' });
    } catch (err) {
        // Handle any server errors
        res.status(500).json({ message: 'Server error', error: err.message });
    }
};



exports.deleteAllTasks = async (req, res) => {
    try {
        // Attempt to delete tasks belonging to the user
        const result = await Task.deleteMany({ userId: req.user._id });

        // Check if no tasks were deleted
        if (result.deletedCount === 0) {
            return res.status(404).json({ message: 'No tasks found to delete' });
        }

        // Respond with the number of deleted tasks
        res.status(200).json({ message: `${result.deletedCount} tasks deleted` });
    } catch (err) {
        // Log and respond with detailed server error information
        console.error('Error deleting tasks:', err);
        res.status(500).json({ message: 'Server error', error: err.message });
    }
};

