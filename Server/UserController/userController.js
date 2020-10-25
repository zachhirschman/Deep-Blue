//Imports
const bcrypt = require('bcrypt')
const saltRounds = 12
module.exports = {

    login:( req, res, next) =>{

        const db = req.app.get('db');
        const { untrusted_email , untrusted_password } = req.body;

        db.Select.login(untrusted_email).then(response => {

            if(response.length){

                const user = response[0];
                const trusted_password = user.password;

                bcrypt.compare(untrusted_password, trusted_password).then(matched =>{

                    if(matched){

                        delete user.password;
                        req.session.user = user;

                        res.status(200).json({status:"success", user:req.session.user});
                    }
                    else{
                        res.status(403).json({message:"Incorrect Password"})
                    }
                })
            }
            else{
                res.status(403).json({message:"Unknown user"})
            }
        });
    },

    register:(req,res,next) =>{
        const db = req.app.get('db')
        const { email, password } = req.body
        
        bcrypt.hash(password, saltRounds).then(hashedPassword =>{
            db.Insert.Register([email, hashedPassword]).then((response)=>{

                const created_user = response[0];

                delete created_user.password;
                req.session.user = created_user;
                
                res.status(200).json({status:"success"});
                
            }).catch(error =>{
                if(error.message.match(/duplicate key/)){
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
    },
    logout:(req,res,next) =>{
        req.session.destroy()
        res.status(200).send("logged out")
    }
}