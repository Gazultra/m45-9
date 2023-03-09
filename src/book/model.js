const {DataTypes} = require("sequelize")
const connection = require("../db/connection");


const Book = connection.define("Book", {
    bookTitle: {
        type: DataTypes.STRING, 
        unique: true,
        allowNull: false,

    },
    bookGenre: {
        type: DataTypes.STRING, 
        unique: true, 
        allowNull: false, 
    },
    bookAuthor: {
        type: DataTypes.STRING,
        allowNull: false,
    },
},

);

module.exports = Book;