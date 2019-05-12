module.exports = {
    login:(req,res,next) =>{
        const {email,password} = req.body
        res.status(200).json({email,password})
    }
}