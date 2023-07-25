const mongodb = require("mongodb");

const MongoClient = mongodb.MongoClient;

let database;

async function connectToDatabse() {
    let url = process.env.MONGODB_URL || "mongodb://127.0.0.1:27017";
    database = (await MongoClient.connect(url)).db(
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
