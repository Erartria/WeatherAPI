class thirdPartyModel {
    constructor(cityJson) {
        this.name = cityJson.name;
        this.coordinates = {
            longitude: cityJson.coord.lon,
            latitude: cityJson.coord.lat
        }
        this.temperature = cityJson.main.temp;
        this.wind = cityJson.wind.speed;
        this.cloud = cityJson.weather[0].description;
        this.icon = cityJson.weather[0].icon;
        this.pressure = cityJson.main.pressure;
        this.humidity = cityJson.main.humidity;
        return this;
    }

    toMongooseDaoModel(){
        return {
            name: this.name,
            coordinates: {
                longitude: this.coordinates.longitude,
                latitude: this.coordinates.latitude,
            }
        }
    }
    toString() {
        return `name: ${this.name}\n
        coordinates: ${this.coordinates}
        temperature: ${this.temperature}
        icon: ${this.icon}
        cloud: ${this.cloud}
        wind: ${this.wind}`
    }
}

module.exports = thirdPartyModel;