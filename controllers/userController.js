let User =require('../model/user')
const bcrypt =require('bcrypt')
const jwt =require('jsonwebtoken')



let register = async(req,res) => {
    let{name,email,password} = req.body
    console.log(name,email,password);

    const salt =await bcrypt.genSalt(10)
    password =await bcrypt.hash(password,salt)  //Here we are encytping the password and using it


    let user = new User({name,email,password})
    await user.save()
    // res.send(user)

    let payload={id:user.id}

    jwt.sign(
        payload,
        process.env.JWT_secret,
        {
            expiresIn:'1hr'
        },(err,token) =>{
            if(err){
                throw err
            }
            else{
                res.send(token)
            }
            })
        }
        


let login = async (req,res) =>{
    let{inp_email,inp_password}=req.body
    let user = await User.findOne({email:inp_email})
    console.log(user);
    
    let isvalidPWD= await bcrypt.compare(inp_password ,user.password)

    if(!isvalidPWD){
        res.status(400).send("The User does not exists")
    }
    else{
        let payload={id:user.id}

        jwt.sign(
        payload,
        process.env.JWT_secret,
        {
            expiresIn:'1hr'
        },(err,token) =>{
            if(err){
                throw err
            }
            else{
                res.send(token)
            }
            })
} 
}


let profile = async(req,res) =>
    {
    // const user = await User.aggregate([{$project:{name:1,email:1,password:1,_id:0}}])
    res.status(200).send("this is profile Page")
    } 

let transaction=async(req,res)=>{
    res.status(200).send("this is transcation page")
}

let wishlist=async(req,res)=>{
    res.status(200).send("this is wishlist page")
}


module.exports= {   
    login,
    profile,
    register,
    transaction,
    wishlist
}
