const mysql = require("mysql")
const express = require("express")
const path = require("path");

const app = express();

app.listen("3000", ()=>{
    console.log("Server created")
})


const staticPath = path.join(__dirname, "/public");

app.use(express.static(staticPath));
app.use(express.urlencoded({ extended: true }))

const connection = mysql.createConnection({
    host: "localhost",
    port: 8111,
    database: "majorproject",
    user: "root",
    password: ""
});

app.get('/', (req, res)=>{
    res.sendFile(__dirname+"/index.html");
})

app.post('/', (req, res)=>{
    //console.log(req.body);
    req.body.orderValue = Number(req.body.orderValue);
    req.body.weight = Number(req.body.weight);
    req.body.volume = Number(req.body.volume);
    var data = Object.values(req.body);
    data.pop();
    //console.log(data);
    connection.connect((err)=>{
        if(err)throw err;
        console.log("connected");
        var sql = "INSERT INTO orderdetails(shipFrom, shipTo, commodity, orderValue, weight, volume, shipperName, shipperAddress, shipperCountry, consignee, orderDate, requiredDate) VALUES ?";
        var values = [data];
        connection.query(sql, [values], (err, res)=>{
            if(err)throw err;
            console.log("records inserted");
        })
    })
    res.send(req.body);
})