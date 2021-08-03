const CarRent = require('../models/CarRents');
const Cars = require('../models/Cars');
const Users = require('../models/Users');
const RentPrice = require('../models/PriceRents');

module.exports = {
    async addCarRent(req, res){
        const user = req.user
        const { inDate, outDate, carId, rentPriceId, userId }= req.body;

        try {
            const car = await Cars.findByPk(carId);
            const rentPrice = await RentPrice.findByPk(rentPriceId);
            
            if (!car || !rentPrice){

                return res.status(400).json({ message: 'one the parameters passed is not valid' }); 
            }

            const carRent = await CarRent.create({
                in_date: inDate,
                out_date: outDate,
                CarId: car.id,
                PriceRentId: rentPrice.id,
                UserId: user.id
            });
            return res.status(200).json({rent: carRent});
            
            
        } catch (error) {
            return res.status(500).json({ error: error.message })  
        }
    },
}