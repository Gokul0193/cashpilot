const { admin } = require("../config/firebase");
const { budget, getBudget,getMonthlyData,income, getincome,getExpense} = require("../model/budgetmodel");


const budgetExpense=async(req,res)=>{
    try {
        const idToken = req.headers.authorization.split('Bearer ')[1];
        if (!idToken) {
            return res.status(401).json({ error: 'Unauthorized. ID token missing.' });
        }
        const decode=await admin.auth().verifyIdToken(idToken);
        const useId=decode.uid;
        const budgetData  = req.body;
        await budget(useId, budgetData);
        res.status(200).json({ message: 'Budget updated successfully' });
    } catch (error) {
        res.status(500).json({ error: 'Failed to update budget', details: error.message });
    }
}

const getbudgetExpense=async(req,res)=>{
    try {
        const idToken=req.headers.authorization.split('Bearer ')[1];
        if (!idToken) {
            return res.status(401).json({ error: 'Unauthorized. ID token missing.' });
        }
        const decode=await admin.auth().verifyIdToken(idToken);
        const useId=decode.uid;
        const budgetData=await getBudget(useId)
        res.status(200).json(budgetData);
    } catch (error) {
        res.status(500).json({ error: 'Failed to retrieve budget', details: error.message });
    }
}

const getmonthlydata=async(req,res)=>{
    try {
        const idToken=req.headers.authorization.split('Bearer ')[1];
        if (!idToken) {
            return res.status(401).json({ error: 'Unauthorized. ID token missing.' });
        }
        const decode=await admin.auth().verifyIdToken(idToken);
        const useId=decode.uid;
        const monthlyData=await getMonthlyData(useId);
        res.status(200).json(monthlyData);
    } catch (error) {
        res.status(500).json({ error: 'Failed to retrieve monthly data', details: error.message });
    }
}

const budgetIncome=async(req,res)=>{
    try {
        const idToken = req.headers.authorization.split('Bearer ')[1];
        if (!idToken) {
            return res.status(401).json({ error: 'Unauthorized. ID token missing.' });
        }
        const decode=await admin.auth().verifyIdToken(idToken);
        const useId=decode.uid;
        const incomeData  = req.body;
        await income(useId, incomeData);
        res.status(200).json({ message: 'inome Added successfully' });
    } catch (error) {
        res.status(500).json({ error: 'Failed to Add Income', details: error.message });
    }
}

const getIncome=async(req,res)=>{
    try {
        const idToken=req.headers.authorization.split('Bearer ')[1];
        if (!idToken) {
            return res.status(401).json({ error: 'Unauthorized. ID token missing.' });
        }
        const decode=await admin.auth().verifyIdToken(idToken);
        const useId=decode.uid;
        const incometData=await getincome(useId)
        res.status(200).json(incometData);
    } catch (error) {
        res.status(500).json({ error: 'Failed to retrieve budget', details: error.message });
    }
}

const getexpense=async(req,res)=>{
    try {
        const idtoken=req.headers.authorization.split('Bearer ')[1];
        if(!idtoken){
            return res.status(401).json({ error: 'Unauthorized. ID token missing.' });
        }
        const decode=await admin.auth().verifyIdToken(idtoken);
        const useId=decode.uid;
        const expensedata=await getExpense(useId);
        res.status(200).json(expensedata);
    } catch (error) {
        res.status(500).json({ error: 'Failed to retrieve [expense', details: error.message });
    
    }
}
module.exports={budgetExpense,getbudgetExpense,getmonthlydata,budgetIncome,getIncome,getexpense
}