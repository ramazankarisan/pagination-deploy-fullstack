const express = require('express');
const app = express();
const path = require('path');
const dotenv = require('dotenv');
const mongoose = require('mongoose');
const cors = require('cors')
dotenv.config();

app.use(express.json());

mongoose.connect(`mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@${process.env.DB_HOST}/shop?retryWrites=true&w=majority`)
    .then(() => {
        console.log(`Database connected :) `);
    })
    .catch(err => {
        console.log(err);
    });

app.use(cors());
const coffeeRoute = require('./routes/coffeeRoute')

const userRoute = require('./routes/userRoute');
app.use('/api/coffee', coffeeRoute)
app.use('/api/user', userRoute)

app.use(express.static(path.join(__dirname, "../frontend/build")));
app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname + "../frontend/build/index.html"))
})


app.listen(5000, () => {
    console.log(' Server started on port 5000');
});
