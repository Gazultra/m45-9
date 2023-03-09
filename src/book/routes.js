const {Router} = require("express")
const bookRouter = Router();

const { addBook, getAllBooks, } = require("./controllers")



bookRouter.post("/book/addbook", addBook);
bookRouter.get("/book/getallbooks",getAllBooks)





module.exports = bookRouter;