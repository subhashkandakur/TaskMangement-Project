const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const ObjectId = Schema.ObjectId

const taskSchema = new Schema({
 
    project_id:{ type: ObjectId, ref: 'projects'},
    task_name: { type: String,default:null},
    created_on: { type: Date, default: Date.now }
});

module.exports = mongoose.model('tasks', taskSchema)