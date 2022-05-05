import path from "path";
import multer from "multer";
import fs from "fs";

const mediaOptions = {
  images: {
    maxSize: 2 * 1024 * 1024,
    types: ["image/png", "image/jpeg", "image/jpg"],
    maxCount: 4,
    maxCountOuverture: 40,
  },
  video: {
    maxSize: 200 * 1024 * 1024,
    types: ["video/mp4","video/avi", "video/x-m4v"],
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

//max 200mo
const  maxSize = 200 * 1024 * 1024;

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

  if (file.fieldname == "images" || file.fieldname == "imagesOuverture") {
    if (!mediaOptions.images.types.includes(file.mimetype)) {
      error.name = "ExtensionError";
      error.message =
        "Le format de l’image n’est pas accepté. Veuillez utiliser un autre format. Les images acceptées doivent être aux formats .PNG .JPG ou .SVG.";
    }
  } else if (file.fieldname == "video" || file.fieldname == "videoOuverture") {
    if (!mediaOptions.video.types.includes(file.mimetype)) {
      error.name = "ExtensionError";
      error.message =
        "Le format du fichier vidéo n’est pas accepté. Veuillez utiliser un autre format. Les musiques acceptées doivent être aux formats .MP4 ou .AVI.";
    }
  } else if (file.fieldname == "music" || file.fieldname == "musicOuverture") {
    if (!mediaOptions.music.types.includes(file.mimetype)) {
      error.name = "ExtensionError";
      error.message =
        "Le format de la musique n’est pas accepté. Veuillez utiliser un autre format. Les musiques acceptées doivent être aux formats .MP3 ou .WAV.";
    }
  } else {
    error.message = "Inconnue media";
  }

  if (!error.name) {
    cb(null, true);
  } else {
    const err = new Error(error.message);
    err.name = error.name;
    cb(err, false);
  }
};

var multi_upload = multer({
  storage: storage,
  fileFilter: fileFilter,
  limits: { fileSize: maxSize },
}).fields([
  {
    name: "images",
    maxCount: mediaOptions.images.maxCount,
  },
  {
    name: "imagesOuverture",
    maxCount: mediaOptions.images.maxCountOuverture,
  },
  {
    name: "video",
    maxCount: mediaOptions.video.maxCount,
  },
  {
    name: "videoOuverture",
    maxCount: mediaOptions.video.maxCountOuverture,
  },
  {
    name: "music",
    maxCount: mediaOptions.music.maxCount,
  },
  {
    name: "musicOuverture",
    maxCount: mediaOptions.music.maxCountOuverture,
  },
]);

export function uploadMedia(req, res, next) {
  multi_upload(req, res, function (err) {
    if (err instanceof multer.MulterError) {
      console.log(err);
      const msg =
        error.code == "LIMIT_FILE_SIZE"
          ? "La taille du fichier est trop grande. La taille de fichier autorisée est 100mo"
          :`multer uploading error: ${err.message}` ;

      res
        .status(500)
        .send({
          error: { msg },
        })
        .end();
      return;
    } else if (err) {
      if (err.name == "ExtensionError" || err.name == "CountError") {
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
    } else {
      const error = { name: "", message: "" };

      for (let key in req.files) {
        req.files[key].forEach((file) => {
          if (
            file.fieldname == "images" ||
            file.fieldname == "imagesOuverture"
          ) {
            if (file.size > mediaOptions.images.maxSize) {
              error.name = "SizeError";
              error.message =
                "Le fichier est trop lourd. Veuillez importer une image au poids inférieur à 2 Mo.";
            }
          } else if (
            file.fieldname == "video" ||
            file.fieldname == "videoOuverture"
          ) {
            if (file.size > mediaOptions.video.maxSize) {
              error.name = "SizeError";
              error.message =
                "Le fichier est trop lourd. Veuillez importer une vidéo au poids inférieur à 200 Mo.";
            }
          } else if (
            file.fieldname == "music" ||
            file.fieldname == "musicOuverture"
          ) {
            if (file.size > mediaOptions.music.maxSize) {
              error.name = "SizeError";
              error.message =
                "Le fichier est trop lourd. Veuillez importer une musique au poids inférieur à 100 Mo.";
            }
          }
        });
      }

      if (error.name == "SizeError") {
        for (let key in req.files) {
          req.files[key].forEach((file) => {
            try {
              fs.unlinkSync(file.path);
            } catch (err) {
              console.error(err);
            }
          });
        }

        res
          .status(413)
          .send({ error: { msg: error.message } })
          .end();
        return;
      }
    }
    res.files = req.files;
    next();
  });
}
