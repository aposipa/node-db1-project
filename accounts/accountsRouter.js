const express = require('express');
const db = require('../data/dbConfig.js');
const router = express.Router();

router.get('/', (req, res) => {
    db.select('*').from('accounts')
        .then(accounts => {
            res.status(200).json({ data: accounts });
        })
        .catch(err => {
            res.status(500).json({ message: "error GETing accounts", err });
        });
});

router.get('/:id', (req, res) => {
    db('accounts')
    .where({ id: req.params.id })
    .first()
    .then(account => {
        res.status(200).json({ data: account });
    })
    .catch(err => {
        res.status(500).json({ message: "error GETing accounts by ID", err });
    });
});

router.post('/', (req, res) => {
    const accountData = req.body;
    db('accounts')
    .insert(accountData)
    .then(account => {
        res.status(200).json({ data: account });
    })
    .catch(err => {
        res.status(500).json({ message: "error GETing accounts by ID", err });
    });
});

router.patch('/:id', (req, res) => {
    const changes = req.body;
    const { id } = req.params;
    db('accounts')
    .where({ id })
    .update(changes)
    .then(count => {
        if(count > 0) {
            res.status(200).json({ message: 'update successful!' })
        } else {
            res.status(404).json({ message: 'accounts by that id are in another castle, sorry'})
        }
    });
});

router.delete('/:id', (req, res) => {
    db('accounts')
    .where({ id: req.params.id })
    .del()
    .then(count => {
        if(count > 0) {
            res.status(200).json({ message: 'your deletion is now complete, beep boop!' })
        } else {
            res.status(404).json({ message: 'accounts not found'})
        }
    })
    .catch(err => {
        res.status(500).json({ message: "sorry there be an error here somewhere...", err})
    })
})




module.exports = router;