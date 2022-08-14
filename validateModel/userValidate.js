var Joi = require("joi");

module.exports.userSignUp = Joi.object({
    name: Joi.string().required(),
    email:Joi.string().email().required(),
    password:Joi.string().required()


});

module.exports.login = Joi.object({
    email:Joi.string().email().required(),
    password:Joi.string().required()
});

module.exports.project = Joi.object({
  project_name:Joi.string().required()
});

module.exports.task = Joi.object({
  project_id:Joi.string().required(),
  task_name:Joi.string().required()
});

module.exports.getAllTask = Joi.object({
  project_id:Joi.string().required(),
});
module.exports.getTask = Joi.object({
  task_id:Joi.string().required(),
});


module.exports.updateProject = Joi.object({
   project_id:Joi.string().required(),
   project_name:Joi.string().required()
});

module.exports.getProject = Joi.object({
  project_id:Joi.string().required(),
 
});

module.exports.deleteProject = Joi.object({
  project_id:Joi.string().required(),
 
});

module.exports.updateTask = Joi.object({
  task_id:Joi.string().required(),
  task_name:Joi.string().required()
})

module.exports.deleteTask = Joi.object({
  task_id:Joi.string().required(),
})

module.exports.getAllProjectsWithTask = Joi.object({
  user_id:Joi.string().required(),
})