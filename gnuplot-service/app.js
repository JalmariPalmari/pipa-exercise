const express = require("express");
const body_parser = require("body-parser");
const gnuplot = require("gnuplot");

const {
    Base64Encode
} = require("base64-stream");

// Asenna paketit konsolista
// npm install express
// etc..

// Alusta express sovellus
const app = express();

//Lisää parserit POST kutsun json muotoiselle bodylle
//ja GET query parametreille
app.use(body_parser.json());
app.use(body_parser.urlencoded({
    extended: true
}));

//Käsittelijä POST kutsulle, jossa JSON muotoinen data
//{
//  "formula": "sin(x)+x**2"
//}

app.post("/", (req, res, next) => {
    const formula = req.body.formula;
    console.log(formula);
    //plottaa png kuva
    gnuplot()
        .set("term png")
        .unset("output")
        .plot(formula, {
            end: true
        })
        .pipe(new Base64Encode())
        .pipe(res);
});

//Kuuntele porttia 80
app.listen(80);