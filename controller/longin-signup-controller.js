const bcrypt=require('bcrypt');
const userSchema = require("../model/user")
require('dotenv').config()
const jwt = require('jsonwebtoken');


const signup = async (req, resp) => {
  
     let checkuser=await userSchema.findOne({email:req.body.email})
     if(checkuser){
        return resp.status(400).json({msg:'email is already exist '})
    }
     const { name, email, password } = req.body
    console.log(name)
    const hashedpass=await bcrypt.hash(password,10);
    const createuser = userSchema({
        name: name,
        email: email,
        password: hashedpass,
       
    })

    await createuser.save()
    
    resp.status(200).json({ user: createuser})



}


let JWT_SECRET=process.env.JWT_SECRET;

const login= async (req,res)=>{
    let user=await userSchema.findOne({email:req.body.email})
    if(!user){
        return res.status(400).json({msg:'user is not found'})
    }
    try{
        let match=await bcrypt.compare(req.body.password,user.password)
    
    if(match){
        const token = jwt.sign({ userdetails:user },JWT_SECRET);
        return res.status(200).json({msg:'password match', token})
    }
    else{
        return res.status(400).json({msg:'password does not match'})
    }


}
    catch(error){
        res.status(500).json("server error")
    }




}




module.exports={signup,login};