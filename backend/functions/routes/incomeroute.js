const express=require('express');
const router=express.Router();
const verifyIdToken=require('../middlewares/verifyToken');
const {budgetExpense,getbudgetExpense,getmonthlydata, budgetIncome,getIncome,getexpense} = require('../controller/budgetcontroller');
router.post('/budget',verifyIdToken,budgetExpense)
router.post('/income',verifyIdToken,budgetIncome);
router.get('/getbudget',verifyIdToken,getbudgetExpense);
router.get('/getmonthlydata',verifyIdToken,getmonthlydata);
router.get('/getincome',verifyIdToken,getIncome);
router.get('/getexpense',verifyIdToken,getexpense)

module.exports=router;