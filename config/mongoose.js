const mongoose = require('mongoose');

// mongoose.connect('mongodb://localhost/codeial_development');
mongoose.connect('mongodb+srv://harish:harish123@cluster0.0qpeyqk.mongodb.net/codeial_development',{
     useNewUrlParser: true ,useUnifiedTopology:true
});

const db = mongoose.connection;

db.on('error', console.error.bind(console, "Error connecting to MongoDB"));


db.once('open', function(){
    console.log('Connected to Database :: MongoDB');
});


module.exports = db;