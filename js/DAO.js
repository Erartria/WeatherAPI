const mongo = require('mongodb');
const chalk = require('chalk');

class DAO {
    async connect() {
        let url =
            `mongodb+srv://${process.env.DB_USER}:` +
            `${process.env.DB_PSWD}@${process.env.DB_CLUSTER}/` +
            `${process.env.DB_NAME}?retryWrites=true&w=majority`;
        try {
            this.client = await mongo.connect(url,
                {useNewUrlParser: true, useUnifiedTopology: true}
            );
            this.collection = await this.client.db(process.env.DB_NAME).collection(process.env.DB_COLLECTION);
        } catch (er) {
            console.log(chalk.red(`Connection error.\n${er.stack}`));
        }
    }

    async getAll() {
        const output = [];

        await this.collection.find().forEach(elem => {
            output.push(elem);
        });

        return output;
    }

    async notAtDB(coords) {
        let res = await this.findByCoords(coords);
        return res == null;
    }

    async add(cityAndCoords) {
        if (await this.notAtDB(cityAndCoords.coordinates)) {
            await this.collection.insertOne(cityAndCoords);
            return responseF(200, `${JSON.stringify(cityAndCoords)}\nhas been added`)
        } else
            return responseF(208, 'Already exists')
    }

    async findByName(cityName) {
        let res = await this.collection.findOne({name: cityName});
        return res;
    }

    async findByCoords(coords) {
        let res = await this.collection.findOne({coordinates: coords});
        return res;
    }

    async deleteByCoords(coords) {
        let del = await this.findByCoords(coords);
        if (del === null) {
            return responseF(404, 'City with this coords didn\'t exist at DB')
        }
        await this.collection.deleteOne(del)
        return responseF(200, 'Deleted')
    }
}

function responseF(status, message) {
    return {
        status: status,
        message: message
    }
}

module.exports = DAO;