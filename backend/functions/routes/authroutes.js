const express=require('express');
const router=express.Router();
const {signup,login}=require('../controller/authcontroller');
const verifyIdToken=require('../middlewares/verifyToken');

router.post('/signup', verifyIdToken,signup);
router.get('/login',verifyIdToken,login);



module.exports=router;