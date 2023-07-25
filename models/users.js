const bcrypt = require("bcryptjs");

const db = require("../data/database");

class User {
    constructor(email, password) {
        this.email = email;
        this.password = password;
    }

    async save() {
        const hashedPassword = await bcrypt.hash(this.password, 12);

        await db.getDb().collection("users").insertOne({
            email: this.email,
            password: hashedPassword,
        });
    }

    async existingUser() {
        return await db.getDb().collection("users").findOne({
            email: this.email,
        });
    }

    async comparePassword(hashedPassword) {
        return await bcrypt.compare(this.password, hashedPassword);
    }

    passwordAreEquals(password) {
        return this.password === password;
    }
}

module.exports = User;
