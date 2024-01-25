const Restaurant = require('../models/restaurantModel');
exports.addRestaurant = async (req, res) => {
    const { name, address, neighborhood } = req.body;

    const photograph = req.file.path;
    // console.log(req.files);
    try {
        const restaurant = await Restaurant.create({
            name,
            address,
            neighborhood,
            photograph
        });
        if (!restaurant) {
            return res.status(500).json({
                success: false,
                message: "Restaurant Registeration Failed!",

            });
        }
        res.status(201).json({
            success: true,
            message: "Restaurant Registeration Successfully Completed!",
            restaurant


        });

    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        });

    }




}
exports.getRestaurants = async (req, res) => {
    try {
        const restaurants = await Restaurant.find();
        if (!restaurants) {
            return res.status(500).json({
                success: false,
                message: "Restaurants not Found!",

            });
        }
        res.status(200).json({
            success: true,

            restaurants


        });

    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message

        });

    }
}
exports.deleteRestro = async (req, res) => {
    const { id } = req.params;
    try {
        const restro = await Restaurant.findByIdAndDelete(id);
        if (!restro) {
            return res.status(500).json({
                success: false,
                message: "restaurant not found",
            });

        }
        res.status(200).json({
            success: true,
            message: "Restaurant Deleted Successfully",
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message,
        });

    }
}
exports.updateRestro = async (req, res) => {
    const { id } = req.params;
    const { name, address, neighborhood } = req.body;
    const photograph = req.file.path;
    try {
        const restaurant = await Restaurant.findById(id);
            restaurant.name = name,
            restaurant.address = address,
            restaurant.neighborhood = neighborhood,
            restaurant.photograph = photograph,
            restaurant.save();
        if (!restaurant) {
            return res.status(404).json({
                success: false,
                message: "restro not found",
                restaurant,
            });

        }
        res.status(200).json({
            success: true,
            message: "updated",
            restaurant,
        });

    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message,
        });

    }



}
exports.getRestroDetails = async (req, res) => {
    const restroId = req.params.id;
    try {
        const restro = await Restaurant.findById(restroId);
        if (!restro) {
            return res.status(404).json({
                success: false,
                message: "Restro not Found",
                restro
            });
        }
        res.status(200).json({
            success: true,

            restro
        });


    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        });

    }
}