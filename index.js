const chalk = require("chalk")

require('dotenv').config()
const express = require("express");
const weatherRouter = require("./js/route/weather")
const favouritesRouter = require("./js/route/favourites")
const bodyParser = require('body-parser')
const cors = require("cors");
const DAO = require("./js/DAO");
const dao = new DAO();
const app = express();

app.use([bodyParser.json(), cors()])

async function start() {
    try{
        let port = process.env.PORT || 3000;
        await dao.connect();

        app.listen(port, () => {
            console.log(chalk.green(`Server has been started on ${port} port`));
            app.use("/weather", weatherRouter);
            app.use("/favourites", favouritesRouter);
        })
    } catch (er) {
        console.log(chalk.red(er));
    }
}

start();

