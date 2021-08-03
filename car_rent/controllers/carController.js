const Cars = require('../models/Cars');
const Brands = require('../models/Brands');
const Colors = require('../models/Colors');
const CarRepo = require('../repo/Car.repo');

module.exports = {

    async addCar(req, res){
        let { price, possession_years, brandId, colorId, image }= req.body;

        try {
            const brand = await Brands.findByPk(brandId);
            const color = await Colors.findByPk(colorId);
            if (brand && color){
                Cars.create({
                    price: price,
                    possession_years: possession_years,
                    image: image,
                    BrandId: brandId,
                    ColorId: colorId
                });

                return res.status(200).json({msg: 'Car created'});    
            }
            return res.status(400).json({ message: 'one the parameters passed is not valid' }); 
        } catch (error) {
            return res.status(500).json({ error: error.message })  
        }
    },

    async showCars(req, res){
        try {
            const cars = await CarRepo.carsNotRent();
            return res.status(200).json({cars: cars});
        } catch (error) {
            return res.status(500).json({ error: error.message })
        }
    },

    async showCar(req, res){
        const { uuid } = req.params;
        try {
            car = await Cars.find({where: {uuid: uuid}});
            if (!car){
                res.json({msg: 'Car does not exist'});
            }
            res.json(car);
        } catch (error) {
            return res.status(500).json({ error: error.message })
        }
    },

    async updateCar(req, res){
        const { uuid } = req.params;
        const { possession_years, brandId, colorId, image } = req.body;

        try {
            await Cars.update(
                {
                    price: price,
                    possession_years: possession_years,
                    image: image,
                    BrandId: brandId,
                    ColorId: colorId
                },
                { where: { uuid: uuid } }
            )
            res.json({ msg: 'Car Updated' });
        } catch (error) {
            return res.status(500).json({ error: error.message })
        }
    },

    async deletCar(req, res){
        const { uuid } = req.params;
        try {
            await Cars.destroy({ where: { uuid: uuid }});
            res.json({ msg: 'Car Deleted' });
        } catch (error) {
            return res.status(500).json({ error: error.message })
        }
    }
}