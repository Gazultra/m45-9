const bcrypt = require ("bcrypt");
const User = require("../users/model")

const saltRounds = process.env.SALT_ROUNDS;
const jwt = require("jsonwebtoken");

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
    console.log("req.body: ",req.body)
    try {
       
        req.user = await User.findOne({where: {username: req.body.username}});

        console.log("req.user: ", req.user)
        const match = await bcrypt.compare(req.body.password, req.user.password);
        console.log(match)  
              if (!match) {
            const error = new Error("passwords do not match");
            res.status(500).json({ errorMessage: error.message, error: error})
        }
    
        
        next();
        }catch (error) {
        res.status(501).json({errorMessage: error.message, error: error});
    }
}

const tokenCheck = async (req, res, next) => {
    console.log("!!!!!!!!!!")
 
    try  {
          console.log(req.header("authorization"))  

            const token = req.header("Authorization");
          console.log("token: ",token)
        console.log("SECRET CODE", process.env.SECRET)
            const decodedToken = await jwt.verify(token, process.env.SECRET);
         
            const user = await User.findOne({where: {id: decodedToken.id}});
            console.log("this is me",user)
            if (!user) {
                const error = new Error ("user is not authorised");
                res.status(401).json({ errorMessage: error.message, error: error});
            }

            req.authCheck = user;

            next();
           
    } catch (error) {
        res.status(501).json({errorMessage: error.message, error: error});
    }
}
module.exports = {
    hashPass,
    comparePass,
    tokenCheck,


                    
}