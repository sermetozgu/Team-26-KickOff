const express = require('express');
const app = express();
const mysql = require('mysql');
const cors = require('cors');
const bodyParser = require("body-parser");

app.use(cors());
app.use(bodyParser.urlencoded({ extended: true}));
app.use(express.json()); /*important for geting data in a parsed format!*/

const db = mysql.createPool({
    user: "root",
    host: "localhost",
    password: "",
    database: "usersystem",
});

/* req stands for request, res stands for response */
app.post("/create", (req, res) => {
    const username = req.body.username;
    const password = req.body.password;

    db.query(
        "INSERT INTO users (username, password) VALUES (?,?)",
        [username, password],
        (err, result) => {
            if (err) {
                console.log(err)
            } 
            else {
                res.send("Values Inserted")
            }
        }
    );
});


app.get("/users", (req, res) => {
    db.query("SELECT * FROM users", (err, result) => {
        if(err) {
            console.log(err)
        }
        else {
            res.send(result)
        }
    });
});


app.delete("/delete/:username", (req, res) => {
    const username = req.params.username
    const sqlDelete = "DELETE FROM users WHERE username = ?";

    db.query(sqlDelete, username, (err, result) => {
        if (err)console.log(err);
    })

});

app.put("/update", (req, res) => {
    const username = req.body.username
    const sqlUpdate = "UPDATE users SET username = ? WHERE username = ?";

    db.query(sqlUpdate, username, (err, result) => {
        if (err)console.log(err);
    })

});

app.listen(3001, () => {
    console.log("Yey, your surver is running on port 3001");
});

