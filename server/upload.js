const multer = require('multer')
const router = require('express').Router();
const fileExtension = require('file-extension');
const username = '';
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'src/assets/profile_images')
    },
    filename: (req, file, cb) => {
        // cb(null, file.fieldname + '.' + fileExtension(file.originalname))
        const username = req.body.username;
        console.log(username);
        cb(null, username+ '.' + fileExtension(file.originalname));
    }
})

const upload = multer({
    storage:storage,
    limits:{
        fileSize: 2000000
    },
    fileFilter(req, file, cb){
        if(!file.originalname.match(/\.(jpg|jpeg|png)$/)){
            cb(new Error('unsupported format'))
        }
        cb(undefined, true)
    }
})

router.post('/api/uploadedfile', upload.single('file'), (req, res) => {
    const file = req.file;
    console.log('INNN')
    if(!file){
        res.json({messgae:'Bad request'})
    }
    res.json({status:'success', uploadedFile:file})
})
module.exports = {upload};