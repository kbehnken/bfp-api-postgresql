require('dotenv').config();
const express = require('express');
const session = require('express-session');
const massive = require('massive');
const app = express();

const authCtrl = require('./controllers/authController');
const userCtrl = require('./controllers/userController');
const servicesCtrl = require('./controllers/servicesController');
const assetsCtrl = require('./controllers/equipmentController');
const photosCtrl = require('./controllers/photosController');
const addressesCtrl = require('./controllers/addressesController');
// const callsCtrl = require('./controllers/callsController');
const invoicesCtrl = require('./controllers/invoicesController');
const auth = require('./middleware/authMiddleware');

const { SESSION_SECRET, CONNECTION_STRING } = process.env;
massive(CONNECTION_STRING).then(db => {
  app.set('db', db);
  console.log('db connected');
});

app.use(express.json());
app.use(
  session({
    resave: true,
    saveUninitialized: false,
    secret: SESSION_SECRET,
  })
);

app.post('/api/v1/auth/login', authCtrl.login);
app.post('/api/v1/auth/logout', authCtrl.logout);

app.get('/api/v1/users', userCtrl.getUsers);
app.post('/api/v1/users', userCtrl.addUser);
app.put('/api/v1/users/', auth.usersOnly, userCtrl.updateUser);

app.get('/api/v1/services', auth.usersOnly, servicesCtrl.getServices);
app.post('/api/v1/services', auth.usersOnly, servicesCtrl.addService);
app.put('/api/v1/services/', auth.usersOnly, servicesCtrl.updateService);
app.delete('/api/v1/services/:id', auth.usersOnly, servicesCtrl.deleteService);

app.get('/api/v1/assests', auth.usersOnly, assestsCtrl.getAssets);
app.post('/api/v1/assests', auth.usersOnly, assestsCtrl.addAsset);
app.put('/api/v1/assests/:id', auth.usersOnly, assestsCtrl.updateAsset);
app.delete('/api/v1/assests/:id', auth.usersOnly, assestsCtrl.deleteAsset);

app.get('/api/v1/photos', auth.usersOnly, photosCtrl.getPhotos);
app.post('/api/v1/photos', auth.usersOnly, photosCtrl.addPhoto);
// app.put('/api/v1/photos/:id', auth.usersOnly, photosCtrl.updatePhoto);
app.delete('/api/v1/photos/:id', auth.usersOnly, photosCtrl.deletePhoto);

app.get('/api/v1/addresses', auth.usersOnly, addressesCtrl.getAddresses);
app.get('/api/v1/addresses/byCustomerId/:id', auth.usersOnly, addressesCtrl.getAddressesByCustomerId);
app.get('/api/v1/addresses/:id', auth.usersOnly, addressesCtrl.getAddressesById);
app.post('/api/v1/addresses', auth.usersOnly, addressesCtrl.addAddress);
app.put('/api/v1/addresses/:id', auth.usersOnly, addressesCtrl.updateAddress);
app.delete('/api/v1/addresses/:id', auth.usersOnly, addressesCtrl.deleteAddress);

// app.get('/api/v1/calls', auth.usersOnly, callsCtrl.getCalls);
// app.get('/api/v1/calls/byCustomer/:id', auth.usersOnly, callsCtrl.getCallsByCustomer);
// app.get('/api/v1/calls/byAddress/:id', auth.usersOnly, callsCtrl.getCallsByAddress);
// app.post('/api/v1/calls', auth.usersOnly, callsCtrl.addCall);
// app.put('/api/v1/calls/:id', auth.usersOnly, callsCtrl.updateCall);
// app.delete('/api/v1/calls/:id', auth.usersOnly, callsCtrl.deleteCall);

app.get('/api/v1/invoices', auth.usersOnly, invoicesCtrl.getInvoices);
app.post('/api/v1/invoices', auth.usersOnly, invoicesCtrl.addInvoice);
app.put('/api/v1/invoices/:id', auth.usersOnly, invoicesCtrl.updateInvoice);
app.delete('/api/v1/invoices/:id', auth.usersOnly, invoicesCtrl.deleteInvoice);

const PORT = 4000;
app.listen(PORT, () => console.log(`Listening on port ${PORT}`));