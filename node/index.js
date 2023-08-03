const express = require('express');
const app = express();
const port = 3000
const config = {
    host: 'db',
    user: 'root',
    password: 'root',
    database: 'nodedb'
};

const mysql = require('mysql')
const connection = mysql.createConnection(config)

const sqlIns = `INSERT INTO people(name) VALUES ('Miguel Vedovato')`
connection.query(sqlIns)

app.get('/', (req, res) => {
    const sqlSel = `SELECT name FROM people`;

    connection.query(sqlSel, (error, results) => {
        if (error) {
            console.error('Erro ao executar a Query:', error);
            res.status(500).send('Erro ao buscar nomes!');
        } else {
            const response = `<h1>Full Cycle Rocks!</h1>` + results.map(person => person.name).join('<br>');
            res.send(response);
            }
    });
});

app.listen(port, () => {
    console.log('Rodando na Porta ' + port)
})