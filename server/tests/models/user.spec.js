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

    it('Checking saved name', function () {

        return new Promise((resolve, reject) => {
            let testName = 'PungDao';
            let user = new User({
                name: testName,
                password: 'pass'
            });

            user.save(function (err, user) {
                expect(err).not.to.exist;
                expect(user).to.exist;

                expect(user.name).to.be.equal(testName);
                resolve();
            });
        });
    });
});
