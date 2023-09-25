// Budget API

const express = require('express');
const cors = require('cors');
const app = express();
const port = 3000;

app.use(cors());

const budget = {
    myBudget: [
        {
            title: 'Electronics',
            budget: 300
        },
        {
            title: 'Rent',
            budget: 350
        },
        {
            title: 'Market place',
            budget: 90
        },
        {
            title: 'Parking',
            budget: 30
        },
        {
            title: 'Cab',
            budget: 250
        },
        {
            title: 'Travel',
            budget: 450
        },
        {
            title: 'Other',
            budget: 359
        },
    ]
};

const data = [
    {"Framework": "Vue", "Stars": "166443", "Released": "2014"},
    {"Framework": "React", "Stars": "150793", "Released": "2013"},
    {"Framework": "Angular", "Stars": "62342", "Released": "2016"},
    {"Framework": "Backbone", "Stars": "27647", "Released": "2010"},
    {"Framework": "Ember", "Stars": "21471", "Released": "2011"},
  ];


app.get('/budget', (req, res) => {
    res.json(budget);
});


app.listen(port, () => {
    console.log(`API served at http://localhost:${port}`);
});