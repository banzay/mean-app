const chai = require('chai');
const expect = chai.expect;
const mongoose = require('mongoose');

const config = require('../../config');

const User = require('../../models/user');

describe('Tests for the user DB model', () => {
    before(() => {
        return new Promise((resolve, reject) => {
            let db = mongoose.connect(config.testDB, function (err) {
                if (err) reject(new Error("Error during connection: " + JSON.stringify(err)));
                else resolve();
            });
        });
    });

    after(() => {
        return new Promise((resolve, reject) => {
            User.deleteMany({}, () => {
                resolve();
            })
        });
    });

    it('Saves user', async () => {
        const name = 'PungDao'
        const user = await user.save(
           new User({
            name,
            password: 'pass'
           })
        )
        const saved = await User.find()
        saved.length === 1
        saved.name === name
    });
});
