import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';

// Get __dirname equivalent in ES modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const port = 3000;

// Middleware
app.use(express.urlencoded({extended: true}));
app.use(express.static(path.join(__dirname, 'public')));

// Set views directory explicitly
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

// Store books data
const wishlist = [];

// Routes
app.get('/', (req, res) => {
    res.render('home');
});

app.get('/summary', (req, res) => {
    res.render('summary', { books: wishlist });
});

app.post('/add-book', (req, res) => {
    const { title, comment, rating } = req.body;
    wishlist.push({
        title,
        comment,
        rating,
        date: new Date().toLocaleDateString()
    });
    res.redirect('/summary');
});

app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});
