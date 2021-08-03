const { QueryTypes } = require('sequelize');
const db = require('../config/db');
const carQueries = {
    getCarsNotRent: () => `
    SELECT C.* FROM Cars C 
    LEFT JOIN CarRents CR 
    ON CR.CarId = C.id 
    WHERE CR.CarId IS NUll`,
};

const carRepo = {
        carsNotRent: async () => {
            try {
            const query = carQueries.getCarsNotRent();
            const response = await db.query(query, { type: QueryTypes.SELECT });
            return response && response.length ? response : [];
            } catch (error) {
                throw error;
            }
        }

}

module.exports = carRepo;