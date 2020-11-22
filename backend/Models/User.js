const mongoose = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator');
mongoose.connect('mongodb+srv://andi:iso@cluster0.tbk5x.mongodb.net/schtroumpfapp?retryWrites=true&w=majority',
    {
        useNewUrlParser: true,
        useUnifiedTopology: true
    })
    .then(() => console.log('Connexion à MongoDB réussie !'))
    .catch(() => console.log('Connexion à MongoDB échouée !'));

const userSchema = mongoose.Schema({
    name: { type: String, required: true, unique: true },
    age: { type : Number, required: true},
    family: { type : String, required: true},
    food: { type : String, required: true},
    picture: { type : String, required: true},
    password: { type: String, required: true },
    friends: [this]
});

userSchema.plugin(uniqueValidator);

module.exports = mongoose.model('User', userSchema);
