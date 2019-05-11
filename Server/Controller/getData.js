module.exports = {
    getData:(req,res,next) =>{
        console.log("getData hit!")
        res.status(200).send('hello')
    }
}