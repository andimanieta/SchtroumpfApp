const express = require("express");
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const Schtroumpf = require('./Models/Schtroumpf');
const userCtrl = require('./user');
const UserSchtroumpf = require('./Models/User');
const auth = require('./middleware/auth')

const app = express();




app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
    next();
});

app.use(bodyParser.json());

app.post('/api/signup', userCtrl.signup);
app.post('/api/login', userCtrl.login);


/*const schtroumpfUser =
    {
        name: 'minou',
        age: 25,
        family: 'Schtroumpfddf',
        food: 'Mange n\'importe quoi',
        picture: 'https://www.coloori.com/wp-content/uploads/2016/01/schtroumpfs.jpg',
        friends: [
            {
                _id: 'dsqdssdf',
                name: 'Orel',
                age: 45,
                family: 'Schtroumpf (new generation)',
                food: 'Mange des légumes & fruits',
                picture: 'https://img.nrj.fr/npsDhHa-eynHp_CZJxwhhYaARV4=/800x450/smart/https%3A%2F%2Fimage-api.nrj.fr%2Fmedias%2F2018%2F09%2Fbandeau-artiste-orelsan_5bae18bc05eb0.jpg',
                friends: []
            },
            {
                _id: 'ytryuy',
                name: 'Tati',
                age: 31,
                family: 'Schtroumpf (new generation)',
                food: 'Mange des légumes & fruits',
                picture: 'https://www.lelombard.com/uploads/highlight/_thumbLarge/bd-schtroumpfs-schtroumpfette-personnage.jpg',
                friends: []
            }
        ]
    }*/

app.get('/api/schtroumpf', auth, (req, res, next) => {
        UserSchtroumpf.find()
            .then(userSchtroumpf => res.status(200).json(userSchtroumpf))
            .catch(error => res.status(400).json({error}))
});

/*app.put('/api/schtroumpf', auth, (req, res, next) => {
    Schtroumpf.update()
        .then(schtroumpf => res.status(200).json({schtroumpfUser: schtroumpf}))
        .catch(error => res.status(400).json({error}));
});*/

/*app.get('/api/schtroumpfFriends', auth, (req, res, next) => {
    Schtroumpf.find()
        .then(schtroumpfs => res.status(200).json(schtroumpfUser.friends))
        .catch(error => res.status(404).json({error}));
});*/
/*

app.get('/api/schtroumpf', (req, res, next) => {
    Schtroumpf.findOne({_id: schtroumpfUser._id})
        .then(schtroumpf => res.status(200).json(schtroumpf))
        .catch(error => res.status(400).json({error}));
});



app.get('/api/allSchtroumpf', (req, res, next) => {
    Schtroumpf.find()
        .then(schtroumpfs => res.status(200).json(schtroumpfs))
        .catch(error => res.status(404).json({error}));
});

app.put('/api/schtroumpf', (req, res, next) => {
    Schtroumpf.update()
        .then(schtroumpf => res.status(200).json({schtroumpfUser: schtroumpf}))
        .catch(error => res.status(400).json({error}));
})

app.delete('/api/schtroumpf/:id', (req, res, next) => {
    Schtroumpf.deleteOne({_id: req.params.id})
        .then(() => res.status(200).json({message: 'Ocject deleted'}))
        .catch(error => res.status(400).json({error}));
});


*/


module.exports = app;
