const multer = require("multer");

// Configuaracion de multer
function uploadImage(a){
  const storage = multer.diskStorage({
      destination: `./public/images/${a}`, //modificamos la ruta
      //donde queremos que nos guarde las imagenes...archivos.//..etc
  
      filename: function (req, file, callback) {
          console.log(file);
          // let extension = file.originalname.split(".")[1];
        callback(null, "Id-" + Date.now() + "-" + file.originalname);
      }
    });
  
    const upload = multer({ storage: storage }).single("img");//img es el name de los imputs type="file"
    return upload;
};

module.exports = uploadImage;

// const multer = require("multer");

// function uploadImage(a) {
//   const storage = multer.diskStorage({
//     destination: `./public/images/${a}`,
//     filename: function (req, file, cb) {
//       console.log(file);
//       let extension = file.originalname.split(".")[1];
//       console.log(extension);
//       cb(null, Date.now() + "." + extension);
//     },
//   });

//   //
//   const upload = multer({ storage: storage }).single("imagen"); //img es el name de los inputs type="file"
//   return upload;
// }

// module.exports = uploadImage;