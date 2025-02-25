
const multer = require("multer")

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, './uploads')
    },
    filename: (req,file,cb) => {
        const fileName = `${Date.now()}-${file.originalname}`;
        cb(null, fileName)
    },
    fileFilter: function(req, file, cb) {
       if(file.mimetype === 'file/jpg' || file.mimetype === '/png'){
           cb(null, true)
       } else {
           cb(new Error('Invalidfile type . Only allow JPEG and PNG images are allowed'),null, false)
       }
    },
    limits : {
       filesize: 1024*1024 *5
    }
})

const upload = multer({
    storage:storage, 
})


module.exports = upload