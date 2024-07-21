const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();
const port = 3000;

// Enable CORS for all origins (for development)
// app.use(cors()); 

// Or, specify allowed origins
app.use(cors({
    origin: 'http://localhost:5173' // Allow only from this origin
}));

// Middleware   
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Connect to MongoDB

mongoose.connect("mongodb://127.0.0.1:27017/mybooks").then(() => console.log("Mongoose Connected!"))

// Define a schema and model
const userSchema = new mongoose.Schema({
    isbn: String,
    book: {
        bookName: String,
        bookNote: String,
    }
});

const User = mongoose.model('User', userSchema);

// Routes
app.post('/submit', async (req, res) => {
    const bookdata = req.body;
    try {
        // Find the book by ISBN and update or create it
        const updatedBook = await User.findOneAndUpdate(
          { isbn: bookdata.isbn },
          { $set: { 'book.bookNote': bookdata.content } },
          { new: true, upsert: true } // Create a new document if one doesn't exist
        );
    
        res.send('Data saved successfully');
      } catch (err) {
        console.error(err);
        res.status(500).send('Error saving data');
      }
});


app.post('/check', async (req, res) => {
    const isbn_ = req.body.isbn;

    const data = await User.find({isbn : isbn_})
    const isFound = (data.length == 0) ? false : true;

    if(!isFound){
        await User.create({
            isbn: isbn_
        })
    }

    res.send(isFound); // book is found
});

app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});
