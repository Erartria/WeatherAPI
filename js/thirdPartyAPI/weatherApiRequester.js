const fetch = require('node-fetch')
const cityModel = require('./thirdPartyModel')
const chalk = require('chalk')

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
        let r = await response.json();

        if (response.status === 200) {
            console.log(chalk.green(response.status, ' OK'))
            return statusAndMessage(200, new cityModel(r));
        }
        if (this.badRequestStatuses.has(response.status)) {
            console.log(chalk.red(response.status, ' MY EXCEPTION ', this.badRequestStatuses.get(response.status)))
            return statusAndMessage(response.status, this.badRequestStatuses.get(response.status));
        }
        console.log(chalk.redBright(response.status, ' API ERROR'))
        return statusAndMessage(response.status, response.message)
    }

    async requestLocation(location) {
        let response = await fetch(
            `${this.APIurl}?appid=${this.APIkey}&lang=${this.APIlang}&lat=${location.lat}&lon=${location.lon}&units=${this.APIunits}`
        )
        console.log(chalk.bgGray('API_REQUEST_LOCATION: ', JSON.stringify(location)))
        return this.problemHandler(response)
    }

    async requestCity(city) {
        let response = await fetch(
            `${this.APIurl}?appid=${this.APIkey}&lang=${this.APIlang}&q=${encodeURIComponent(city)}&units=${this.APIunits}`
        )
        console.log(chalk.bgGray('API_REQUEST_CITY: ', JSON.stringify(city)))
        return this.problemHandler(response)
    }
}

module.exports = WeatherApiRequester