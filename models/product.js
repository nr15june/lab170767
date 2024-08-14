const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
    product_name: { type: String, required: true }, 
    product_type: { type: String, required: true }, 
    price: { type: Number, required: true }, 
    unit: { type: String, required: true },
});

module.exports = mongoose.model('Product', productSchema);

createProduct = async (req, res) => { 
    const { product_name, product_type, price, unit } = req.body; 
    const product = new Product({ product_name, product_type, price, unit }); 
try { 
    const newProduct = await product.save();  
    res.status(201).json(newProduct); } 
catch (err) {  
     res.status(400).json({ message: err.message });  
    } 
};
