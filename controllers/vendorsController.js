const connection = require("../config/db");
const sha1 = require("sha1");

class VendorsController {

  //   Trae todos los vendedors de la tabla vendor
  selectAllVendors = (req, res) => {
    let sqlVendor = `SELECT * FROM vendor`;
    let sqlProduct = `SELECT * FROM product`;
    connection.query(sqlVendor, (error, resultVendor) => {
      if (error) throw error;
      connection.query(sqlProduct, (error, resultProduct) => {
        if (error) throw error;
        res.render("allVendors", { resultVendor, resultProduct });
      });
    });
  };

  // Trae la información de un vendedor y todas sus productos
  selectOneVendor = (req, res) => {
    let vendor_id = req.params.vendor_id;
    let sqlVendor = `SELECT * FROM vendor WHERE vendor_id = ${vendor_id}`;
    let sqlProduct = `SELECT * FROM product WHERE vendor_id = ${vendor_id}`;
    connection.query(sqlVendor, (error, resultVendor) => {
      if (error) throw error;
      connection.query(sqlProduct, (error, resultProduct) => {
        if (error) throw error;
        res.render("oneVendor", { resultVendor, resultProduct });
      });
    });
  };

  //Renderiza la vista del formulario de crear vendedor
  viewFormVendor = (req, res) => {
    res.render("createVendor");
  };

  //Guarda un nuevo vendedor
  createVendor = (req, res) => {
    let { name, surname, email, password, phone, description } = req.body;
    let avatar = req.file.filename;
    let encrypted_password = sha1(password);
    let sql = `INSERT INTO vendor (name, surname, email, password, phone,
     description, avatar) VALUES ('${name}', '${surname}', '${email}', 
     '${encrypted_password}', '${phone}', '${description}','${avatar}')`;
    connection.query(sql, (error, result) => {
      if (error) throw error;
      console.log(result);
      let vendor_id = result.insertId;
      res.redirect(`/vendor/oneVendor/${vendor_id}`);
    });
  };

  //Elimina un vendedor
  deleteVendor = (req, res) => {
    let vendor_id = req.params.vendor_id;
    let sql = `DELETE FROM vendor WHERE vendor_id = ${vendor_id}`;
    connection.query(sql, (error, result) => {
      if (error) throw error;
      res.redirect("/vendor");
    });
  };

  //Muestra el formulario de edición de vendedor
  showUpdateVendorForm = (req, res) => {
    let vendor_id = req.params.vendor_id;
    let sql = `SELECT * FROM vendor WHERE vendor_id = ${vendor_id}`;
    connection.query(sql, (error, result) => {
      if (error) throw error;
      res.render("updateVendorForm", { result });
    });
  };

  //Modifica un vendedor
  updateVendor = (req, res) => {
    let vendor_id = req.params.vendor_id;
    let { name, surname, email, password } = req.body;
    let avatar = req.file.filename;
    let encrypted_password = sha1(password);
    let sql = `UPDATE vendor SET name = '${name}',surname = '${surname}', 
    email = '${email}',password = '${encrypted_password}',avatar = '${avatar}' 
    WHERE vendor_id = '${vendor_id}' `;
    connection.query(sql, (error, result) => {
      if (error) throw error;
      res.redirect(`/vendor/oneVendor/${vendor_id}`);
    });
  };

  // Muestra el formulario de logueo
  showLoginForm = (req, res) => {
    res.render("login", { message: " " });
  };

  // login
  login = (req, res) => {
    let { email, password } = req.body;
    let encrypted_password = sha1(password);
    let sql = `SELECT * FROM vendor WHERE email = '${email}'`;
    connection.query(sql, (error, result) => {
      if (error) throw error;
      if (result.length == 0) {
        res.render("login", {
          message: "email incorrecto o vendedor no registrado",
        });
      } else if (result.length === 1) {
        if (encrypted_password != result[0].password) {
          res.render("login", { message: "contraseña incorrecta" });
        } else {
          let vendor_id = result[0].vendor_id;
          res.redirect(`/vendor/oneVendor/${vendor_id}`);
        }
      }
    });
  };
}

module.exports = new VendorsController();