const db = require("../database/models")

module.exports = {
    changeImage : (req,res) => {
        console.log(req.files)

        return res.json(req.files)
    }

    
}