const Drinkable = require("../model/Drinkable");


module.exports = {

    async show(req, res) {
        const { name } = req.query;
        const drinkables = await Drinkable.find({ name: { $regex: new RegExp(name), $options: 'i' } });
        return res.json(drinkables);
    },

    async store(req, res) {
        const { name, price, description, stock } = req.body;
        if (!name || !price)
            return res.status(400).json("drinkable doesn't have name or price");
        try {
            const drinkable = await Drinkable.create({
                name,
                price,
                description,
                stock
            });

            return res.json(drinkable);
        } catch (err) {
            return res.status(500).json("server error");
        }
    },

    async update(req, res) {
        const { name, price, description, stock } = req.body;
        const { id } = req.params;
        if (!id || !name || !price)
            return res.status(400).json("Drinkable doesn't have name or price or id");
        try {
            const drinkables = await Drinkable.findOneAndUpdate({"_id": id }, {
                name,
                price,
                description,
                stock
            });
            if (!drinkables)
               return res.status(400).json("Id does not exist");
            return res.json(await Drinkable.findOne({"_id":id}));

        } catch (err) {
            return res.status(500).json("server error");
        }

    },

    async destroy(req, res) {
        const { id } = req.params;

        if (!id)
            return res.status(400).json("id doesn't informed");
        try {
            const drinkable = await Drinkable.findByIdAndDelete(id);
            if (!drinkable)
               return res.status(400).json("drinkable does not exist");
            return res.json("drinkable deleted with success");
        } catch (err) {
            return res.status(500).json("server error");
        }
    }


}