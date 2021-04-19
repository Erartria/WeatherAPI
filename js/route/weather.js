const express = require("express");
const wAPI = require("../thirdPartyAPI/weatherApiRequester");

const router = express.Router();
const api = new wAPI()


router.get("/city", async (req, res) => {
    let {q} = req.query
    let resp = await api.requestCity(q);
    res.status(resp.status);
    res.send(resp.message);
})

router.get("/coordinates", async (req, res) => {
    let {lat, lon} = req.query
    let resp = await api.requestLocation({lat: lat, lon: lon})
    res.status(resp.status);
    res.send(resp.message);
})

module.exports = router