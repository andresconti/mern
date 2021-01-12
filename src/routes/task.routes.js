const express = require('express');
const router = express.Router();

const Task = require('../models/task')

router.get('/', async (req, res) => {
    /*
    Formas clasicas de llamado asincrono en JS

    Task.find(function(err, tasks) {
        console.log(tasks);
        res.json({
            status: 'API Works'
        });
    });

    Task.find()
        .then(data => console.log(data))
        .catch     */

    //Mejor manera:
    const tasks = await Task.find();
    res.json(tasks);   
});

router.get('/:id', async (req, res) => {
    const task = await Task.findById(req.params.id);
    res.json(task);   
});

router.post('/', async (req, res) => {
    const { title, description} = req.body;
    const task = new Task({title, description}); // esto es igual a title: title, description: description
    //console.log(task);
    await task.save();
    res.json({status: 'Task Saved'});
});

router.put('/:id', async  (req, res) => {
    const { title, description} = req.body;
    const newTask = {title, description};
    await Task.findByIdAndUpdate(req.params.id, newTask);
    res.json({status: 'Task Updated'});
});

router.delete('/:id', async  (req, res) => {
    await Task.findByIdAndRemove(req.params.id);
    res.json({status: 'Task Removed'});
});

module.exports = router;