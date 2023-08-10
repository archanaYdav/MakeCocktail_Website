import express from "express";
import axios from "axios";
import bodyParser from "body-parser";

const app = express();
const port = 3000;

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));

app.get("/", (req, res) => {
    res.render("index.ejs");
});

app.get("/random", async (req, res) => {
    try {
        const result = await axios.get("https://www.thecocktaildb.com/api/json/v1/1/random.php");
        res.render("recipie.ejs", { drink: result.data.drinks[0] });
        // console.log(result.data.drinks[0]);
    } catch (error) {
        console.error("Failed to make request:", error.message);
        res.render("recipie.ejs", {
            error: error.message,
        });
    }
});


app.post("/search", async (req, res) => {
    console.log(req.body["search"]);
    try {
        const result = await axios.get(`https://www.thecocktaildb.com/api/json/v1/1/search.php?s=${req.body["search"]}`);
        res.render("recipie.ejs", { drink: result.data.drinks[0] });
        // console.log(result.data.drinks[0]);
    } catch (error) {
        console.error("Failed to make request:", error.message);
        res.render("recipie.ejs", {
            error: error.message,
        });
    }
})

app.listen(port, (req, res) => {
    console.log("Server is running on port: " + port);
});