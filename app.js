/* Chalk é um pacote de estilos para o terminal */
const chalk = require('chalk')
/* Yargs é um pacote do npm feito para gerenciar comandos passados pelo terminal
O Yargs consegue separar, automaticamente, comandos de valores, como o comando add do valor de um atributo como name*/
const yargs = require('yargs')
const task = require('./task')

//Alterando versão da aplicação
yargs.version ('1.0.1')

/* TODO:
- Remove
- List
- Read */


yargs.command ({
    command: 'add',
    describe: 'Add a new task into the ToDo list',
    builder: {
        name:{
            describe: 'Task name',
            demandOption: true,
            type: 'string'
        },
        description: {
            describe: "Task description",
            demandOption: true,
            type: 'string'
        }
    },
    handler: (argv) => {
        const info = chalk.green.bold.inverse('Creating a new task: ')
        console.log(info)
        task.addTask(argv.name, argv.description)
    }
})

yargs.command ({
    command: 'remove',
    describe: 'Remove a task from the ToDo list',
    builder: {
        name: {
            describe: 'Task name to be deleted',
            demandOption: true,
            type: 'string'
        }
    },
    handler: (argv) => {
        console.log(chalk.red.bold.inverse('Removing an existing task'))
        task.removeTask(argv.name)
    }
})

yargs.command ({
    command: 'list',
    describe: 'List all tasks in the ToDo list',
    builder: {
        name: {
            describe: "Task to find",
            demandOption: false,
            type: 'string'
        }
    },
    handler: () => {
        console.log(chalk.blue.bold.inverse('Listing all tasks'))
        const allTasks = task.listTasks()
        console.log(allTasks)
    }
})

yargs.command ({
    command: 'read',
    describe: 'Read a task from the ToDo list',
    builder: {
        name: {
            describe: "Task to find",
            demandOption: true,
            type: 'string'
        }
    },
    handler: (argv) => {
        console.log(chalk.yellow.bold.inverse('Reading a task'))
        const taskFound = task.readTask(argv.name)
        console.log(JSON.stringify(taskFound, null, 2))
    }
})

yargs.command({
    command: 'update',
    describe: 'update a task',
    builder: {
        name: {
            describe: "Task to find",
            demandOption: true,
            type: 'string'
        },
        status: {
            describe: 'status to update the task',
            demandOption: true,
            type: 'string'
        }
    },
    handler: (argv) => {
        console.log(chalk.white.bold.inverse('Updating a task'))
        task.updateTask(argv.name, argv.status)
    }
})

yargs.parse()
