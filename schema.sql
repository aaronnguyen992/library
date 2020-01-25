DROP DATABASE IF EXISTS library;
CREATE DATABASE library;

USE library;

CREATE TABLE books(
    id INT AUTO_INCREMENT NOT NULL,
    title VARCHAR(45) NOT NULL,
    author VARCHAR(45) NOT NULL,
    description VARCHAR(200) NOT NULL,
    primary key(id)
)

SELECT * FROM books;

INSERT INTO books (title, author, description)
VALUES ("Harry Potter and the Chamber of Secrets", "JK Rowling", "Harry discovers an ancient, evil secret at Hogwarts"), 
    ("Twilight", "Stephanie Meyer", "Vampires are hot"),
    ("Lord of the Rings", "JRR Tolkien", "A Fellowship discovers an ancient artifact that they must destroy");