const express=require("express");
const { verifyToken } = require("../middlewares/auth");
const { addRestaurant, getRestaurants, deleteRestro, updateRestro, getRestroDetails } = require("../controllers/restaurantController");
const upload = require("../middlewares/fileUpload");

const router=express.Router();






router.route('/restaurant').post(verifyToken,upload.single('photograph'),addRestaurant);
router.route('/restaurants').get(getRestaurants);
router.route('/restaurantupdation/:id').delete(verifyToken,deleteRestro).put(verifyToken,upload.single('photograph'),updateRestro).get(verifyToken,getRestroDetails);



module.exports=router;