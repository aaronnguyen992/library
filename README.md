# Library-CLI
A CLI application that maintains a database of books. Users will be able to view, add, edit, and search for books. 

## Getting Started
After cloning the repository, enter the source folder. Run npm install to download all dependencies. 

```
cd library/
npm install
```

While in the folder, use the commands npm start or node library.js to initiate the CLI.
```
npm start

OR

node library.js
```

## Interface 
You'll see a menu with the following choices. Use the arrow keys to navigate and select choices. All selections except for save and exit will eventually return to this menu. 

### View All Books
Selecting "View All Books" will produce a numbered list (by ID) of all the books in the database. Enter a valid ID number to view book details, or press enter to leave.

### Add a Book
Selecting "Add a Book" will prompt the user to enter a book title, author, and description. Blank answers will not be accepted. After the book has been added, users will have immediate access to it. 

### Edit a Book
Selecting "Edit a Book" will show the user all books in database with their associated data. Enter a valid ID number to begin editting a book! Blank answers will default to the previous values.

### Search for a book
Selecting "Search for a book" will prompt the user for a search term. This term will be compared to title, author, and description entries and return all books with like values! 

### Save and Exit
Exit the interface

## Built With
- JavaScript + Node.js - Programming language used to write scripts and handle package management.
- Inquirer - NPM package used to create prompts in Node.js.
- console.table - Added method to easily pass database data in readable table format.
- MySQL - Relational database used to maintain book data.
- Amazon RDS in AWS - Cloud based relational database service that stores MySQL data.

## Authors
Aaron Nguyen
