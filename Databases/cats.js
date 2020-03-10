var mongoose = require("mongoose") ;
mongoose.connect('mongodb://localhost:27017/cat_app', { useNewUrlParser: true }) ;

// To Have a Structure to our database
// Means every cat has a name, age and temperament !!!
var catSchema = new mongoose.Schema({
    name: String,
    age: Number,
    temperament: String
}) ;

// Now we have a cat object
// Now we write commands cat.find(), etc
var cat = mongoose.model("Cat", catSchema) ;

// var george = new cat({
//     name: "George",
//     age: 2,
//     temperament: "Grouchy"
// }) ;

// george.save(function(err, Cat){
//     if(err){
//         console.log("Something Went Wrong!!") ;
//     }
//     else{
//         console.log(Cat) ;
//     }
// }) ;

cat.create({
    name: "Snow White",
    age: 15, 
    temperament: "nice"
}, function(err, Cat){
    if(err){
        console.log(err) ;
    }
    else{
        console.log("Added")
        console.log(Cat) ;
    }
}) ;

cat.find({}, function(err, cat){
    if(err){
        console.log(err) ;
    }
    else{
        console.log(cat) ;
    }
}) ;