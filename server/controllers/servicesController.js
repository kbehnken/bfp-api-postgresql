module.exports = {
    getServices: async (req, res, next) => {
        const db = req.app.get("db");
        const services = await db.get_services([req.session.user.id]);
        return res.status(200).send(services);
    },
    addService: async (req, res, next) => {
        const { name, description } = req.body;
        const { id } = req.session.user;
        const db = req.app.get("db");
        const service = await db.add_service([name, description, id]);
        return res.status(200).send(service);
    },
    updateService: async (req, res, next) => {
        const { name, description } = req.body;
        const { id } = req.query;
        const db = req.app.get("db");
        const services = await db.update_service([name, description, id]);
        return res.status(200).send(services);
    },
    deleteService: (req, res, next) => {
        const { id } = req.params;
        const db = req.app.get("db");
        db.delete_service(id)
        .then((services) => {
            res.status(200).send(services)
        })
        .catch(err => {
            res.status(500).send({errorMessage: "Something went wrong."});
        });
    }
};