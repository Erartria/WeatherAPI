const fetch = require('node-fetch')
const cityModel = require('./thirdPartyModel')

function statusAndMessage(status, message) {
    return {
        status: status,
        message: message
    }
}



class WeatherApiRequester {
    constructor() {
        this.badRequestStatuses = new Map([
                [400, 'Request field can\'t be empty!'],
                [401, 'Problems with API key'],
                [404, 'Wrong API request. Make your sure that you specified existent location!'],
                [429, 'Service is using free OpenWeatherMap API. Retry to request your data on a few minutes']
            ]
        );
        this.APIurl = "https://api.openweathermap.org/data/2.5/weather";
        this.APIkey = process.env.KEY
        this.APIlang = process.env.LANG
        this.APIunits = process.env.UNITS
    }

    async problemHandler(response) {
        if (response.status === 200) {
            return statusAndMessage(200, new cityModel(await response.json()));
        }
        if (this.badRequestStatuses.has(response.status)) {
            return statusAndMessage(response.status, this.badRequestStatuses.get(response.status));
        }
        return statusAndMessage(response.status, response.message)
    }

    async requestLocation(location) {
        let response = await fetch(
            `${this.APIurl}?appid=${this.APIkey}&lang=${this.APIlang}&lat=${location.lat}&lon=${location.lon}&units=${this.APIunits}`
        )
        return this.problemHandler(response)
    }

    async requestCity(city) {
        let response = await fetch(
            `${this.APIurl}?appid=${this.APIkey}&lang=${this.APIlang}&q=${encodeURIComponent(city)}&units=${this.APIunits}`
        )

        return this.problemHandler(response)
    }
}

module.exports = WeatherApiRequester