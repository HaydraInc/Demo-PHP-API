const express = require('express');
const app = express();
const port = 3000;

// Middleware to parse JSON bodies
app.use(express.json());

// Sample data
let items = [
    { id: 1, name: 'Item 1' },
    { id: 2, name: 'Item 2' },
];

// GET /items - Get all items
app.get('/items', (req, res) => {
    res.json(items);
});

// GET /items/:id - Get a single item by ID
app.get('/items/:id', (req, res) => {
    const itemId = parseInt(req.params.id);
    const item = items.find(i => i.id === itemId);
    if (!item) {
        return res.status(404).json({ message: 'Item not found' });
    }
    res.json(item);
});

// POST /items - Create a new item
app.post('/items', (req, res) => {
    const newItem = {
        id: items.length + 1,
        name: req.body.name,
    };
    items.push(newItem);
    res.status(201).json(newItem);
});

// PUT /items/:id - Update an item by ID
app.put('/items/:id', (req, res) => {
    const itemId = parseInt(req.params.id);
    const item = items.find(i => i.id === itemId);
    if (!item) {
        return res.status(404).json({ message: 'Item not found' });
    }
    item.name = req.body.name;
    res.json(item);
});

// DELETE /items/:id - Delete an item by ID
app.delete('/items/:id', (req, res) => {
    const itemId = parseInt(req.params.id);
    items = items.filter(i => i.id !== itemId);
    res.status(204).send();
});

// Start the server
app.listen(port, () => {
    console.log(`API is running on http://localhost:${port}`);
});
