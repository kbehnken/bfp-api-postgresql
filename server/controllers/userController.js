const bcrypt = require("bcryptjs");

module.exports = {
    getUsers: async (req, res, next) => {
        const db = req.app.get("db");
        const allUsers = await db.get_users();
        return res.status(200).send(allUsers);
    },
    addUser: async (req, res, next) => {
        const { userRole, firstName, lastName, phoneNumber, emailAddress, password } = req.body;
        const isAdmin = (req.body.isAdmin || false);
        const db = req.app.get("db");
        const result = await db.get_user(emailAddress);
        const existingUser = result[0];
        if(existingUser) {
            return res.status(409).send("Email is already in use.")
        }
        const salt = bcrypt.genSaltSync(10);
        const hash = bcrypt.hashSync(password, salt);
        const addedUser = await db.add_user(isAdmin, userRole, firstName, lastName, phoneNumber, emailAddress, hash);
        const user = addedUser[0];
        req.session.user = {
            id: user.id
        };
        return res.status(200).send(req.session.user)
    },
    updateUser: async (req, res, next) => {
        const { isAdmin, userRole, firstName, lastName, phoneNumber, emailAddress, password } = req.body;
        const { id } = req.params;
        const db = req.app.get("db");
        const salt = bcrypt.genSaltSync(10);
        const hash = bcrypt.hashSync(password, salt);
        const user = await db.update_user([isAdmin, userRole, firstName, lastName, phoneNumber, emailAddress, hash, id]);
        return res.status(200).send(user);
    },
};