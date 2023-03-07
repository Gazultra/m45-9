const User = require("./model");

const registerUser = async (req,res) => {
    try { 
        const user = await User.create(req.body);

        // const user = await User.create({
        // //     username: req.body.username,
        // //     email: req.body.email,
        // //     password: req.body.password

        // })

        

        res.status(201).json({
            message: "success", 
            user: { username: req.body.username, email: req.body.email},
        })

    }catch (error) {
        res.status(501).json({ errormessage: error.message, error: error})
    }
};

const login = async (req,res) => {
    try {
        res.status(201).json({message: "Sucess", user: {username: req.user.username, email: req.user.email}});
    } catch (error) { 
    res.status(501).json({ errormessage: error.message, error: error})
}
};

module.exports = {
    registerUser , 
    login,
}