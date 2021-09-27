const Medication = require('../models/Medications');

module.exports = {    
    async addMedication(req, res){

        let {name,
            weight,
            code }= req.body;
        let image = req.file;
        if(!image){
            return res.status(422).json({msg: 'File is not an image'});
        }
        let imageUrl = image.path
        try {
                Medication.create({
                    name: name,
                    weight: weight,
                    code: code,
                    image: imageUrl
                });
                return res.status(200).json({msg: 'Medication created'});
        } catch (error) {
            return res.status(500).json({ error: error.message })  
        }
    },

    async showMedications(req, res){
        try {
            const medications = await Medication.findAll();
            return res.status(200).json({medications: medications});
        } catch (error) {
            return res.status(500).json({ error: error.message })
        }
    },

    async updateMedication(req, res){
        const { uuid } = req.params;
        let { name,
            weight,
            code
                }= req.body;

        let image = req.file;
        if(!image){
            return res.status(422).json({msg: 'File is not an image'});
        }
        let imageUrl = image.path

        try {
            await Medication.update(
                {
                    name: name,
                    weight: weight,
                    code: code,
                    image: imageUrl
                },
                { where: { uuid: uuid } }
            )
            res.json({ msg: 'Medication Updated' });
        } catch (error) {
            return res.status(500).json({ error: error.message })
        }
    },

    async deleteMedication(req, res){
        const { uuid } = req.params;
        try {
            await Medication.destroy({ where: { uuid: uuid }});
            res.json({ msg: 'Medication Deleted' });
        } catch (error) {
            return res.status(500).json({ error: error.message })
        }
    }
}