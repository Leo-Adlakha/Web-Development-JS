var express                 = require("express"),
    app                     = express(),
    mongoose                = require('mongoose'),
    passport                = require('passport'),
    LocalStrategy           = require('passport-local'),
    BodyParser              = require('body-parser'),
    passportlocalmongoose   = require('passport-local-mongoose'),
    User                    = require('./models/user');

// Named DB 27017 by mistake
mongoose.connect("mongodb://localhost/27017", { useNewUrlParser: true, useUnifiedTopology: true });
app.use(require('express-session')({
    secret: "I am Anonymous",
    resave: false,
    saveUninitialized: false
}));
app.set("view engine", "ejs");
app.use(BodyParser.urlencoded({extended: true}));
app.use(passport.initialize());
app.use(passport.session());
passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

// Normal Routes

app.get('/', function(req, res){
    res.render("home");
});

// similarly we can add multiple middlewares !!
app.get('/secret',isLoggedIn, function(req, res){
    res.render("secret");
});

// Auth Routes

app.get('/register', function(req, res){
    res.render('register');
});

app.post('/register', function(req, res){
    User.register(new User({username: req.body.username}), req.body.password, function(err, user){
        if ( err ){
            console.log(err) ;
            return res.render('register') ;
        }
        passport.authenticate('local')(req, res, function(){
            res.redirect('/secret');
        })
    });
});

app.get('/login', function(req, res){
    res.render('login') ;
}) ;

// Middleware --> passport.authenticate
app.post('/login', passport.authenticate('local', {
    successRedirect: '/secret',
    failureRedirect: '/login'
}), function(req, res){
}) ;

app.get('/logout', function(req, res){
    req.logout() ;
    res.redirect('/');
}) ;

function isLoggedIn(req, res, next){
    if (req.isAuthenticated()){
        return next();
    }
    else{
        res.render('login');
    }
}

app.listen(3000, function(){
    console.log("The Server has started");
});