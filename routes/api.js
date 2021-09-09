const express = require('express');
const router = express.Router();
const User = require('../models/user');
const Kudos = require('../models/kudos');
const { isLoggedIn, isItMe } = require('../middleware');

// get a list of users from the database
router.get('/users', async (req, res, next) => {
    try {
        let users = await User.find({});
        res.send(users);
    } catch (e) {
        next(e);
    }
});

// get a user
router.get('/users/:id', isLoggedIn, async (req, res, next) => {
    try {
        let user = await User.findOne({ _id: req.params.id });
        res.send(user);
    } catch (e) {
        next(e);
    }
});

// add a new user to database
router.post('/users', async (req, res, next) => {
    try {
        let user = await User.create(req.body);
        res.send(user);
    } catch (e) {
        next(e);
    }
});

// update a user in the database
router.put('/users/:id', isLoggedIn, isItMe, async (req, res, next) => {
    let currentId = req.headers.id;
    let userToUpdateId = req.params.id;
    if (currentId !== userToUpdateId) {
        return next({
            status: 405,
            message: 'You can not update someone else!'
        })
    }
    try {
        let user = await User.findOneAndUpdate({ _id: req.params.id }, req.body, { new: true });
        res.send(user);
    } catch (e) {
        next(e);
    }
});

// delete a user in the database
router.delete('/users/:id', isLoggedIn, isItMe, async (req, res, next) => {
    try {
        let user = await User.findOneAndDelete({ _id: req.params.id });
        res.send(user);
    } catch (e) {
        next(e);
    }
});

// add a kudos to the user
router.post('/users/:id/kudos', isLoggedIn, async (req, res, next) => {
    let currentId = req.headers.id;
    let receiverId = req.params.id;
    if (currentId === receiverId) {
        return next({
            status: 405,
            message: 'You can not give kudos to yourself'
        })
    }
    let kudos = {
        ...req.body,
        _senderId: currentId,
        _receiverId: receiverId
    }
    try {
        let newKudos = await Kudos.create(kudos);
        res.send(newKudos);
    } catch (e) {
        next(e);
    }
});

// get kudos received by a user
router.get('/users/:id/kudos', isLoggedIn, async (req, res, next) => {
    let receiverId = req.params.id;;
    try {
        let kudos = await Kudos.find({ _receiverId: receiverId });
        res.send(kudos);
    } catch (e) {
        next(e);
    }
});

// get kudos sended by a current user
router.get('/kudosByMe', isLoggedIn, async (req, res, next) => {
    try {
        let currentId = req.headers.id;
        let kudos = await Kudos.find({ _senderId: currentId });
        res.send(kudos);
    } catch (e) {
        next(e);
    }
});

module.exports = router;