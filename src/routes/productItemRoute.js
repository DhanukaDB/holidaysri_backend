const router = require("express").Router();

const {addNewProductItem,viewProductItems,viewOneProductItem, updateProductItem,deleteProductItem} = require ('../controllers/ProductItemController.js')

//add new ProductItem 
router.post("/add", addNewProductItem);

//view all ProductItems
router.get("/", viewProductItems);

//update existing ProductItem
 router.put("/updateProductItem/:id",updateProductItem);

//delete existing one
 router.delete("/delete/:id",deleteProductItem);

//view one ProductItem
router.get("/get/:id", viewOneProductItem);



module.exports = router;