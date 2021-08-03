require('dotenv').config()
const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);
const CarRents = require('../models/CarRents');
const PriceRents = require('../models/PriceRents');

module.exports = {

    async stripePay(req, res, next){
      
        const { number, exp_month, exp_year, cvc } = req.body;
        const { carRentId, email } = req.body;

        try {

            const carRent = await CarRents.findByPk(carRentId);

            if (carRent !== null){
              const rentPrice = await PriceRents.findByPk(carRent.id);
            }

            let amount = rentPrice.price_rent * 100;

            const cardToken = await stripe.tokens.create({
                card: {
                  number: number,
                  exp_month: exp_month,
                  exp_year: exp_year,
                  cvc: cvc,
                },
              });
            
            const customer =  await stripe.customers.create({
                email: email,
                source: cardToken.id
            });

            const charge = await stripe.charges.create({
                amount: amount,
                currency: usd,
                customer: customer.id,
                description: 'Car Rent'
            });
            
        } catch (error) {
            return res.status(500).json({ error: error.message })  
        }
    }
}