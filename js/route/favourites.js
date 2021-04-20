const chalk = require("chalk")

const express = require("express");
const wAPI = require("../thirdPartyAPI/weatherApiRequester");
const router = express.Router();
const DAO = require("../DAO");
const dao = new DAO();
const api = new wAPI()

router.get("/", async (req, res) => {
    await dao.connect();
    const promises = [];
    const mes = [];
    let status = 200;
    (await dao.getAll()).map(city => {
        promises.push(api.requestCity(city.name));
    })
    let result = (await Promise.all(promises));
    result.forEach(weather => {
        mes.push(weather.message);
        if (status !== weather.status)
            status = weather.status
    })
    res.status(status)
    res.send(mes);
});

router.post("/", async (req, res) => {
    await dao.connect();
    let weatherInfo = await api.requestCity(req.body.name)
    let resp;
    try {
        let daoInfo = weatherInfo.message.toMongooseDaoModel();
        resp = await dao.add(daoInfo);
    } catch (er) {
        resp = weatherInfo;
    }
    res.status(resp.status);
    res.send(resp);
});

router.delete("/", async (req, res) => {
    await dao.connect();
    let weatherInfo = await api.requestCity(req.body.name)
    let resp;
    try {
        let daoInfo = weatherInfo.message.toMongooseDaoModel();
        resp = await dao.deleteByName(daoInfo.name);
    } catch (er) {
        resp = weatherInfo;
        console.log(er)
    }
    res.status(resp.status);
    res.send(resp);
});

module.exports = router