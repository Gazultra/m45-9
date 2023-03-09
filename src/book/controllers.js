const Book = require("./model");

const addBook = async (req,res) => {
    try { 
        const book = await Book.create(req.body);

        res.status(201).json({
            message: "success", 
            addBook: { bookName: req.body.bookName, bookAuthor: req.body.bookAuthor, bookGenre: req.body.bookGenre},
        })

    }catch (error) {
        res.status(501).json({ errormessage: error.message, error: error})
    }
};


const getAllBooks = async (req,res) => {
    try {
const error = new Error("not authorized")
    {
        const books =  await Book.findAll();{

        res.status(401).json({errorMessage: error.message, error: error});

}

       
       
        }

        res.status(200).json({ message: "sucess", users: users});
    } catch (error) {
        res.status(501).json({errormessage: error.message, error: error})
    }
}

module.exports = {
    addBook,
    getAllBooks,

};


