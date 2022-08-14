const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const ObjectId = Schema.ObjectId

const projectSchema = new Schema({
 
    userId:{ type: ObjectId, ref: 'users' },
    project_name: { type: String,default:null},
    created_on: { type: Date, default: Date.now }
});

module.exports = mongoose.model('projects', projectSchema)