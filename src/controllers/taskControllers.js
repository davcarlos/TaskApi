import Task from '../models/Task';
import {getPagination} from '../libs/getPagination';

export const findAllTasks = async (req,res) => {
    
    try {
        /* Traditional mode to list all objects
         const tasks = await Task.find();*/

         const {size,page,title} = req.query

         const condition = title ? {title: {$regex: new RegExp(title), $options:"i" }} : {};

         console.log(condition);

        const {limit,offset} = getPagination(page,size);

        const data = await Task.paginate(condition,{offset, limit});
         res.json({
             totalItems: data.totalDocs,
             tasks: data.docs,
             totalPages: data.totalPages,
             currentPage: data.page - 1
         });
    } catch (error) {
        res.status(404).json({
            message: error.message || 'Something goes wrong while returning the task'
        })
    }

};

export const createTask = async (req, res) => {

    if (!req.body.title) {

        return res.status(400).send({ message: 'Ccontent cannot be empty'});

    }




    try {
        const newTask = new Task ({title:req.body.title,
            description:req.body.description,
            done: req.body.done ? req.body.done : false
        });
        await newTask.save();
        console.log(newTask);
         
         res.json('saving a new task')
    } catch (error) {
        res.status(404).json({
            message: error.message || 'Something goes wrong while returning the task'
        })
        
    }
 };

 export const findOneTask =  async (req, res) => {
     console.log(req.params.id)
    
    try {
        const task = await Task.findById(req.params.id);
        res.json(task);
        
      } catch (e) {
        res.status(500).send({message: `Task with id ${req.params.id} does not exists` });
        
        
      }
 };

 export const deleteTask = async (req, res) => {  
   
   try {
        await Task.findByIdAndDelete(req.params.id);
       res.json({message: "Task were deleted sucesfully"});
       
     } catch (e) {
        res.status(500).send({message: `Task with id ${req.params.id} cannot be deleted` });
       
     }
};

export const findAllDoneTask = async (req, res) => {

    const tasks = await Task.find({done: true});
    res.json(tasks);

}

export const updateTask = async(req, res) => {
    try {
        const updatedTask = await Task.findByIdAndUpdate(req.params.id, req.body,{
            useFindAndModify:false
        })
        res.send('Task was updated sucesfully')
    } catch (error) {
        console.log(error.message)
        res.status(404).send(`Task with id ${req.params.id} cannot be updated`)
        
    }
}