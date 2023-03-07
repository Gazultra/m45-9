const {Router} = require("express")
const exampleRouter = Router()

const finalfunc = async (req, res) => {
    console.log(req.body);
    res.status(201).json({ message: "success", body: req.body });
};

const middleOne = async (req, res, next ) => {
    console.log("start middleOne", req.body);
    req.body["middleOne"] = "im from the middleOne func";
    next();
}

const middleTwo = async (req, res, next ) => {
    console.log("start middleTwo", req.body);
    req.body["middleTwo"] = "im from the middleTwo func";
    next();
}



exampleRouter.post("/example",middleOne,middleTwo, finalfunc)

module.exports = exampleRouter;

