const {Task, User} = require('../models');

module.exports.createTask = async(req, res, next) => {
    try {
        const {body, userInstance} = req;
        // const createdTask = await Task.create({...body, userId});

        const task = await userInstance.createTask(body);
        res.status(201).send(task);
    } catch(error) {
        next(error)
    }

}


module.exports.getAllUserTasks = async(req, res, next) => {
    try {
        const {userInstance} = req;
        const alltasks = await userInstance.getTasks();
        res.status(200).send(alltasks);
    } catch(error) {
        next(error)
    }
}


module.exports.getOneTask = async(req, res, next) => {
    try {
        const {params: {taskId}} = req;
        const task = await Task.findByPk(taskId);
        res.status(200).send(task);
    } catch(error) {
        next(error);
    }
}
module.exports.updateTask = async(req, res, next) => {
    ///Homework task
}



module.exports.deleteTask = async(req, res, next) => {
    try {
        const {params: {taskId}} = req;
        const deletedTask = await Task.destroy({
                    where: {
                        id: taskId
                    }})
        console.log(deletedTask);
        res.status(200).send({deletedTask})
    }catch(error) {
        next(error);
    }
}


module.exports.countUserTasks = async (req, res, next) => {
    try {   
        const {userInstance} = req;
        const count = await userInstance.countTasks();
        res.status(200).send({count});
    } catch(error) {
        next(error);
    }
}