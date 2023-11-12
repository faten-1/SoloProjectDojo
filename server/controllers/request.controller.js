const Request = require("../models/request.model")

module.exports = {

    findAllRequests : (req,res)=> {
        Request.find()
        .then((allRequests)=> {
            console.log(allRequests)
            res.status(200).json(allRequests)
        })
        .catch((err)=> {
            console.log("find all requests failed")
            res.status(400).json({message : "Something went wrong in findAll",error:err})
        })
    },

    createNewRequest : (req,res) => {
        Request.create(req.body)
        .then ((newRequest)=> {
            console.log(newRequest)
            res.status(200).json(newRequest)
        })
        .catch((err)=> {
            console.log("create request failed")
            res.status(400).json(err)
        })
    },

    findOneRequest : (req,res) => {
        Request.findOne({_id:req.params.id})
            .then((oneRequest) => {
                console.log(oneRequest)
                res.status(200).json(oneRequest)
            })
            .catch((err)=> {
                console.log("find one request failed")
                res.status(400).json({message : "Something went wrong in findOne",error:err})
            })
            
    },

    deleteOneRequest : (req,res) => {
        Request.deleteOne({_id:req.params.id})
            .then((deleteRequest) => {
                console.log(deleteRequest)
                res.status(200).json(deleteRequest)
            })
            .catch((err)=> {
                console.log("delete one request failed")
                res.status(400).json({message : "Something went wrong in deleteOne ",error:err})
            })
    },

    updateRequest : (req,res) => {
        Request.findOneAndUpdate(
            {_id:req.params.id},
            req.body,
            {new : true , runValidators : true}
        )
        .then((updatedRequest) => {
            console.log(updatedRequest)
            res.status(200).json(updatedRequest)
        })
        .catch((err)=> {
            console.log("update request failed")
            res.status(400).json(err)
        })
    }

}