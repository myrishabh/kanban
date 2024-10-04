Step 1: Run the below query in Workbench

    create database kanban;
    use kanban;
    create table tickets (
        id int primary key auto_increment,
        username varchar (100),
        heading varchar(500),
        descriptions varchar(2000),
        state varchar(100)
    );
    show tables;
    select * from tickets;

Step 2: In VS code, open the terminal and run the command "npm i".
Step 3: In database.js file, edit the username and password.
Step 4: run the command "node server.js"
Step 5: use the url to access the application "http://localhost:5000/"