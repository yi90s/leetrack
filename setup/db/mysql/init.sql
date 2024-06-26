DROP DATABASE leetrack;

CREATE DATABASE leetrack;

USE leetrack;

CREATE TABLE Difficulties(
    difficulty_id TINYINT PRIMARY KEY AUTO_INCREMENT,
    name VARCHAR(50) UNIQUE NOT NULL
);

CREATE TABLE Topics(
    topic_id TINYINT PRIMARY KEY AUTO_INCREMENT,
    name VARCHAR(50) UNIQUE NOT NULL
);

CREATE TABLE Users(
    user_id INTEGER PRIMARY KEY AUTO_INCREMENT,
    email_address VARCHAR(255) UNIQUE NOT NULL,
    username VARCHAR(50) UNIQUE NOT NULL,
    password VARCHAR(255) NOT NULL
);

CREATE TABLE Problems(
    problem_id SMALLINT PRIMARY KEY AUTO_INCREMENT,
    title VARCHAR(50) UNIQUE NOT NULL,
    title_slug VARCHAR(50) UNIQUE NOT NULL,
    difficulty_id TINYINT,
    FOREIGN KEY (difficulty_id) REFERENCES Difficulties(difficulty_id)
);

CREATE TABLE Attempts(
    attempt_id BIGINT PRIMARY KEY AUTO_INCREMENT,
    user_id INTEGER,
    problem_id SMALLINT,
    timestmp DATETIME,
    FOREIGN KEY (user_id) REFERENCES Users(user_id),
    FOREIGN KEY (problem_id) REFERENCES Problems(problem_id)
);

CREATE TABLE ProblemTopics(
    problem_id SMALLINT AUTO_INCREMENT,
    topic_id TINYINT,
    PRIMARY KEY (problem_id, topic_id),
    FOREIGN KEY (problem_id) REFERENCES Problems(problem_id),
    FOREIGN KEY (topic_id) REFERENCES Topics(topic_id)
);

CREATE TABLE Notes(
    note_id BIGINT PRIMARY KEY AUTO_INCREMENT,
    problem_id SMALLINT,
    user_id INTEGER,
    content VARCHAR(1000),
    FOREIGN KEY (problem_id) REFERENCES Problems(problem_id),
    FOREIGN KEY (user_id) REFERENCES Users(user_id)
);
