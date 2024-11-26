import Product from "../model/productsSchema.js";
const listProducts = async (req, res) => {
    const products = await Product.find();
    return res.send({
        ok: true,
        products
    });
};
const getProductById = async (req, res) => {
    try {
        const id = req.params.id;
        const product = await Product.findOne({ _id: id });
        if (!product)
            return res.status(404).send(`product with id ${id} not found`);
        return res.send({
            ok: true,
            product
        });
    }
    catch (err) {
        console.log(err);
        return res.status(500).send(err);
    }
};
const getProductbyUserId = (req, res) => {
    res.send("Products id: " + req.params);
};
const createProduct = async (req, res) => {
    const body = req.body;
    // productValidate(body);
    try {
        let product = new Product(body);
        if (!product)
            return res.status(400).send("Error creating product");
        await product.save();
        return res.status(201).send({
            ok: true,
            product
        });
    }
    catch (err) {
        res.status(500).send({
            err,
            message: 'Something went wrong'
        });
    }
};
const updateProduct = async (req, res) => {
    try {
        const productId = req.params.id;
        let body = req.body;
        const product = await Product.findOneAndUpdate({ _id: productId }, body, { new: true });
        if (!product)
            return res.status(400).send("Error updating product");
        return res.send({
            ok: true,
            product
        });
    }
    catch (err) {
        console.log(err);
        return res.status(500).send(err);
    }
};
const deleteProduct = async (req, res) => {
    try {
        const productId = req.params.id;
        const status = req.body.status;
        const product = await Product.findOneAndUpdate({ _id: productId }, { status: false }, { new: true });
        if (!product)
            return res.status(400).send("Error updating product");
        return res.send({
            ok: true,
            product
        });
    }
    catch (err) {
        console.log(err);
        return res.status(500).send(err);
    }
};
export { listProducts, getProductById, getProductbyUserId, createProduct, updateProduct, deleteProduct };
