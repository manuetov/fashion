const connection = require("../config/db");

class productController {
  //Muestra el formulario de introducir un nuevo producto asociado a un vendedor.
  showFormProduct = (req, res) => {
    let vendor_id = req.params.vendor_id;
    res.render("createProduct", { vendor_id }); //pasa como objeto la id del vendedor.
  };

  //Guarda en la ddbb un nuevo producto
  createProduct = (req, res) => {
    let vendor_id = req.params.vendor_id;
    let { name, description, price } = req.body;
    let img = req.file.filename;
    let sql = `INSERT INTO product (name, description, price, img, vendor_id)
     VALUES ( '${name}', '${description}', ${price}, '${img}', ${vendor_id})`;
    connection.query(sql, (error, result) => {
      if (error) throw error;
      res.redirect(`/vendors/oneVendor/${vendor_id}`);
    });
  };

  // Muestra el formulario para editar un producto
  showEditFormProduct = (req, res) => {
    let product_id = req.params.product_id;
    let sql = `SELECT * FROM product WHERE product_id = ${product_id}`;

    connection.query(sql, (error, result) => {
      if (error) throw error;
      res.render("updateproductForm", { result });
    });
  };

  // Edita un producto
  updateProduct = (req, res) => {
    let { product_id, vendor_id } = req.params;
    let { name, description, price } = req.body;
    // let img = req.file.filename;

    let sql = `UPDATE product SET name = '${name}', price = ${price},`;

    if (req.file != undefined) {
      let img = req.file.filename;
      sql += `img = '${img}', `;
    }

    if (description != "") {
      sql += `description = '${description}',`;
    }
    sql = sql.substring(0, sql.length - 1); // quita la última coma
    sql += ` WHERE product_id = ${product_id} `;
    console.log(sql);
    connection.query(sql, (error, result) => {
      if (error) throw error;
      res.redirect(`/vendors/oneVendor/${vendor_id}`);
    });
  };

  // Elimina un producto
  deleteProduct = (req, res) => {
    let { product_id, vendor_id } = req.params;

    let sql = `DELETE FROM product WHERE product_id = ${product_id}`;
    connection.query(sql, (error, result) => {
      if (error) throw error;
      res.redirect(`/vendors/oneVendor/${vendor_id}`);
    });
  };
}

module.exports = new productController();
