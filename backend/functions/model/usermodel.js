const { db } = require('../config/firebase');

// Initialize top-level user doc + empty budgets/incomes subcollections
const initializeUserData = async (uid, name) => {
  await db.collection('users').doc(uid).set({ name });

  // Create parent budget/income document (empty), just to hold subcollections
  await db.collection('budgets').doc(uid).set({});
  await db.collection('incomes').doc(uid).set({});
};

// Add budget entry under budgets/{uid}/entries
const addBudgetEntry = async (uid, category, amount) => {
  const entriesRef = db.collection('budgets').doc(uid).collection('entries');
  await entriesRef.add({
    category,
    amount,
    createdAt: new Date(),
  });
};

// Add income entry under incomes/{uid}/entries
const addIncomeEntry = async (uid, source, amount) => {
  const entriesRef = db.collection('incomes').doc(uid).collection('entries');
  await entriesRef.add({
    source,
    amount,
    createdAt: new Date(),
  });
};

// Get all entries from budgets/{uid}/entries and incomes/{uid}/entries
const getUserData = async (uid) => {
  const budgetSnap = await db.collection('budgets').doc(uid).collection('entries').get();
  const incomeSnap = await db.collection('incomes').doc(uid).collection('entries').get();
  const userDoc = await db.collection('users').doc(uid).get();
  const userdata= userDoc.exists? userDoc.data(): { name: 'Unknown User' };
  const budget = budgetSnap.docs.map(doc => ({ id: doc.id, ...doc.data() }));
  const income = incomeSnap.docs.map(doc => ({ id: doc.id, ...doc.data() }));

  return { budget, income ,userdata };
};

module.exports = {
  initializeUserData,
  addBudgetEntry,
  addIncomeEntry,
  getUserData,
  
};
