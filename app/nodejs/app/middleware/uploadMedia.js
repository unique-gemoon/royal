import path from "path";
import multer from "multer";

const mediaOptions = {
  images: {
    maxSize: 2 * 1024 * 1024,
    types: ["image/png", "image/jpeg", "image/jpg"],
    maxCount: 4,
    maxCountOuverture: 40,
  },
  video: {
    maxSize: 200 * 1024 * 1024,
    types: ["video/mp4", "video/x-m4v"],
    maxCount: 1,
    maxCountOuverture: 10,
  },
  music: {
    maxSize: 100 * 1024 * 1024,
    types: ["audio/mpeg"],
    maxCount: 1,
    maxCountOuverture: 10,
  },
};

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "public/uploads/media/");
  },
  filename: function (req, file, cb) {
    const name =
      req.user.id + "_" + Date.now() + path.extname(file.originalname);
    cb(null, name);
  },
});

const fileFilter = (req, file, cb) => {
  const error = { name: "", message: "" };
  const fileSize = parseInt(req.headers["content-length"]);

  if(file.fieldname=="images" || file.fieldname=="imagesOuverture"){
    if (mediaOptions.images.types.includes(file.mimetype)) {
      if (fileSize > mediaOptions.images.maxSize) {
        error.name = "SizeError";
        error.message =
          "Le fichier est trop lourd. Veuillez importer une image au poids inférieur à 2 Mo.";
      }
    }else{
      error.name = "ExtensionError";
        error.message =
          "Le format de l’image n’est pas accepté. Veuillez utiliser un autre format. Les images acceptées doivent être aux formats .PNG .JPG ou .SVG.";
    }
  }else if(file.fieldname=="video" || file.fieldname=="videoOuverture"){
    if (mediaOptions.video.types.includes(file.mimetype)) {
      if (fileSize > mediaOptions.video.maxSize) {
        error.name = "SizeError";
        error.message =
          "Le fichier est trop lourd. Veuillez importer une vidéo au poids inférieur à 200 Mo.";
      }
    }else{
        error.name = "ExtensionError";
        error.message =
          "Le format du fichier vidéo n’est pas accepté. Veuillez utiliser un autre format. Les musiques acceptées doivent être aux formats .MP4 ou .AVI.";
      }
  }else if(file.fieldname=="music"  || file.fieldname=="musicOuverture"){
    if (mediaOptions.music.types.includes(file.mimetype)) {
      if (fileSize > mediaOptions.music.maxSize) {
        error.name = "SizeError";
        error.message =
          "Le fichier est trop lourd. Veuillez importer une musique au poids inférieur à 100 Mo.";
      }
    } else{
      error.name = "ExtensionError";
        error.message =
          "Le format de la musique n’est pas accepté. Veuillez utiliser un autre format. Les musiques acceptées doivent être aux formats .MP3 ou .WAV.";
    }
  }else {
    error.message = "Inconnue media" ;
  }

  if (!error.name) {
    cb(null, true);
  } else {
    const err = new Error(error.message);
    err.name = error.name;
    cb(null, false);
    return cb(err);
  }
};

var multi_upload = multer({
  storage: storage,
  fileFilter: fileFilter
}).fields([{
  name: 'images', maxCount: mediaOptions.images.maxCount
},{
  name: 'imagesOuverture', maxCount: mediaOptions.images.maxCountOuverture
}, {
  name: 'video', maxCount: mediaOptions.video.maxCount
},{
  name: 'videoOuverture', maxCount: mediaOptions.video.maxCountOuverture
}, {
  name: 'music', maxCount: mediaOptions.music.maxCount
},{
  name: 'musicOuverture', maxCount: mediaOptions.music.maxCountOuverture
}]);

export function uploadMedia(req, res, next) {
  multi_upload(req, res, function (err) {
    console.log(req.files);
    console.log(err);
    //multer error
    if (err instanceof multer.MulterError) {
      console.log(err);
      res
        .status(500)
        .send({
          error: { msg: `multer uploading error: ${err.message}` },
        })
        .end();
      return;
    } else if (err) {
      //unknown error
      if (err.name == "ExtensionError" || err.name == "SizeError" || err.name == "CountError") {
        res
          .status(413)
          .send({ error: { msg: `${err.message}` } })
          .end();
      } else {
        res
          .status(500)
          .send({ error: { msg: `unknown uploading error: ${err.message}` } })
          .end();
      }
      return;
    }
    res.files = req.files;
    next();
  });
}
