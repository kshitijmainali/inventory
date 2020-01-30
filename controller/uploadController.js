const multer = require('multer');
const sharp = require('sharp');
//write direct to diskStorage

// const diskStorage = multer.diskStorage({
//   destination: (req, file, cb) => {
//     cb(null, 'public/img/users');
//   },
//   filename: (req, file, cb) => {
//     const ext = file.mimetype.split('/')[1];
//     cb(null, `user-${req.body.name}-${Date.now()}.${ext}`);
//   }
// });

const memoryStorage = multer.memoryStorage();

const multerFilter = (req, file, cb) => {
  if (file.mimetype.startsWith('image')) {
    cb(null, true);
  } else {
    cb(new Error(), false);
  }
};

const upload = multer({
  storage: memoryStorage,
  fileFilter: multerFilter
});

exports.uploadPhoto = upload.single('photo');

//resize the user photo to square and to low resize
exports.resizeUserPhoto = (req, res, next) => {
  if (!req.file) return next();

  req.file.filename = `user-${req.body.name}-${Date.now()}.jpeg`;

  sharp(req.file.buffer)
    .resize(500, 500)
    .toFormat('jpeg')
    .jpeg({ quality: 90 })
    .toFile(`public/img/users/${req.file.filename}`);

  next();
};

exports.upload = async (req, res) => {
  try {
    console.log(req.file);
    console.log(req.body);
    res.status(201).json({
      status: 'success'
    });
  } catch (err) {
    res.status(501).json({
      massage: 'failed'
    });
  }
};
