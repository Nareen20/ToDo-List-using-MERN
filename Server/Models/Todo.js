const mongoose = require("mongoose");

const TodoSchema = new mongoose.Schema({
    task:String,
        done :{
            type:Boolean,
            default :false

        }
});

const Todo = mongoose.model("Todo", TodoSchema);
module.exports = Todo;
