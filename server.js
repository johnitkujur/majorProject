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

var connection = mysql.createConnection({
    host: "localhost",
    port: 3306,
    database:'gatishakti',
    user: "root",
    password: "",
  })

connection.connect(function(err) {
    console.log("connected");
    if (err) throw err
  
});

app.get('/', (req, res)=>{
    res.sendFile(__dirname+"/index.html");
})

function insertData(data){
    var sql = "INSERT INTO orders(Ship_From, Ship_To, Commodity, Order_Value, Weight_KG, Volume, Order_Date, Required_Delivery_Date) VALUES ?";
    var values = [data];
    connection.query(sql, [values], (err, res)=>{
        if(err)throw err;
        console.log("records inserted");
    })
}

app.post('/', (req, res)=>{
    //console.log(req.body);
    req.body.orderValue = Number(req.body.orderValue);
    req.body.weight = Number(req.body.weight);
    req.body.volume = Number(req.body.volume);
    var data = Object.values(req.body);
    data.pop();
    insertData(data);
    res.redirect('back');
})