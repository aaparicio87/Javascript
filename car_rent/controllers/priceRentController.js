const PriceRent = require('../models/PriceRents');

module.exports = {
    async addPriceRent(req, res){
        let { price }= req.body;
        try {
            await PriceRent.create({price_rent: price});
            return res.status(200).json({msg: 'Added price of the rent'});
        } catch (error) {
            return res.status(500).json({ error: error.message })  
        }
    },

    async showPriceRent(req, res){
        try {
            priceRent = await PriceRent.findAll();
            res.json(priceRent);
        } catch (error) {
            return res.status(500).json({ error: error.message })
        }
    },

    async updatePriceRent(req, res){
        const { uuid } = req.params;
        const { price } = req.body;

        try {
            await PriceRent.update({ price_rent: price }, { where: { uuid: uuid } });
            res.json({ msg: 'Price Updated' });
        } catch (error) {
            return res.status(500).json({ error: error.message })
        }
    },

    async deletePriceRent(req, res){
        const { uuid } = req.params;
        try {
            await PriceRent.destroy({ where: { uuid: uuid }});
            res.json({ msg: 'Price Deleted' });
        } catch (error) {
            return res.status(500).json({ error: error.message })
        }
    }
}