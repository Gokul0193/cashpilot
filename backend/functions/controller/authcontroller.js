const { initializeUserData, getUserData } = require('../model/usermodel');
const { db } = require('../config/firebase');

exports.signup = async (req, res) => {
  const { name } = req.body;

  if (!req.user || !req.user.uid) {
    return res.status(401).json({ error: 'Unauthorized. UID missing.' });
  }

  const uid = req.user.uid;

  try {
    const userRef = db.collection('users').doc(uid);
    const userDoc = await userRef.get();

    if (!userDoc.exists) {
      await initializeUserData(uid, name);
      console.log(`Initialized new user: ${uid}`);
      return res.status(201).json({ message: 'User created and initialized', uid, name });
    }

    res.status(200).json({ message: 'User already exists', uid, name });
  } catch (error) {
    console.error('Signup error:', error);
    res.status(500).json({ error: 'Signup failed', details: error.message });
  }
};

exports.login = async (req, res) => {
  if (!req.user || !req.user.uid) {
    return res.status(401).json({ error: 'Unauthorized. UID missing.' });
  }

  const uid = req.user.uid;

  try {
    const { budget, income,userdata } = await getUserData(uid);
    res.status(200).json({ message: 'Login success', uid, budget, income,userdata });
  } catch (error) {
    console.error('Login error:', error);
    res.status(500).json({ error: 'Login failed', details: error.message });
  }
};


