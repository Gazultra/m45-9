require("dotenv").config()
const express = require("express")

const port = process.env.PORT || 5001;

const userRouter = require("./users/routes");
const bookRouter = require("./book/routes")

const User = require("./users/model")

const Book = require("./book/model");

const app = express();



app.use(express.json())


const syncTables = () => {
    User.sync({ alter: true, force: true });
    Book.sync({ alter: true, force: true });

};
app.use(userRouter)
app.use(bookRouter)

app.get("/health", (req, res)=>{
    res.status(200).json({message: "api is working"});
});


app.listen(port, () => {
    syncTables()
    console.log('app listening on port ${port}')
})

// "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwiaWF0IjoxNjc4MjA1MjUyfQ.SVo0lPRlH2YXTZ0SMW-QAGX6ewPvslP9FUwMjf1mFdw"
// eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwiaWF0IjoxNjc4MjA4Mzg0fQ.NZelYj2WW6MZAH1qYE45Mxc5EEJrEBYgt4ij2f74PP0
// gary --  eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwiaWF0IjoxNjc4MzU5MjQ2fQ.g8BpUauAkQrluZHimOlhvYI7cvuNkbV6V9u3mFSfSqw