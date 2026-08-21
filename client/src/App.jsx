import { useState, useEffect } from 'react'
import './App.css'
import TaskItem from './TaskItem'
import Taskform from './Taskform'
import axios from 'axios'
import Login from './Login'

function App() {
  const [tasks, setTasks] = useState([]);
  const [title, setTitle] = useState('');

  useEffect(function () { loadTasks() }, []);

  function loadTasks(){
    axios.get('http://localhost:5000/tasks').then(function(res){
      setTasks(res.data);
    })
  }

  function addTask(){
    if (!title.trim()) return;
    axios.post('http://localhost:5000/tasks', { title: title }).then(function(){
      setTitle('');
      loadTasks();
    })
  }

  function toggleTask(id){
    axios.put('http://localhost:5000/tasks/' + id).then(function(){
      loadTasks();
    })
  }

  function deleteTask(id){
    axios.delete('http://localhost:5000/tasks/' + id).then(function(){
      loadTasks();
    })
  }
  <Login/>

  return (
    <div>
      <h1>Task Manager</h1>

      <Taskform
        title={title}
        onTitleChange={setTitle}
        onAdd={addTask}
      />

      <ul>
        {tasks.map(function (t) {
          return (
            <TaskItem
              key={t._id}
              task={t}
              onToggle={toggleTask}
              onDelete={deleteTask}
            />
          );
        })}
      </ul>
    </div>
  )
}

export default App