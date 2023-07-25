const mongodb = require("mongodb");

const MongoClient = mongodb.MongoClient;

let database;

async function connectToDatabse() {
    database = (await MongoClient.connect("mongodb://127.0.0.1:27017")).db(
        "celaket-store"
    );
}

function getDb() {
    if (!database) {
        throw new Error("database not found!");
    }

    return database;
}

module.exports = {
    connectToDatabse: connectToDatabse,
    getDb: getDb,
};
