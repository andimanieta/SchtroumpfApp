const User = require('./Models/User')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken');

exports.signup = (req, res, next) => {
    bcrypt.hash(req.body.password, 10)
        .then(hash => {
            const user = new User({
                name: req.body.name,
                age: req.body.age,
                family: req.body.family,
                food: req.body.food,
                picture: req.body.picture,
                password: hash,
                friends: []
            })
            console.log(user)
            user.save()
                .then(() => {
                    console.log('Sign Up succed! new user has been created !');
                    res.status(201).json({message: 'Utilisateur créé !'});
                })
                .catch(error => {
                    console.log('save failed ! sign up failed !')
                    res.status(400).json({error})
                });
        })
        .catch(error => res.status(500).json({error}));
};


exports.login = (req, res, next) => {
    User.findOne({name: req.body.name})
        .then(user => {
            if (!user) {
                return res.status(401).json({ error: 'User not found in DB !' });
            }
            bcrypt.compare(req.body.password, user.password)
                .then(valid => {
                    if (!valid) {
                        return res.status(401).json({ error: 'Wrong password !' });
                    }
                    res.status(200).json({
                        userId: user._id,
                        userName: user.name,
                        userAge: user.age,
                        userFamily: user.family,
                        userFood: user.food,
                        userPicture: user.picture,
                        userFriends: user.friends,
                        token: 'mon token'/*jwt.sign(
                            { userId: user._id },
                            'CLE SECRETE DU TOKEN',
                            { expiresIn: '12h' }
                        )*/
                    });
                })
                .catch(error => res.status(500).json({ error }));
        })
        .catch(error => res.status(500).json({ error }));
};
