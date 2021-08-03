const Colors = require('../models/Colors');

module.exports = {
    async addColor(req, res){
        let { name }= req.body;
        
        try {
            await Colors.create({ name:name });
            return res.status(200).json({msg: 'Color created'});    
        } catch (error) {
            return res.status(500).json({ error: error.message })  
        }
    },

    async showColors(req, res){
        try {
            colors = await Colors.findAll();
            res.json(colors);
        } catch (error) {
            return res.status(500).json({ error: error.message })
        }
    },
    async updateColor(req, res){
        const { uuid } = req.params;
        const { name } = req.body;
        try {
            await Colors.update({ name: name }, { where: { uuid: uuid } });
            res.json({ msg: 'Color Updated' });
        } catch (error) {
            return res.status(500).json({ error: error.message })
        }
    },

    async deleteColor(req, res){
        const { uuid } = req.params;
        try {
            await Colors.destroy({ where: { uuid: uuid }});
            res.json({ msg: 'Color Deleted' });
        } catch (error) {
            return res.status(500).json({ error: error.message })
        }
    }
}