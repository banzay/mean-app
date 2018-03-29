const chai = require('chai');
const expect = chai.expect;
const async = require('async');
const mongoose = require('mongoose');

const config = require('../../config');

const Product = require('../../models/product');

describe('Tests for product api', () => {
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
            Product.deleteMany({}, () => {
                resolve();
            })
        });
    });

    it('Checking created items', async function () {
          let insertedProducts = [
            {
                title: 'titleTest1',
                description: 'descriptionTest1'
            },
            {
                title: 'titleTest2',
                description: 'descriptionTest2'
            },
            {
                title: 'titleTest3',
                description: 'descriptionTest3'
            },
            {
                title: 'titleTest4',
                description: 'descriptionTest4'
            },
            {
                title: 'titleTest5',
                description: 'descriptionTest5'
            }
          ]
          
          
          const products = await Product.collection.insert(insertedProducts)
          const saved = await Product.find({})
          expect(saved).to.exist;
          expect(saved.length).to.be.equal(5);
        });
    });
});
