const Product = require('../models/product'); // เรียกใช้โมเดล Product

//--------------------------------------getProducts-------------------------------------
exports.getProducts = async (req, res) => { 
    try { 
        const products = await Product.find(); 
        res.json(products); 
    } catch (err) { 
        res.status(500).json({ message: err.message }); 
    } 
};

//-------------------------------------getProduct----------------------------------------
exports.getProduct = async (req, res) => {
    try { 
        const { id } = req.params;
        const product = await Product.findById( id );
        if (!product) return res.status(404).json({ message: 'Product not found' }); 
        res.json(product); 
    } catch (err) { 
        res.status(500).json({ message: err.message }); 
    }
};

//---------------------------------createProduct-------------------------------------------
exports.createProduct = async (req, res) => {
    const { product_name, product_type, price, unit } = req.body;
    const product = new Product({  product_name, product_type, price, unit });
    try { 
        const newProduct = await product.save();
        res.status(201).json(newProduct); 
    } catch (err) { 
        res.status(400).json({ message: err.message }); 
    }
};

//---------------------------------updateProduct--------------------------------------------
exports.updateProduct = async (req, res) => {
    try {
        const { id } = req.params;
        const product = await Product.findById( id );
        if (!product) return res.status(404).json({ message: 'Product not found' });
        const updates = req.body;
        Object.assign(product, updates);
        const updateProduct= await product.save();
        res.json(updateProduct);
    } catch (err) { 
        res.status(400).json({ message: err.message }); 
    }

};   

//---------------------------------deleteProduct-----------------------------------------
exports.deleteProduct = async (req, res) => {
    try {
        const { id } = req.params;
        const product = await Product.findById( id );
        if (!product) return res.status(404).json({ message: 'Product not found' });
        await Product.findByIdAndDelete( id );
        res.json({ message: 'Product Delete'}) 
    } catch (err) { 
        res.status(400).json({ message: err.message }); 
    }
};