const express = require('express');
const graphqlHTTP = require('express-graphql');
const mongoose = require('mongoose');
const cors = require('cors');
const schema = require('./schema/schema');
const app = express();

// Allow Cross Origin Requests
app.use(cors());

// -mongoose.connect('mongodb+srv://admin:admin@cluster0.hcgos.mongodb.net/myFirstDatabase?retryWrites=true&w=majority')

// connect to mlab db
// The account I actually have access to
mongoose.connect('mongodb+srv://sigurdwatt:keyboard1@cluster0.byyyb.mongodb.net/myFirstDatabase?retryWrites=true&w=majority')
mongoose.connection.once('open', () => {
    console.log('connected to dB')
})

// bind express with graphql
app.use('/graphql', graphqlHTTP({
    // pass in a schema property
    schema,
    graphiql: true
}));

app.listen(4000, () => {
    console.log('now listening for requests on port 4000');
});
