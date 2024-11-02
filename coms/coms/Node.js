// server.js
const express = require('express');
const fs = require('fs');
const app = express();
const PORT = 3000;

app.use(express.json());
app.use(express.static('public')); // pour servir les fichiers HTML, CSS, JS

// Lire les commentaires
app.get('/comments', (req, res) => {
    fs.readFile('comments.json', 'utf8', (err, data) => {
        if (err) {
            return res.status(500).send('Erreur de lecture du fichier');
        }
        res.send(JSON.parse(data));
    });
});

// Ajouter un commentaire
app.post('/comments', (req, res) => {
    const newComment = req.body;
    fs.readFile('comments.json', 'utf8', (err, data) => {
        if (err) {
            return res.status(500).send('Erreur de lecture du fichier');
        }
        const comments = JSON.parse(data);
        comments.push(newComment);
        fs.writeFile('comments.json', JSON.stringify(comments), (err) => {
            if (err) {
                return res.status(500).send('Erreur d\'écriture dans le fichier');
            }
            res.status(201).send(newComment);
        });
    });
});

app.listen(PORT, () => {
    console.log(`Serveur en cours d'exécution sur http://localhost:${PORT}`);
});
