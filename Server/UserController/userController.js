//Imports
const bcrypt = require('bcrypt')
const saltRounds = 12
module.exports = {

    login:(req,res,next) =>{
        const db = req.app.get('db')
        const {email,password} = req.body
        db.Select.login(email).then(response =>{
            if(response.length){
                bcrypt.compare(password, response[0].password).then(matched =>{
                    if(matched){
                        req.session.user = {
                            email:response[0].email
                        }
                        res.status(200).json({status:"success"})
                    }
                    else{
                        res.status(403).json({message:"Incorrect Password"})
                    }
                })
            }
            else{
                res.status(403).json({message:"Unknown user"})
            }
        })
    },
    register:(req,res,next) =>{
        const db = req.app.get('db')
        const {email,password} = req.body
        bcrypt.hash(password, saltRounds).then(hashedPassword =>{
            db.Insert.Register([email,hashedPassword]).then((response)=>{
                console.log("registered user: ",response[0])
                req.session.user = {
                    email
                }
                res.status(200).json({status:"success"})
            }).catch(error =>{
                if(error.message.match(/duplicate key/)){
                    console.log("User already exists")
                    res.status(409).json("That user already exists.")
                }
                else{
                    console.log(req.body)
                    console.log(error)
                    res.status(500).json("An error occured on the server.")
                }
            })
        })
    },
    getSession:(req,res,next) =>{
        res.status(200).json(req.session.user)
    }
}