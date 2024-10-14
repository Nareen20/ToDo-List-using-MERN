import React, { useState } from "react";
import axios from "axios";  

function Create() {
    const [task, settask] = useState(''); 
    const handleAdd = () => {
        if (task.trim()) {
            axios.post('http://localhost:3001/add', { task: task })
            .then(result =>{
                location.reload();
            })

            .catch(err => console.log(err));
        } else {
            console.log("Task cannot be empty");
        }
    }

    return (
        <div>
            <input type="text" 
                placeholder="Enter Task" 
                value={task}  
                onChange={(e) => settask(e.target.value)}
            />
            <button type="button" onClick={handleAdd}>Add</button>
        </div>
    );
}

export default Create;


