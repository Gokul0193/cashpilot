
const {auth}=require('../config/firebase');

const verifyToken=async(req,res,next)=>{
    const authHeader=req.headers.authorization;
    if (!authHeader || !authHeader.startsWith('Bearer ')){
        return res.status(401).json({error:'Unauthorized'});
    }

const idToken=authHeader.split('Bearer ')[1];

try {
    const decodedToken=await auth.verifyIdToken(idToken);
    req.user=decodedToken;
    next();
} catch (error) {
    res.status(401).json({error:'Unauthorized', message:error.message});
}

}
module.exports=verifyToken;