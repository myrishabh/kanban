const express = require('express');
const app = express();
const database = require('./database');

const bodyParser = require("body-parser");



// set the view engine to ejs
app.set('view engine', 'ejs');
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: false }));

// use res.render to load up an ejs view file

// index page
app.get('/', async function (req, res) {
    // let data = database.getFunction();

    let data = await database.getRecords();
    if (data == 'error') {
        res.render('pages/index');
    } else {
        let headings = {
            "to_do": [],
            "in_progress": [],
            "completed": []
        }
        console.log("data ", data)
        data.map(res => {
            if (res.state == 'To Do') {
                headings.to_do.push(res);
            } else if (res.state == 'In Progress') {
                headings.in_progress.push(res);
            } else if (res.state == 'Completed') {
                headings.completed.push(res);
            }
        });
        console.log("headings ", headings)
        res.render('pages/index', { result: headings });
    }

    // await database.getFunction('', function (err, result) {
    //     if (err) {
    //         res.render('pages/index');
    //     } else {
    //         let headings = {
    //             "to_do": [],
    //             "in_progress": [],
    //             "completed": []
    //         }
    //         console.log("result ", result)
    //         result.map(res => {
    //             if (res.state == 'To Do') {
    //                 headings.to_do.push(res);
    //             } else if (res.state == 'In-progress') {
    //                 headings.in_progress.push(res);
    //             } else if (res.state == 'Completed') {
    //                 headings.completed.push(res);
    //             }
    //         });
    //         res.render('pages/index', { result: headings });
    //     }
    // });
});

// about page
app.get('/pages/addTicket', function (req, res) {
    res.render('pages/addTicket');
});

app.post('/pages/addTicket', async function (req, res) {
    let saveResult = await database.saveRecord(req.body);
    if (saveResult == 'error') {
        res.render('pages/addTicket');
    } else {
        let data = await database.getRecords();
        let headings = {
            "to_do": [],
            "in_progress": [],
            "completed": []
        }
        console.log("data ", data)
        data.map(res => {
            if (res.state == 'To Do') {
                headings.to_do.push(res);
            } else if (res.state == 'In Progress') {
                headings.in_progress.push(res);
            } else if (res.state == 'Completed') {
                headings.completed.push(res);
            }
        });
        console.log("headings ", headings)
        res.render('pages/index', { result: headings });
    }
});


// app.get('/pages/updateTicket', async function (req, res) {
//     console.log(req.query);
//     // let data = await database.getFunction();
//     res.render('pages/updateTicket');
// });

app.post('/pages/editTicket', async function (req, res) {

    let data = await database.getOneRecord(req.body.id);
    if (data == 'error') {
        res.render('pages/index');
    } else {
        console.log("data ", data)
        res.render('pages/updateTicket', { result: data });
    }
});

app.post('/pages/updateTicket', async function (req, res) {
    let updateResult = await database.updateRecord(req.body);
    if (updateResult == 'error') {
        res.render('pages/addTicket');
    } else {
        let data = await database.getRecords();
        let headings = {
            "to_do": [],
            "in_progress": [],
            "completed": []
        }
        console.log("data ", data)
        data.map(res => {
            if (res.state == 'To Do') {
                headings.to_do.push(res);
            } else if (res.state == 'In Progress') {
                headings.in_progress.push(res);
            } else if (res.state == 'Completed') {
                headings.completed.push(res);
            }
        });
        console.log("headings ", headings)
        res.render('pages/index', { result: headings });
    }
});

app.post('/pages/deleteTicket', async function (req, res) {
    let deleteResult = await database.deleteRecord(req.body.id);
    if (deleteResult == 'error') {
        res.render('pages/index');
    } else {
        let data = await database.getRecords();
        let headings = {
            "to_do": [],
            "in_progress": [],
            "completed": []
        }
        console.log("data ", data)
        data.map(res => {
            if (res.state == 'To Do') {
                headings.to_do.push(res);
            } else if (res.state == 'In Progress') {
                headings.in_progress.push(res);
            } else if (res.state == 'Completed') {
                headings.completed.push(res);
            }
        });
        console.log("headings ", headings)
        res.render('pages/index', { result: headings });
    }
});

app.listen(5000);
console.log('Server is listening on port 5000');