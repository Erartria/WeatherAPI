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
            console.log(chalk.green('DAO ADD: ', JSON.stringify(cityAndCoords)))
            return responseF(200, cityAndCoords, `has been added`);
        } else {
            console.log(chalk.red('DAO ALREADY_EXIST ', JSON.stringify(cityAndCoords)))
            return responseF(208, cityAndCoords, 'Already exists')
        }
    }

    async findByName(cityName) {
        let res = await this.collection.findOne({name: cityName});
        return res;
    }

    async findByCoords(coords) {
        let res = await this.collection.findOne({coordinates: coords});
        console.log(chalk.bgGray('DAO FIND_BY_COORDS: ', JSON.stringify(coords)))
        return res;
    }

    async deleteByCoords(coords) {
        let del = await this.findByCoords(coords);
        if (del === null) {
            console.log(chalk.red('DAO DIDN\'T_IN_DB', JSON.stringify(coords)))
            return responseF(404, del, 'Didn\'t exist at DB')
        }
        await this.collection.deleteOne(del)
        console.log(chalk.green('DAO DELETED', JSON.stringify(coords)))
        return responseF(200, del, 'Deleted')
    }
}

function responseF(status, model, description) {
    return {
        status: status,
        model: model,
        message: description
    }
}

module.exports = DAO;