const { ObjectId } = require('mongodb');
const rp = require('request-promise');
const cheerio = require('cheerio');

const { Product } = require('./../models/Product');


module.exports = (app) => {
  app.post('/linksubmission', (req, res) => {
    const { url } = req.body;
    rp(url)
      .then((html) => {
        // success!

        const $ = cheerio.load(html);
        const desc = $('.product-info__description').html();
        const atribute = $('.product-info__attributes').html();
        const price = $('.product-info-main').find('span .price')
          .text().split('Rp')[1];
        const product = {
          title: $('.page-title').find('span').text(),
          subtitle: $('.page-title__secondary').text(),
          price: `Rp ${price}`,
          description: `<div> <h1>Information Product</h1>${desc} ${atribute}</div>`,
        };

        Product.findOneAndUpdate(
          { title: product.title }, // find a document with that filter
          product, // document to insert when nothing was found
          { upsert: true, new: true, runValidators: true }, // options
          (err, doc) => { // callback
            if (err) {
              res.sendStatus(500);
            } else {
              res.send({ product: doc });
            }
          },
        );
      })
      .catch((err) => {
        // handle error
        res.status(500).send({ error: err });
      });
  });

  app.get('/linksubmission', (req, res) => {
    Product.find({}).then((doc) => {
      res.send({ product: doc });
    });
  });

  app.get('/linksubmission/:id', (req, res) => {
    const { id } = req.params;
    if (!ObjectId.isValid(id)) {
      return res.status(404).send();
    }
    Product.findById(id).then((doc) => {
      if (!doc) {
        res.sendStatus(404);
      }
      res.send({ product: doc });
    });
  });
};
