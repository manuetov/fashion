const connection = require('../config/db');

class IndexController {

    // Renderiza la vista index

    goToIndex =  function(req, res, next) {
        res.render('index', { title: 'Express' });
      };
}


module.exports = new IndexController();