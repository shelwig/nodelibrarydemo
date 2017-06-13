var express = require('express');
var bookRouter = express.Router();
var sql = require('mssql');

var router = function(nav) {
    bookRouter.route('/')
        .get(function (req, res) {
            var request = new sql.Request();

            request.query('select * from books',
                function (err, sqlresponse) {
                        res.render('bookListView', {
                            title: 'Books',
                            nav: nav,
                            books: sqlresponse.recordset
                        });
                    });
        });

    bookRouter.route('/:id')
        .all(function (req, res, next) {
            var request = new sql.Request();
            var id = req.params.id;
            var ps = new sql.PreparedStatement();
            ps.input('id', sql.Int);
            ps.prepare('select * from books where Id= @id',
                function(err) {
                    ps.execute({id:req.params.id},
                        function(err, sqlresponse) {
                            if (sqlresponse.recordset.length === 0) {
                                res.status(404).send('Not Found');
                            } else {
                                req.book = sqlresponse.recordset[0];
                                next();
                            }
                        });
                });
        })
        .get(function (req, res) {
            res.render('bookView', {
                title: 'Books',
                nav: nav,
                book: req.book
            });
        });

    return bookRouter;
};

module.exports = router;