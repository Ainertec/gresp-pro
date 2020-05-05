const Login = require("../model/Login");


module.exports = {
    async show(req, res) {
        const { login, password } = req.query;
        const admin = await Login.find({ login: { $regex: new RegExp(login), $options: 'i' } });

        return res.json(admin);

    },
    async store(req, res) {
        const { login, password } = req.body;
        if (!login || !password)
            return res.status(400).json("admin doesn't have login or password");
        try {
            const admin = await Login.create({
                login,
                password
            });
            return res.json(admin);
        } catch (err) {
            return res.status(500).json("server error");
        }

    },

    async update(req, res) {
        const { login, password } = req.body;
        const { id } = req.params;
        if (!id || !login || !password)
            return res.status(400).json("admin doesn't have login or senha or id");
        try {
            const admin = await Login.findOneAndUpdate({"_id": id }, {
                login,
                password
            });
            if (!admin)
               return res.status(400).json("Id does not exist");
            return res.json(await Login.findOne({"_id":id}));
        } catch (err) {
            return res.status(500).json("server error");
        }
    },

    async destroy(req, res) {
        const { id } = req.params;
        if (!id)
            return res.status(400).json("id doesn't informed");
        try {
            const admin = await Login.findByIdAndDelete({ "_id": id });
            if (!admin)
              return res.status(400).json("admin does not exist");
            return res.json("admin deleted with success");
        } catch (err) {
            return res.status(500).json("server error");
        }
    }


}