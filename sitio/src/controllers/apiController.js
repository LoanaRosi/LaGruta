const db = require("../database/models")

module.exports = {
    changeImage: (req, res) => {
        console.log(req.params.id)
        console.log(req.files)
        db.Image.update(
            {
                file: req.files[0].filename
            },
            {
                where: { id: req.params.id }
            }
        )
            .then( () => res.status(200).json('imagen actualizada!'))
            .catch( error => console.log(error) )
    }


    
}