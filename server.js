const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

// Create express app
const app = express();

// Parse incoming requests with JSON payloads
app.use(bodyParser.json());

// Connect to MongoDB
mongoose.connect('mongodb://localhost/course_evaluation', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
});
const db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error:'));

// Define schema and model for evaluation data
const evaluationSchema = new mongoose.Schema({
    indexNumber: String,
    punctualRating: Number,
    lecturesRating: Number,
    teachingAidsRating: Number,
    lecturePaceRating: Number,
    syllabusRating: Number,
    knowledgeRating: Number,
    comments: String,
    date: { type: Date, default: Date.now },
});
const Evaluation = mongoose.model('Evaluation', evaluationSchema);

// Handle form submission
app.post('/submit-form', (req, res) => {
    // Create a new evaluation document
    const newEvaluation = new Evaluation(req.body);

    // Save the evaluation document to the database
    newEvaluation.save((err, savedEvaluation) => {
        if (err) {
            console.error('Error saving evaluation:', err);
            return res.status(500).send('Error saving evaluation');
        }
        console.log('Evaluation saved:', savedEvaluation);
        return res.status(200).send('Evaluation submitted successfully');
    });
});

// Start the server
const port = 3000;
app.listen(port, () => {
    console.log(`Server is listening on port ${port}`);
});
