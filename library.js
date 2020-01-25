const mysql = require('mysql');
const { prompt } = require('inquirer');
require('console.table');
require('dotenv').config()

//Connects to MySQL AWS server
const connection = mysql.createConnection({
    host: process.env.host,
    port: process.env.port,
    user: process.env.user,
    password: process.env.password,
    database: process.env.database
});

//Helper function
//Detects empty entry for validation
const isEmpty = val => {
    return (val !== '')
};

// Connects to database and runs library function to initiate menu
connection.connect(err => {    
    if (err) throw err;
    loadLibrary();
});

// Verifies that books table has been selected and handles updates for when menu is reloaded, pushes query data to other functions for access in some functions
const loadLibrary = () => {
    connection.query('SELECT * FROM books', (err, res) => {
        if (err) throw err;
        startLibrary(res);
    });
};

// Start menu - accepts choices to view and manipulate library
const startLibrary = res => {
    prompt([
        {
            type: 'list',
            name: 'choice',
            choices: ['View all books', 'Add a book', 'Edit a book', 'Search for a book', 'Save and exit'],
            message: `Welcome to the book manager! We have ${res.length} books!`
        }
    ]).then(answers => {
        switch(answers.choice){
            case 'View all books':
                viewBooks(res);
                break;
            case 'Add a book':
                addBook();
                break;
            case 'Edit a book':
                editBook(res);
                break;
            case 'Search for a book':
                searchBook();
                break;
            case 'Save and exit':
                console.info('Goodbye');
                process.exit(0);
        };
    });
};

// View all books in library table of data with author and descriptions available, returns to start menu
const viewBooks = res => {
    for(var i = 0; i < res.length; i++){
        console.info(`[${res[i].id}] ${res[i].title}`)
    };
    prompt([
        {
            type: 'input',
            name: 'id',
            message: 'Type in the ID of the book you\'d like to view, or press <Enter> to leave.'
        }
    ]).then(answer => {
        // stops user from entering invalid IDs
        if (isNaN(answer.id) || !res[answer.id - 1]){
            console.log('Not a valid ID');
            loadLibrary();
        }
        // enter command to return
        if (answer.id == ''){
            loadLibrary()
        }
        console.info(`ID: ${res[answer.id - 1].id}`);
        console.info(`Title: ${res[answer.id - 1].title}`);
        console.info(`Author: ${res[answer.id - 1].author}`);
        console.info(`Description: ${res[answer.id - 1].description}`);
        loadLibrary();
    });
};

// Adds book into collection after prompts by user, returns to start menu
const addBook = () => {
    prompt([
        {
            type: 'input',
            name: 'title',
            message: 'Book Title:',
            validate: isEmpty
        },
        {
            type: 'input',
            name: 'author',
            message: 'Author:',
            validate: isEmpty
        },
        {
            type: 'input',
            name: 'description',
            message: 'Description:',
            validate: isEmpty
        }
    ]).then(answer => {
        connection.query(
            'INSERT INTO books (title, author, description) VALUES (?, ?, ?)',
            [answer.title, answer.author, answer.description], 
            err => {
                if (err) throw err;
                console.log(`Added ${answer.title}!`);
                loadLibrary();
            }
        );
    });
};

// Initiates editting a book and gives list of books, returns to start menu if a valid ID is not selected
const editBook = res => {
    console.table(res);
    prompt([
        {
            type: 'input',
            name: 'id',
            message: 'Type in the ID of the book you\'d like to edit'
        }
    ]).then(answer => {
        //stops user from entering an invalid ID
        if (isNaN(answer.id) || !res[answer.id - 1]){
            console.log('Not a valid ID');
            loadLibrary();
        };
        updateBook(answer.id, res[answer.id - 1]);
    });
};

// Prompts user for updates, keeps original values if nothing is entered, and returns to start
const updateBook = (id, originalValues) => {
    prompt([
        {
            type: 'input',
            name: 'title',
            message: 'Book Title:',
            default: originalValues.title
        },
        {
            type: 'input',
            name: 'author',
            message: 'Author:',
            default: originalValues.author
        },
        {
            type: 'input',
            name: 'description',
            message: 'Description:',
            default: originalValues.description
        }
    ]).then(answer => {
        connection.query('UPDATE books SET title = ?, author = ?, description = ? WHERE id = ?',
            [answer.title, answer.author, answer.description, id],
            err => {
                if (err) throw err;
                console.log(`Updated ${answer.title}`);
                loadLibrary();
            }
        );
    });
};

// Search function
const searchBook = () => {
    prompt([
        {
            type: 'input',
            name: 'keyword',
            message: 'Search term: '
        }
    ]).then(answer => {
        connection.query(`SELECT * FROM books WHERE title LIKE '%${answer.keyword}%' OR author LIKE '%${answer.keyword}%' OR description LIKE '%${answer.keyword}%'`,
            (err, res) => {
                if (err) throw err;
                // Changes response based on results (if there are any)
                if(res.length == 0){
                    console.info('There are no books with your search term in it.');
                } else {
                    console.info(`Your search has ${res.length} result(s)! Here they are:`);
                    console.table(res);
                }
                loadLibrary();
            }
        );
    });
};