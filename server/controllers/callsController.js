module.exports = {
    getCalls: async (req, res, next) => {
        const db = req.app.get("db");
        const calls = await db.get_calls([req.session.user.id]);
        return res.status(200).send(calls);
    },
    addCall: async (req, res, next) => {
        const { serviceDate, salt, phosphates, tds, filterPsi, chlorine, ph, alkalinity, cya, trichlorShock, sodaAsh, sodiumBicarbonate, tabs, granularTrichlor, phosphateRemover, userId, serviceAddressId, technician, startTime, endTime } = req.body;
        const { id } = req.params;
        const db = req.app.get("db");
        const call = await db.add_service_call([serviceDate, salt, phosphates, tds, filterPsi, chlorine, ph, alkalinity, cya, trichlorShock, sodaAsh, sodiumBicarbonate, tabs, granularTrichlor, phosphateRemover, userId, serviceAddressId, technician, startTime, endTime, id]);
        return res.status(200).send(call);
    },
    updateCall: async (req, res, next) => {
        const { serviceDate, salt, phosphates, tds, filterPsi, chlorine, ph, alkalinity, cya, trichlorShock, sodaAsh, sodiumBicarbonate, tabs, granularTrichlor, phosphateRemover, userId, serviceAddressId, technician, startTime, endTime} = req.body;
        const db = req.app.get("db");
        const call = await db.update_service_call([serviceDate, salt, phosphates, tds, filterPsi, chlorine, ph, alkalinity, cya, trichlorShock, sodaAsh, sodiumBicarbonate, tabs, granularTrichlor, phosphateRemover, userId, serviceAddressId, technician, startTime, endTime]);
        return res.status(200).send(call);
    },
    deleteCall: (req, res, next) => {
        const { id } = req.params;
        const db = req.app.get("db");
        db.delete_call(id)
        .then((call) => {
            res.status(200).send(call)
        })
        .catch(err => {
            res.status(500).send({errorMessage: "Something went wrong."});
        });
    }
};