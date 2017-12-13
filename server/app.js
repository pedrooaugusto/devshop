const express = require("express");
const app = express();
const bodyparser = require("body-parser");
const {Sale} = require("./SalesModel"); 

app.set("port", (process.env.PORT || 3002));

app.use(bodyparser.urlencoded({extended: true}));
app.use(bodyparser.json());

app.use(function (req, res, next) {
    res.header('Access-Control-Allow-Origin', "*");
    res.header('Access-Control-Allow-Methods','GET,PUT,POST,DELETE');
    res.header('Access-Control-Allow-Headers', 'Content-Type');
    next();
});


app.use(express.static(__dirname + "/public"));


/* Verifica se todos parametros foram passados */
const checkBody = (req, res, next) => {
    const fields = ['projectName', 'buyer', 
        'discount', 'company', 'developers', 'date'];
    const ok = fields.every(a => req.body[a] !== undefined);
    if(ok)
        return next();
    return res.status(500).json({message: 'Faltando parametros ...'});
}

/* Insere uma nova venda na base */
app.post("/api/insert", checkBody, async function(req, res, next){
    try
    {
        const sale = new Sale(req.body);
        await sale.save();
        res.status(200).json({message: 'Inserido com sucesso'});
    }catch(err){
        res.status(500).json({message: 'everything is terrible'});
    }
});

/* Lista todas as vendas realizadas */
app.get("/api/sales/list", async function (req, res) {
    try
    {
        const sales = await Sale.find({});
        res.status(200).send(sales);
    }catch(err){
        res.status(500).json({message: 'everything is terrible'});   
    }
});


app.listen(app.get("port"), function () {
    console.log("Rodando na porta "+ app.get("port"));
});

/*
    param = google.com/var
    query = google.com&var=value
    body = (post) -> google.com
*/