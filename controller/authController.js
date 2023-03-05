
let express = require('express');
let router = express.Router();
const bodyParser = require('body-parser');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const config = require('../config');
const User = require('../model/userModel');

router.use(bodyParser.urlencoded({extended:true}))
router.use(bodyParser.json())

//hello mssg
router.get('/',(req,res) => {
    res.send('<h1>Welcome hii!</h1>');
})

//get All user
router.get('/users', function (req,res) {
    User.find({}).then((data) => {
        res.send(data)
    })
    .catch((error) => {
        if(error) throw error;
    })
    
})

//register user
router.post('/register',(req,res) => {
    let hashpassword = bcrypt.hashSync(req.body.password, 8);
    User.create({
        name:req.body.name,
        email:req.body.email,
        password:hashpassword,
        phone:req.body.phone,
        role:req.body.role?req.body.role:'User'
    }).then((data) => {
        res.send('Registration Successful');
    })
    .catch((err) => {
        if(err) res.send('Error While Register');
    })
})

//loginUser
router.post('/login',(req,res) => {
    User.findOne({email:req.body.email})
    .then((user) => {
        if(!user) res.send({auth:false,token:'No User Found'})
        else{
            const passIsValid = bcrypt.compareSync(req.body.password,user.password);
            if(!passIsValid)  res.send({auth:false,token:'Invalid Password'})
            // in case both valid
            let token = jwt.sign({id:user._id},config.secret,{expiresIn:86400}) //24hr
            res.send({auth:true,token:token})
        }
    }) 
    .catch((err) => {
        if(err) res.send({auth:false,token:'Error while login'})
    })
})

//userInfo
router.get('/userInfo',(req,res) => {
    let token = req.headers['x-access-token'];
    if(!token) res.send({auth:false,token:'No Token Provided'})
    //jwt verify
    jwt.verify(token,config.secret,(err,user) => {
        if(err) res.send({auth:false,token:'Invalid Token'})
        User.findById(user.id).then((result) => {
            res.send(result)
        })
    })
})


module.exports = router;

// 
// router.get('/userInfo',(req,res) => {
//     let token = req.headers['x-access-token'];
//     if(!token) res.send({auth:false,token:'No Token Provided'})
//     //jwt verify
//     jwt.verify(token, config.secret).then((user) => {
//         User.findById(user.id).then((result) => {
//             res.send(result)
//         })
//     })
//     .catch((err) => {
//         if(err) res.send({auth:false,token:'Invalid Token'})
//     })

// })