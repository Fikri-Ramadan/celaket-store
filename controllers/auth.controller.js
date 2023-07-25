const path = require("path");

const User = require("../models/users");

let errorData;

function getLoginPage(req, res) {
    console.log(errorData);

    if (!errorData) {
        errorData = {
            message: "",
        };
    }

    const message = errorData.message;

    errorData = {
        message: "",
    };

    res.render("login", { errorMessage: message, root: path.join(__dirname, "public") });
}

function getSignupPage(req, res) {
    console.log(errorData);

    if (!errorData) {
        errorData = {
            message: "",
        };
    }

    const message = errorData.message;

    errorData = {
        message: "",
    };

    res.render("signup", { errorMessage: message });
}

async function signUp(req, res) {
    const user = new User(req.body.email, req.body.password);
    const userDoc = await user.existingUser();

    const passwordAreEquals = user.passwordAreEquals(req.body.confirmPassword);

    if (!passwordAreEquals) {
        errorData = {
            hasError: true,
            message: "Password are not equals.",
            ...req.body,
        };

        return res.redirect("/signup");
    }

    if (!userDoc || passwordAreEquals) {
        await user.save();
    }

    res.redirect("/login");
}

async function login(req, res) {
    const user = new User(req.body.email, req.body.password);
    const userDoc = await user.existingUser();
    if (!userDoc) {
        errorData = {
            hasError: true,
            message: "User not found!",
            ...req.body,
        };

        return res.redirect("/login");
    }

    const passwordAreEquals = await user.comparePassword(userDoc.password);
    console.log(passwordAreEquals);

    if (!passwordAreEquals) {
        errorData = {
            hasError: true,
            message: "Invalid input!",
            ...req.body,
        };

        return res.redirect("/login");
    }
    res.redirect("/home");
}

module.exports = {
    getLoginPage: getLoginPage,
    getSignupPage: getSignupPage,
    signUp: signUp,
    login: login,
};
