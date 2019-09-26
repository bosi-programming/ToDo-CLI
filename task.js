const fs = require('fs')
const chalk = require('chalk')

const addTask = (name, description) => {

    const tasks = loadAllTasks()
    
    // Confere se a task dada não é duplicada
    /* const duplicatedTask = tasks.find(function(task){
        return task.name === name
    }) */

    const duplicatedTask = tasks.find((task) => task.name === name)

    if(!duplicatedTask){
        const newTask = {
            name,
            description,
            status: 'Backlog'
        }
    
        tasks.push(newTask)
        saveTasks(tasks)
        const successMessage = chalk.green.bold('Task created!')
        console.log(successMessage)
    } else{
        const errorMessage = chalk.red.bold(`Task with name [${name}] already taken!`)
        console.log(errorMessage)
    }

   
}

const saveTasks = (task) => {
    const tasksJSON = JSON.stringify(task)
    fs.writeFileSync('tasks.json', tasksJSON)
}

const loadAllTasks = () => {
    //ler todas as tarefas
    try {
        const tasksBuffer = fs.readFileSync('tasks.json')
        return JSON.parse(tasksBuffer.toString())
    } catch (error) {
        return []
    }

    
    
}

const removeTask = (name) => {
    const tasks = loadAllTasks()
    /* const tasksToKeep = tasks.filter(function(tasks){
        return tasks.name !== name
    }) */

    const tasksToKeep = tasks.filter((task) => task.name !== name)

    saveTasks(tasksToKeep)

    console.log(chalk.green.bold(`Task with name [${name}] has been removed!`))
}
const listTasks = () => {
    const tasks = loadAllTasks()
    for(let i = 0; i < tasks.length; i++){
        var tasksObj = tasks[i];
        console.log(tasksObj.name);
    }
    
}
const readTask = (name) => {
    const tasks = loadAllTasks()
    const taskFound = tasks.find(function(tasks){
        return tasks.name === name
    })

    if(taskFound !== undefined){
        return taskFound
    }else{
        return {}
    }
}

const updateTask = (name, status) => {
    const tasks = loadAllTasks()
    
    /* tasks.find(function(task){
        if(task.name === name){
            task.status = status
        }
    }) */

    tasks.find((task) => {
        if(task.name === name){
            task.status = status
        }
    })

    saveTasks(tasks)

    console.log(chalk.green.bold(`Task status with name [${name}] has been updated!`))
}

module.exports = {
    addTask,
    removeTask,
    listTasks,
    readTask,
    loadAllTasks,
    updateTask
}