const bcrypt = require("bcryptjs");

module.exports = {
    
    login: async (req, res, next) => {
        const { emailAddress, password } = req.body;
        const foundUser = await req.app.get("db").get_user([emailAddress]);
        const user = foundUser[0];
        if(!user) {
            return res.status(401).send("User not found. Please contact Beach Family Pools for assistance.")
        }
        const isAuthenticated = bcrypt.compareSync(password, user.hash);
        if (!isAuthenticated) {
            return res.status(401).send("Incorrect password.");
        }
        req.session.user = {
            id: user.id,
            isAdmin: user.is_admin,
            firstName: user.first_name,
            lastName: user.last_name,
            emailAddress: user.email_address
        };
        return res.status(200).send(req.session.user);
    },
    logout: (req, res, next) => {
        req.session.destroy();
        res.status(200).send("You have been logged out.");
    }
};