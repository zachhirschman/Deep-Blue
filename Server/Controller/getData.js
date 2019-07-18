module.exports = {
    getData:(req,res,next) =>{
        const db = req.app.get("db")
        db.Select.get_issues().then(issues =>{
            res.status(200).send(issues)
        })
    },
    createIssue:(req,res,next) =>{
        console.log("Creating new Issue with: ",req.body)
        const db = req.app.get("db")
        const {user_id,thumbnail,images,name,description,urgency,lat,long} = req.body
        let arrElem = `{${images}}`
        db.Insert.Create_issue([user_id,thumbnail,arrElem,name,description,urgency,lat,long]).then(response =>{
            res.status(200).send(response)
        })
    },
    addCommentToIssue:(req,res,next) =>{
        console.log("Got comment information:", req.query)
        const db = req.app.get("db")
        const {content, id} = req.query
        db.Insert.addCommentToIssue([content,id]).then(response =>{
            res.status(200).send(response)
        })
        // res.status(500).send("error on server")
    },
    filterBy:(req,res,next) =>{
        const {term} = req.query
        const db = req.app.get('db')
        if(term === 'most-popular'){
            db.Select.get_by_popularity().then(response =>{
                res.status(200).send(response)
            })
        }
        else if(term === 'urgency'){
            db.Select.get_by_urgency().then(response =>{
                res.status(200).send(response)
            })
        }
        else if(term === 'time'){
            db.Select.get_by_time().then(response =>{
                res.status(200).send(response)
            })
        }
        else{
            res.status(200).send([])
        }
    }
}