const projectModel = require("../models/projects");
const taskModel = require("../models/task");
const userModel = require("../models/user");
const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const { ObjectId } = require("mongodb");


exports.findProject = async (project_name, _id) => {
  return await projectModel.findOne({ $and: [{ project_name: project_name }, { userId: _id }] }).exec();
};

exports.createProject = async (data) => {
  return await projectModel.create(data);
};

exports.findTask = async (data) => {
  const result = await taskModel
    .findOne({
      $and: [{ project_id: data.project_id }, { task_name: data.task_name }],
    })
    .exec();

  return result;
};



exports.updateProject = async (_id, data) => {
  const result = await projectModel.findByIdAndUpdate(_id, { project_name: data }, { new: true })
  return result
}

exports.deleteProject = async (_id) => {
  return await projectModel.findByIdAndDelete(_id)
}


exports.createTask = async (data) => {
  return await taskModel.create(data);
};

exports.updateTask = async (_id, data) => {
  return await taskModel.findByIdAndUpdate(_id, { task_name: data }, { new: true })
}

exports.deleteTask = async (_id) => {
  return await taskModel.findByIdAndDelete(_id)
}


exports.getAllProjects = async (data) => {
  return await projectModel.find({ userId: data }, { project_name: 1, _id: 0 })

}

exports.getAllTask = async (data) => {
  return await taskModel.find({ project_name: new ObjectId(data) }, { task_name: 1, _id: 0 })
}
exports.getProject = async (data) => {
  return await projectModel.findOne({ _id: new ObjectId(data) })
}

exports.getTask = async (data) => {
  return await taskModel.findOne({ _id: new ObjectId(data) })
}


exports.getAllProjectsWithTask = async (_id) => {
  const project = []
  const result = await projectModel.aggregate([
    {
      $match: {
        userId: new ObjectId(_id),

      }
    },
    {
      $lookup: {
        from: "tasks",
        localField: "_id",
        foreignField: "project_id",
        as: "projects"
      }
    },
    {

      $unwind: { path: "$projects", preserveNullAndEmptyArrays: true },

    },
    { $group: { _id: "$project_name", task_name: { $push: "$projects.task_name" } } },

    {

      $project: {
        project_name: "$_id",
        task_name: "$task_name",
        _id: 0

      }
    }
  ])
  return result
}