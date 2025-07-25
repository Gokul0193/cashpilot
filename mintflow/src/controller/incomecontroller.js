import axios from 'axios';
import { getIdToken } from '../model/authmodel';
const MONEY_URL='http://localhost:5000/cashpilot-e346e/us-central1/api/income/';

 const getAuthHeader=async()=>{
    const token=await getIdToken();
    return {Authorization: `Bearer ${token}`};
}

export const addbudget=async(budgetData)=>{
    const headers=await getAuthHeader();
    const res=await axios.post(`${MONEY_URL}budget`,budgetData,{headers})
    return res.data;
}

export const getbudget=async()=>{
    const headers=await getAuthHeader();
    const res=await axios.get(`${MONEY_URL}getbudget`,{headers})
    return res.data;
}

export const getmonthlyData=async()=>{
    const headers=await getAuthHeader();
    const res=await axios.get(`${MONEY_URL}getmonthlydata`,{headers})
    return res.data;
}