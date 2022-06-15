// CÓDIGO DO SERVIDOR
// importa bibliotecas necessárias
const express = require('express');
const sqlite3 = require('sqlite3').verbose();
// cria servidor no endereço local e determina que a pasta frontend deve ser usada como source
const app = express();
const port = process.env.PORT||3000;
const bodyParser = require('body-parser');
const urlencodedParser = bodyParser.urlencoded({ extended: false });
app.use(express.static("../frontend/"));
app.use(express.json());
// caminho do banco de dados
const DBPATH = 'banco.db'
/* DEFINIÇÃO DOS ENDPOINTS */
// habilidades - checar os registros cadastrados na tabela habilidades;

app.get('/habilidades', (req, res) => {
    res.statusCode = 200;
    res.setHeader('Access-Control-Allow-Origin', '*');
    var db = new sqlite3.Database(DBPATH);
  var sql = 'SELECT * FROM habilidades ORDER BY id COLLATE NOCASE'; // ordena por name
    db.all(sql, [],  (err, rows ) => {
        if (err) {
            throw err;
        }
        res.json(rows);
    });
    db.close();
});
// habilidadeINSERT - inserir novos registros na tabela habilidades;
app.post('/habilidadeinsert', urlencodedParser, (req, res) => {
    res.statusCode = 200;
    res.setHeader('Access-Control-Allow-Origin', '*');
    // insere valores de nome e tipo segundo a request enviada pelo cliente
    sql = "INSERT INTO habilidades (id, descricao) VALUES ('" + req.body.id + "', '" + req.body.descricao + "')";
    var db = new sqlite3.Database(DBPATH);
    db.run(sql, [],  err => {
        if (err) {
            throw err;
        }
    });
    db.close();
    res.end();
});
app.post('/habilidadedelete', urlencodedParser, (req, res) => {
    res.statusCode = 200;
    res.setHeader('Access-Control-Allow-Origin', '*');
    // deleta segundo o id
    sql = "DELETE FROM habilidades WHERE id = " + req.body.id;
    var db = new sqlite3.Database(DBPATH);
    db.run(sql, [],  err => {
        if (err) {
            throw err;
        }
        res.end();
    });
    db.close();
});
app.post('/habilidadeupdate', urlencodedParser, (req, res) => {
    res.statusCode = 200;
    res.setHeader('Access-Control-Allow-Origin', '*');
    sql = "UPDATE habilidades SET descricao = '" + req.body.descricao + "' WHERE id = " + req.body.id;
    var db = new sqlite3.Database(DBPATH);
    db.run(sql, [],  err => {
        if (err) {
            throw err;
        }
        res.end();
    });
    db.close();
});
//Inicia o servidor! 
app.listen(port, () => {
  console.log(`Server running at ${port}/`);
});









