const express = require('express')
const cors = require('cors')
const mongoose = require('mongoose')
const bcrypt = require('bcryptjs');

const app = express()
app.use(cors())
app.use(express.json())

const userSchema = new mongoose.Schema({
  username: String,
  password: String
});
const User = mongoose.model('User', userSchema);

app.post('/signup', async function (req, res) {
  let hashedPassword = await bcrypt.hash(req.body.password, 10);
  let newUser = new User({ username: req.body.username, password: hashedPassword });
  await newUser.save();
  res.json({ success: true });
});

app.post('/login', async function (req, res) {
  let user = await User.findOne({ username: req.body.username });
  if (!user) return res.json({ success: false });

  let isMatch = await bcrypt.compare(req.body.password, user.password);
  if (!isMatch) return res.json({ success: false });

  res.json({ success: true });
});

mongoose.connect('mongodb://localhost:27017/Pract').then(function(){
    console.log("Success")
})



const taskSchema = new mongoose.Schema({
    title:String,
    done: Boolean
});

const Task = mongoose.model('Task',taskSchema);

app.post('/tasks',async function(req,res){

    let newTask = new Task({ title : req.body.title, done:false})
    await newTask.save();
    res.json(newTask);

});

app.get('/tasks', async function(req,res){
    let allTask = await Task.find();
    res.json(allTask);
})

app.put('/tasks/:id',async function(req,res){

    let task = await Task.findById(req.params.id);
    task.done = !task.done;

    await task.save();

    res.json(task);

})

app.delete('/tasks/:id', async function(req,res) {

    await Task.findByIdAndDelete(req.params.id);
    res.json({Success:true});
    
})




app.listen(5000, function(){
    console.log("Server is listening!!!!")
});

