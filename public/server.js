var express = require('express')
var bodyParser = require('body-parser')
var app = express()
var mongoose = require('mongoose')
var cors = require('cors')


var dbUrl = "mongodb+srv://tanmaydeshpande:Tanmay@7293@cluster0-0ay1s.mongodb.net/test?retryWrites=true&w=majority"

app.use(cors())
app.use(express.static(__dirname))
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended:false}))

mongoose.connect(dbUrl,{ useNewUrlParser: true, useUnifiedTopology:true},(err) => {
    console.log("mongo db connection ",err)
})

var Product = mongoose.model('product',{
    "id": Number,
    "product": {
        "productid": Number,
        "category": String,
        "price": Number,
        "name": String,
        "instock": Boolean
    }
});
app.get('/product/get/',(req,res) => {
    Product.find({},(err,products) => {
        let productsToSend = {};
        products.forEach((prod) => {
            productsToSend[prod.id] = prod;
        })
        res.send(productsToSend)
    })
})
app.post('/product/create/',(req,res) => {    
    var product = new Product(req.body)    
    product.save((err) => {
        if(err){
            sendStatus(500)
        }else{            
            res.sendStatus(200);
            // res.redirect('/product/get');
        }
    })    
})

app.get('/product/delete/:id',(req,res) => {       
    Product.deleteOne(req.params,(err,delData) => {
        res.redirect('/product/get');        
    })    
})

app.post('/product/update/:id',(req,res) => {        
    Product.updateOne(req.params,req.body,(err,delData) => {
        res.redirect('/product/get');        
    })
})
var server = app.listen(3001,() => {
    console.log("server is listening on port ",server.address().port);
})