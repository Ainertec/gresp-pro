const Product = require("../model/Product");


module.exports = {
    async show(req, res) {
        const { name } = req.query;
        const products = await Product.find({ name: { $regex: new RegExp(name), $options: 'i' } });

        return res.json(products);

    },
    async store(req, res) {
        const { name, price, description } = req.body;
        if (!name || !price)
            return res.status(400).json("product doesn't have name or price");
        try {
            const product = await Product.create({
                name,
                price,
                description
            });
            return res.json(product);
        } catch (err) {
            return res.status(500).json("server error");
        }

    },

    async update(req, res) {
        const { name, price, description } = req.body;
        const { id } = req.params;
        if (!id || !name || !price)
            return res.status(400).json("product doesn't have name or price or id");
        try {
            const products = await Product.findOneAndUpdate({"_id": id }, {
                name,
                price,
                description
            });
            if (!products)
               return res.status(400).json("Id does not exist");
            return res.json(await Product.findOne({"_id":id}));
        } catch (err) {
            return res.status(500).json("server error");
        }
    },

    async destroy(req, res) {
        const { id } = req.params;
        if (!id)
            return res.status(400).json("id doesn't informed");
        try {
            const product = await Product.findByIdAndDelete({ "_id": id });
            if (!product)
              return res.status(400).json("product does not exist");
            return res.json("product deleted with success");
        } catch (err) {
            return res.status(500).json("server error");
        }
    }


}