const sqlite3 = require('sqlite3').verbose();
const path = require("path");

const dbPath = path.join(__dirname, "contacts.db");
const db = new sqlite3.Database(dbPath , (err)=>{
    if(err){
        console.error("DB Conneection Error: ", err.message);
    }else{
        console.log("Connected to sqlite3 database. ")
    }
})

db.run(
    `CREATE TABLE IF NOT EXISTS contacts(
        id INTEGER PRIMARY KEY AUTOINCREMENT, 
        name TEXT NOT NULL , email TEXT , phone TEXT
    )`, (err)=>{
        if(err)console.log("Table creation error: ", err.message); 
        else console.log("Contacts table ready."); 
    }
)

module.exports = db ; 