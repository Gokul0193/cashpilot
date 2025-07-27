const { db } = require('../config/firebase');

// Save a new budget entry
const budget = async (uid, budgetData) => {
  const budgetRef = db.collection('budgets').doc(uid);
  const doc = await budgetRef.get();

  let currentEntries = [];
  if (doc.exists) {
    const data = doc.data();
    currentEntries = data.entries || [];
  }

  const amountAllocated = parseFloat(budgetData.amountAllocated) || 0;
  const amountSpent = parseFloat(budgetData.amountSpent) || 0;
  const amountLeft = amountAllocated - amountSpent;

  const budgetEntry = {
    ...budgetData,
    amountAllocated,
    amountSpent,
    amountRemaining: amountLeft.toFixed(2),
  };

  currentEntries.push(budgetEntry);

  await budgetRef.set({ entries: currentEntries }, { merge: true });
};

// Get all budget entries
const getBudget = async (uid) => {
  const doc = await db.collection('budgets').doc(uid).get();
  if (doc.exists) {
    const data = doc.data();
    return data.entries || [];
  }
  return [];
};

// Get summarized monthly data (no entries array)
const getMonthlyData = async (uid) => {
  const currentYear = new Date().getFullYear();
  const budgetDoc = await db.collection('budgets').doc(uid).get();

  if (!budgetDoc.exists) return {};

  const data = budgetDoc.data();
  const entries = data.entries || [];
  const monthlyData = {};

  entries.forEach((entry) => {
    if (!entry.date) return;

    const entryDate = new Date(entry.date);
    const entryYear = entryDate.getFullYear();
    if (entryYear !== currentYear) return;

    const monthIndex = entryDate.getMonth(); // 0 = Jan
    const monthName = new Date(0, monthIndex).toLocaleString('default', { month: 'short' });

    const amountSpent = parseFloat(entry.amountSpent) || 0;
    const amountRemaining = parseFloat(entry.amountRemaining) || 0;

    if (!monthlyData[monthName]) {
      monthlyData[monthName] = {
        amountSpent: 0,
        amountRemaining: 0,
      };
    }

    monthlyData[monthName].amountSpent += amountSpent;
    monthlyData[monthName].amountRemaining += amountRemaining;
  });

  // Fill months that have no data with 0
  const allMonths = ["Jan", "Feb", "Mar", "Apr", "May", "Jun",
                     "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
  allMonths.forEach((month) => {
    if (!monthlyData[month]) {
      monthlyData[month] = {
        amountSpent: 0,
        amountRemaining: 0,
      };
    }
  });

  return monthlyData;
};

const income = async (uid, incomeData) => {
  const incomeRef = db.collection('incomes').doc(uid);
  const doc = await incomeRef.get();

  let currentEntries = [];
  if (doc.exists) {
    const data = doc.data();
    currentEntries = data.entries || [];
  }

  const Amount = parseFloat(incomeData.Amount) || 0;


  const incometEntry = {
    ...incomeData,
    Amount
  };

  currentEntries.push(incometEntry);

  await incomeRef.set({ entries: currentEntries }, { merge: true });
};

const getincome = async (uid) => {
  const doc = await db.collection('incomes').doc(uid).get();
  if (doc.exists) {
    const data = doc.data();
    return data.entries || [];
  }
  return [];
};

const getExpense = async (uid) => {
  const doc = await db.collection('budgets').doc(uid).get();
  if (!doc.exists) return [];

  const data = doc.data();
  const entries = data.entries || [];

  const currentYear = new Date().getFullYear();
  const dailyTotals = {};

  // Step 1: Sum amountSpent for each day in current year
  for (const entry of entries) {
    if (!entry.date || !entry.amountSpent) continue;

    const dateObj = new Date(entry.date);
    if (dateObj.getFullYear() !== currentYear) continue;

    const dateStr = dateObj.toISOString().split('T')[0]; // "YYYY-MM-DD"
    const amount = parseFloat(entry.amountSpent) || 0;

    if (!dailyTotals[dateStr]) {
      dailyTotals[dateStr] = 0;
    }
    dailyTotals[dateStr] += amount;
  }

  // Step 2: Create result for all days from Jan 1st to tomorrow
  const result = [];
  const startDate = new Date(currentYear, 0, 1); // Jan 1st
  const tomorrow = new Date();
  tomorrow.setDate(tomorrow.getDate() + 1);

  // Important: Clone the date object to avoid mutation issues
  for (let d = new Date(startDate); d <= tomorrow; d.setDate(d.getDate() + 1)) {
    const dateStr = new Date(d).toISOString().split('T')[0];
    result.push({
      date: dateStr,
      amount: dailyTotals[dateStr] || 0,
    });
  }

  return result;
};


module.exports = {
  budget,
  getBudget,
  getMonthlyData,
  income,
  getincome,
  getExpense
};
