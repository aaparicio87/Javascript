const Brands = require('../models/Brands');

module.exports = {
    async addBrand(req, res){
        let { name }= req.body;

        try {
            await Brands.create({name: name});
            return res.status(200).json({msg: 'Brand created'});    
        } catch (error) {
            return res.status(500).json({ error: error.message })  
        }
    },

    async showBrands(req, res){
        try {
            brands = await Brands.findAll();
            res.json(brands);
        } catch (error) {
            return res.status(500).json({ error: error.message })
        }
    },

    async updateBrand(req, res){
        const { uuid } = req.params;
        const { name } = req.body;

        try {
            await Brands.update({ name: name }, { where: { uuid: uuid } });
            res.json({ msg: 'Brand Updated' });
        } catch (error) {
            return res.status(500).json({ error: error.message })
        }
    },

    async deleteBrand(req, res){
        const { uuid } = req.params;
        
        try {
            await Brands.destroy({ where: { uuid: uuid }});
            res.json({ msg: 'Brand Deleted' });
        } catch (error) {
            return res.status(500).json({ error: error.message })
        }
    }
}