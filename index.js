const path = require("path");

const express = require("express");
const session = require("express-session");
const MongoDBStore = require("connect-mongodb-session")(session);

const db = require("./data/database");
const sessionMiddleware = require("./middlewares/session-middleware");
const authRoutes = require("./routes/auth.routes");

const app = express();

let url = "mongodb://127.0.0.1:27017/celaket-store";

const store = new MongoDBStore({
    uri: "mongodb://127.0.0.1:27017",
    databaseName: "celaket-store",
    collection: "sessions",
});

// Catch errors
store.on("error", function (error) {
    console.log(error);
});

app.use(
    require("express-session")({
        secret: "SUPER_SECRET",
        cookie: {
            maxAge: 1000 * 60 * 60 * 24 * 7, // 1 week
        },
        store: store,
        // Boilerplate options, see:
        // * https://www.npmjs.com/package/express-session#resave
        // * https://www.npmjs.com/package/express-session#saveuninitialized
        resave: false,
        saveUninitialized: false,
    })
);

app.get("/test", (req, res) => {
    console.log(req.session);
    res.send("asd");
});

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

app.use(express.static(__dirname + "/public"));
app.use(express.urlencoded({ extended: false }));

app.use(sessionMiddleware);

app.use(authRoutes);

db.connectToDatabse().then(() => {
    app.listen(process.env.PORT || 3001);
});
