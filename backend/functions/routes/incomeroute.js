const express=require('express');
const router=express.Router();
const verifyIdToken=require('../middlewares/verifyToken');
const {budgetExpense,getbudgetExpense,getmonthlydata} = require('../controller/budgetcontroller');
router.post('/budget',verifyIdToken,budgetExpense)
router.get('/getbudget',verifyIdToken,getbudgetExpense);
router.get('/getmonthlydata',verifyIdToken,getmonthlydata);

module.exports=router;