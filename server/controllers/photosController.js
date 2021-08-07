module.exports = {
    getPhotos: async (req, res, next) => {
        const db = req.app.get('db');
        const photos = await db.get_photos([req.session.user.id]);
        return res.status(200).send(photos);
    },
    addPhoto: async (req, res, next) => {
        const { date_taken, category, photo_url, user_id, service_call_id } = req.body;
        const { id } = req.session.user;
        const db = req.app.get('db');
        const photo = await db.add_photo([date_taken, category, photo_url, user_id, service_call_id, id]);
        return res.status(200).send(photo);
    },
    deletePhoto: (req, res, next) => {
        const { id } = req.params;
        const db = req.app.get("db");
        db.delete_photo(id)
        .then((photo) => {
            res.status(200).send(photo)
        })
        .catch(err => {
            res.status(500).send({errorMessage: "Something went wrong."});  
            console.log(err);
        });
    }
};