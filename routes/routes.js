const uservalidater = require('../validateModel/userValidate')
const userRouteController = require('../api/routeController/userController')
const authorization = require('../api/services/auth')
const projectRouteController = require('../api/routeController/projects')




module.exports = function (app, validator) {

  app.post('/api/user/signup', validator.body(uservalidater.userSignUp), userRouteController.userSingUp)

  app.post('/api/user/login', validator.body(uservalidater.login), userRouteController.userLogin)

  app.post('/api/user/logout', authorization ,userRouteController.logout)

  app.post('/api/user/create_project', validator.body(uservalidater.project), authorization, projectRouteController.createProject)

  app.post('/api/user/update_project', validator.body(uservalidater.updateProject), authorization, projectRouteController.updateProject)

  app.get('/api/user/get_project', validator.query(uservalidater.getProject), authorization, projectRouteController.getProject)
  
  app.post('/api/user/delete_project', validator.body(uservalidater.deleteProject), authorization, projectRouteController.deleteProject)

  app.post('/api/user/create_task', validator.body(uservalidater.task), authorization, projectRouteController.createTask)

  app.post('/api/user/update_task', validator.body(uservalidater.updateTask), authorization, projectRouteController.updateTask)

  app.get('/api/user/get_task', validator.query(uservalidater.getTask), authorization, projectRouteController.getTask)

  app.post('/api/user/delete_task', validator.body(uservalidater.deleteTask), authorization, projectRouteController.deleteTask)
  
  app.get('/api/user/get-allprojects-with-tasks', authorization, projectRouteController.getAllProjectsWithTask)

  app.get('/api/user/get-all-my_projects', authorization, projectRouteController.getAllProjects)

  app.get('/api/user/get-alltask', validator.query(uservalidater.getAllTask), authorization, projectRouteController.getallTasks)

  

}