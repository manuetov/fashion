const connection = require("../config/db");
const sha1 = require("sha1");

class vendorsController {



   //   Trae todos los vendedores de la tabla vendor
   selectAllVendors = (req, res) => {
    let sql = `SELECT * FROM vendor`;
    let sql2 = `SELECT * FROM product`;
    connection.query(sql, (error, resultVendor) => {
      if (error) throw error;
      connection.query(sql2, (error, resultProduct) => {
        if (error) throw error;
        res.render("allVendors", { resultVendor, resultProduct });
      });
    });
  };

  //   Trae todos los vendedores de la tabla vendor
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
  }
}





  // // Trae la información de un usuario y todas sus mascotas
  // selectOneUser = (req, res) => {
  //   let user_id = req.params.user_id;
  //   let sqlUser = `SELECT * FROM user WHERE user_id = ${user_id}`;
  //   let sqlPet = `SELECT * FROM pet WHERE user_id = ${user_id}`;
  //   connection.query(sqlUser, (error, resultUser) => {
  //     if (error) throw error;
  //     connection.query(sqlPet, (error, resultPet) => {
  //       if (error) throw error;
  //       res.render("oneUser", { resultUser, resultPet });
  //     });
  //   });
  // };

module.exports = new vendorsController();