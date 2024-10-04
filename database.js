const mysql = require('mysql2/promise');
const cred = { host: 'localhost', user: 'root', password: '', database: 'kanban' }
let getRecords = async () => {
    try {

        const connection = await mysql.createConnection(cred);
        const [rows, fields] = await connection.execute('select * from tickets', []);
        // const [rows, fields] = await connection.execute('select * from tickets where id = ? and username = ?', [1, 'ashish335577']);
        // console.log(rows);
        await connection.close();
        return rows;
    }
    catch (err) {
        return "error";
    }
}

let getOneRecord = async (id) => {
    try {

        const connection = await mysql.createConnection(cred);
        const [rows, fields] = await connection.execute('select * from tickets where id = ?', [id]);
        // const [rows, fields] = await connection.execute('select * from tickets where id = ? and username = ?', [1, 'ashish335577']);
        // console.log(rows);
        await connection.close();
        return rows;
    }
    catch (err) {
        return "error";
    }
}

let saveRecord = async (body) => {
    try {
        console.log(body.username);
        console.log(body.heading);
        console.log(body.descriptions);
        const connection = await mysql.createConnection(cred);
        const [rows, fields] = await connection.execute('insert into tickets(username, heading, descriptions,state) values (?,?,?,?)', [body.username, body.heading, body.descriptions, 'To Do']);
        // const [rows, fields] = await connection.execute('select * from tickets where id = ? and username = ?', [1, 'ashish335577']);
        // console.log(rows);

        await connection.close();
        return "saved";
    }
    catch (err) {
        return "error";
    }
}

let updateRecord = async (body) => {
    try {
        console.log("update request", body);
        const connection = await mysql.createConnection(cred);
        const [rows, fields] = await connection.execute('update tickets set username = ?, heading = ?, descriptions = ?, state = ? where id = ?', [body.username, body.heading, body.descriptions, body.state, body.id]);
        // const [rows, fields] = await connection.execute('select * from tickets where id = ? and username = ?', [1, 'ashish335577']);
        // console.log(rows);
        await connection.close();
        return rows;
    }
    catch (err) {
        console.log("err", err)
        return "error";
    }
}

let deleteRecord = async (id) => {
    try {

        const connection = await mysql.createConnection(cred);
        const [rows, fields] = await connection.execute('delete from tickets where id = ?', [id]);
        // const [rows, fields] = await connection.execute('select * from tickets where id = ? and username = ?', [1, 'ashish335577']);
        // console.log(rows);
        await connection.close();
        return rows;
    }
    catch (err) {
        console.log("delete", err)
        return "error";
    }
}


module.exports = {
    getRecords,
    getOneRecord,
    saveRecord,
    updateRecord,
    deleteRecord
}
