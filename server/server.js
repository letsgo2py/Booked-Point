const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();
const port = process.env.PORT || 3000;

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
const dbUrl = process.env.DB_URL;
mongoose.connect("mongodb://127.0.0.1:27017/mybooks").then(() => console.log("Mongoose Connected!"))

// Define a schema and model
const userSchema = new mongoose.Schema({
    isbn: String,
    book: {
        bookName: String,
        bookNote: String,
    }
});

const bookSchema = new mongoose.Schema({
    isbn: {
        type: String,
        required: true,
        unique: true
    },
    bookName: {
        type: String,
        required: true
    },
    author: {
        type: String,
        required: true
    },
    section: {
        type: Number,
        required: true
    }
});

// About the section column 
// section = 1       future readings
// section = 2       fresh readings
// section = 3       completed readings

const User = mongoose.model('User', userSchema);
const Book = mongoose.model('Book', bookSchema);

// Routes

app.get('/content', async (req, res) => {
    const isbn_ = req.query.isbn;
    const book = await User.findOne({ isbn: isbn_ });

    if(book.book.bookNote) {
        return res.send({
            content: book.book.bookNote,
            found: true,
        });
    }else{
        return res.send({
            content: "Write your Note.", 
            found: false,
        })
    }
})

app.get('/api/books', async (req, res) => {
    try {
        const books = await Book.find(); // Fetch all books from the database
        res.status(200).json(books); // Return the books in JSON format
    } catch (error) {
        console.error(error);
        res.status(500).send('Error fetching books');
    }
})

app.patch('/api/books/:isbn', async (req, res) => {
    const { isbn } = req.params;
    const { section } = req.body;
    console.log('Updating section:', section);
    try {
        const book = await Book.findOneAndUpdate(
          { isbn },
          { section },
          { new: true, runValidators: true }
        );
    
        if (!book) {
          return res.status(404).send({ message: 'Book not found' });
        }
        res.status(200).send({ message: 'Book updated successfully', book });
    } catch (error) {
    res.status(500).send({ message: 'Error updating book', error });
    }
})

app.patch('/api/booksback/:isbn', async (req, res) => {
    const { isbn } = req.params;
    const { section } = req.body;
    console.log('Updating section:', section);
    try {
        const book = await Book.findOneAndUpdate(
          { isbn },
          { section },
          { new: true, runValidators: true }
        );
    
        if (!book) {
          return res.status(404).send({ message: 'Book not found' });
        }
        res.status(200).send({ message: 'Book updated successfully', book });
    } catch (error) {
    res.status(500).send({ message: 'Error updating book', error });
    }
})

app.patch('/api/bookscmp/:isbn', async (req, res) => {
    const { isbn } = req.params;
    const { section } = req.body;
    console.log('Updating section:', section);
    try {
        const book = await Book.findOneAndUpdate(
          { isbn },
          { section },
          { new: true, runValidators: true }
        );
    
        if (!book) {
          return res.status(404).send({ message: 'Book not found' });
        }
        res.status(200).send({ message: 'Book updated successfully', book });
    } catch (error) {
    res.status(500).send({ message: 'Error updating book', error });
    }
})

app.delete('/api/remove/:isbn', async (req, res) => {
    const isbn = req.params.isbn;
    try {
        const book = await Book.findOneAndDelete({ isbn });
    
        if (!book) {
          return res.status(404).send({ message: 'Book not found' });
        }
        res.status(200).send({ message: 'Book removed successfully' });

      } catch (error) {
        res.status(500).send({ message: 'Error removing book', error });
    }
})

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

// add the book as the future reading section
app.post('/api/addBook', async (req, res) => {
    const { isbn, bookName, author } = req.body;
  
    try {
        const newBook = new Book({
            isbn: isbn,
            bookName: bookName,
            author: author,
            section: 1,
        });
        await newBook.save();
        res.status(200).send('Book added successfully');
    } catch (error) {
        console.error(error);
        res.status(500).send('Error saving the book');
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
