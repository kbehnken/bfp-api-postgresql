module.exports = {
    getAddresses: async (req, res, next) => {
        const db = req.app.get('db');
        await db.get_service_addresses()
        .then((addresses) => {
            res.status(200).send(addresses)
        })
        .catch(err => {
            res.status(500).send({errorMessage: "Something went wrong."});
        });
    },
    getAddressesByCustomerId: async (req, res, next) => {
        const db = req.app.get('db');
        await db.get_addresses_by_user_id([req.session.user.id])
        .then((customerAddresses) => {
            res.status(200).send(customerAddresses)
        })
        .catch(err => {
            res.status(500).send({errorMessage: "Something went wrong."});
        });
    },
    getAddressesById: async (req, res, next) => {
        const { id } = req.params;
        const db = req.app.get('db');
        await db.get_user_service_addresses([id])
        .then((userAddresses) => {
            res.status(200).send(userAddresses)
        })
        .catch(err => {
            res.status(500).send({errorMessage: "Something went wrong."});
        });
    },
    addAddress: async (req, res, next) => {
        const { streetAddress, city, state, postalCode, userId, mapUrl, photoUrl, latitude, longitude } = req.body;
        const { id } = req.params;
        const db = req.app.get('db');
        await db.add_address([streetAddress, city, state, postalCode, userId, mapUrl, photoUrl, latitude, longitude, id])
        .then((address) => {
            res.status(200).send(address)
        })
        .catch(err => {
            res.status(500).send({errorMessage: "Something went wrong."}); 
        });
    },
    updateAddress: async (req, res, next) => {
        const { streetAddress, city, state, postalCode, userId, mapUrl, photoUrl, latitude, longitude } = req.body;
        const { id } = req.params;
        const db = req.app.get("db");
        const address = await db.update_address([streetAddress, city, state, postalCode, userId, mapUrl, photoUrl, latitude, longitude]);
        return res.status(200).send(address);
    },
    deleteAddress: (req, res, next) => {
        const { id } = req.params;
        const db = req.app.get("db");
        db.delete_address(id)
        .then((address) => {
            res.status(200).send(address)
        })
        .catch(err => {
            res.status(500).send({errorMessage: "Something went wrong."}); 
        });
    }
};