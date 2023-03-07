const bcrypt = require ("bcrypt");
const User = require("../users/model")
const saltRounds = process.env.SALT_ROUNDS;

const hashPass = async (req, res, next) => {
    try {
        // const hashPass = await bcrypt.hash(req.body.password, saltRounds);
        // console.log(hashedPass);
        // console.log(req.body)

        req.body.password = await bcrypt.hash(req.body.password, parseInt(saltRounds));
        next()
    } catch (error) {
        res.status(501).json({errorMessage: error.message, error: error})
    }
};                          

const comparePass = async  (req, res, next) => {
    try {
        // get user
        // const User = await User.findOne({where: {username: req.body.username}});
        req.user = await User.findOne({where: {username: req.body.username}});
        console.log(req.user)
        const match = await bcrypt.compare(req.body.password, req.user.password);
        console.log(match)  
              if (!match) {
            const error = new Error("passwords do not match");
            req.status(500).json({ errorMessage: error.message, error: error})
        }
        
        next();
        }catch (error) {
        res.status(501).json({errorMessage: error.message, error: error});
    }
}
module.exports = {
    hashPass,
    comparePass,                
}