const productItem = require("../models/ProductItem");

//add new ProductItem for system
exports.addNewProductItem= async (req, res) => {
 
    //constant variables for the attributes
    const {productId,category, title,description,price,location,date,image,contactNumber} = req.body;
  
  
    productItem.findOne({productId: productId})
      .then((savedProductItem) => {
          if(savedProductItem) {
              return res.status(422).json({error:"Product Item already exists with that no"})
          }
  
          const newProductItem = new productItem({
            productId,
            category,
            title,
            description,
            price,
            location,
            date,
            image,
            contactNumber
           
        })
    
        newProductItem.save().then(() => {
             res.json("Product Item  Added")
    
        }).catch((err) => {
          
        })
      
    }).catch((err) =>{
        
    })
    }

//delete existing one
exports.deleteProductItem = async (req, res) => {
    let productId = req.params.id;
   
    await productItem.findByIdAndDelete(productId).then(() => {
      res.status(200).json({ status: "Deleted Successfully" });
    }).catch((error) => {
      res.status(500).json({ status: "Error with Deleting", error: error.message });
    })
  }
   
 //update 
 exports.updateProductItem= async (req, res) => { 
    //fetch id from url
    let id = req.params.id;
    const {productId,category, title,description,price,location,date,contactNumber} = req.body;
  
    const updateProductItem = {
        productId,category,title,description,price,location,date,contactNumber
    }
  
  
    const update = await productItem.findByIdAndUpdate(id, updateProductItem).then(() => {
      res.status(200).send({status: "Result updated"})
    }).catch((err) => {
       
        res.status(500).send({status: "Error with updating data", error: err.message});
    })   
  }

//view 
exports.viewProductItems= async (req, res) => { 
 
    //calling  model
    productItem.find().then((productItem) => {
      res.json(productItem)
  
  }).catch((err) => {
     
  })
  
  }
  //view one
  exports.viewOneProductItem = async (req, res) => {
    
    let did = req.params.id;
    const productItem = await productItem.findById(did).then((productItem) => {
        res.status(200).send({status: "  fetched", did})
    }).catch(() => {
        
         res.status(500).send({status:"Error with get " , error: err.message})
    })
  }