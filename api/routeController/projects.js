const projectController = require('../controller/projectController')
const genRes = require('../services/genre')

exports.createProject = async (req, res) => {
    try {

        const findProject = await projectController.findProject(req.body.project_name, req.user._id)

        if (!findProject) {
            const projectObj = {
                userId: req.user._id,
                project_name: req.body.project_name
            }

            const project = await projectController.createProject(projectObj)

            if (project) {
                return res.send(genRes.generateResponse(true, "Project Created Successfully ", 200, project));
            } else {
                return res.send(genRes.generateResponse(false, "Project Creation unsuccessfully", 400,));
            }
        } else {
            return res.send(genRes.generateResponse(false, "Project already created", 400,));
        }
    } catch (error) {

        return res.send(genRes.generateResponse(false, error.message, 400, null));
    }

}


exports.updateProject = async (req, res) => {
    try {


        const updateProject = await projectController.updateProject(req.body.project_id, req.body.project_name)

        if (updateProject) {
            return res.send(genRes.generateResponse(true, " Project Updated Successfully ", 200, updateProject));
        } else {
            return res.send(genRes.generateResponse(false, " Project Update  Unsccessfully", 400,));
        }

    } catch (error) {
        return res.send(genRes.generateResponse(false, error.message, 400, null));
    }
}
exports.getProject = async (req, res) => {
    try {


        const getProject = await projectController.getProject(req.query.project_id)

        if (getProject) {
            return res.send(genRes.generateResponse(true, "  Fetched Project  Successfully ", 200, getProject));
        } else {
            return res.send(genRes.generateResponse(false, "  Fetching Project   Unsccessfully", 400,));
        }

    } catch (error) {
        return res.send(genRes.generateResponse(false, error.message, 401, null));
    }
}


exports.deleteProject = async (req, res) => {
    try {


        const deleteProject = await projectController.deleteProject(req.body.project_id)

        if (deleteProject) {
            return res.send(genRes.generateResponse(true, " Project Deleted Successfully ", 200, deleteProject));
        } else {
            return res.send(genRes.generateResponse(false, " Project Delete Unsccessfully", 400,))
        }

    } catch (error) {
        return res.send(genRes.generateResponse(false, error.message, 401, null));
    }
}

exports.createTask = async (req, res) => {
    try {

        const findTask = await projectController.findTask(req.body)

        if (!findTask) {
            const projectObj = {
                project_id: req.body.project_id,
                task_name: req.body.task_name
            }

            const project = await projectController.createTask(projectObj)

            if (project) {
                return res.send(genRes.generateResponse(true, "Task Created Successfully ", 200, project));
            } else {
                return res.send(genRes.generateResponse(false, "Task Creation unsuccessfully", 400,));
            }
        } else {
            return res.send(genRes.generateResponse(false, "Task already created", 400,));
        }
    } catch (error) {

        return res.send(genRes.generateResponse(false, error.message, 400, null));
    }

}

exports.updateTask = async (req, res) => {
    try {

        const updateTask = await projectController.updateTask(req.body.task_id, req.body.task_name)

        if (updateTask) {
            return res.send(genRes.generateResponse(true, " Task Updated Successfully ", 200, updateTask));
        } else {
            return res.send(genRes.generateResponse(false, " Task Update  Unsccessfully", 400,));
        }

    } catch (error) {
        return res.send(genRes.generateResponse(false, error.message, 400, null));
    }
}

exports.getTask = async (req, res) => {
    try {
        const getTask = await projectController.getTask(req.query.task_id)

        if (getTask) {
            return res.send(genRes.generateResponse(true, "  Fetched Task Successfully ", 200, getTask));
        } else {
            return res.send(genRes.generateResponse(false, "  Fetching Task   Unsccessfully", 400,));
        }

    } catch (error) {
        return res.send(genRes.generateResponse(false, error.message, 401, null));
    }
}

exports.deleteTask = async (req, res) => {
    try {
        const deleteTask = await projectController.deleteTask(req.body.task_id)

        if (deleteTask) {
            return res.send(genRes.generateResponse(true, " Task Deleted Successfully ", 200, deleteTask));
        } else {
            return res.send(genRes.generateResponse(false, " Task Delete Unsccessfully", 400,))
        }

    } catch (error) {
        return res.send(genRes.generateResponse(false, error.message, 400, null));
    }
}

exports.getAllProjectsWithTask = async (req, res) => {
    try {

        const getAllProjectsWithTask = await projectController.getAllProjectsWithTask(req.user._id)

        if (getAllProjectsWithTask.length > 0) {
            return res.send(genRes.generateResponse(true, " Task Deleted Successfully ", 200, getAllProjectsWithTask));
        } else {
            return res.send(genRes.generateResponse(false, " Task Delete Unsccessfully", 400,))
        }

    } catch (error) {
        return res.send(genRes.generateResponse(false, error.message, 400, null));
    }
}


exports.getAllProjects = async (req, res) => {
    try {
        const findAllProject = await projectController.getAllProjects(user_id)
        if (findAllProject.length > 0) {
            return res.send(genRes.generateResponse(true, " Fetching Projects  Successfully ", 200, findAllProject));
        } else {
            return res.send(genRes.generateResponse(false, " Projects Not Found", 400,));
        }

    } catch (error) {
        return res.send(genRes.generateResponse(false, error.message, 400, null));
    }
}

exports.getallTasks = async (req, res) => {
    try {

        const findAllTask = await projectController.getAllTask(req.query.project_id)

        if (findAllTask.length > 0) {
            return res.send(genRes.generateResponse(true, " Fetching Tasks Successfully ", 200, findAllTask));
        } else {
            return res.send(genRes.generateResponse(false, " Task Not Found", 400,));
        }

    } catch (error) {
        return res.send(genRes.generateResponse(false, error.message, 400, null));
    }
}