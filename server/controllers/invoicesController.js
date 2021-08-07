module.exports = {
    getInvoices: async (req, res, next) => {
        const db = req.app.get("db");
        const invoices = await db.get_invoices([req.session.user.id]);
        return res.status(200).send(invoices);
    },
    addInvoice: async (req, res, next) => {
        const { serviceStart, serviceEnd, invoiceNumber, invoiceAmount, paymentDate, paymentType, paymentAmount, invoiceBalance, invoiceStatus, userId, serviceAddressId } = req.body;
        const { id } = req.params;
        const db = req.app.get("db");
        const invoice = await db.add_invoice([serviceStart, serviceEnd, invoiceNumber, invoiceAmount, paymentDate, paymentType, paymentAmount, invoiceBalance, invoiceStatus, userId, serviceAddressId, id]);
        return res.status(200).send(invoice);
    },
    updateInvoice: async (req, res, next) => {
        const { serviceStart, serviceEnd, invoiceNumber, invoiceAmount, paymentDate, paymentType, paymentAmount, invoiceBalance, invoiceStatus, userId, serviceAddressId} = req.body;
        const db = req.app.get("db");
        const invoice = await db.update_invoice([serviceStart, serviceEnd, invoiceNumber, invoiceAmount, paymentDate, paymentType, paymentAmount, invoiceBalance, invoiceStatus, userId, serviceAddressId]);
        return res.status(200).send(invoice);
    },
    deleteInvoice: (req, res, next) => {
        const { id } = req.params;
        const db = req.app.get("db");
        db.delete_invoice(id)
        .then((invoice) => {
            res.status(200).send(invoice)
        })
        .catch(err => {
            res.status(500).send({errorMessage: "Something went wrong."});
        });
    }
};