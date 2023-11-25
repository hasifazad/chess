const multer = require("multer")




const localStorage = multer.diskStorage({
    destination: function (req, file, callback) {
        callback(null, __dirname + './../public');
    },
    filename: function (req, file, callback) {

        console.log(file);
        // const filename = `file_${crypto.randomUUID()}`;
        callback(null, req.params.userId + '.jpg');
    }
})

const cloudStorage = multer.memoryStorage()

const upload = multer({
    storage: cloudStorage
}).single('image')

module.exports = upload