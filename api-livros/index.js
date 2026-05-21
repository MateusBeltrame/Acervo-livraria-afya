const express = require('express');
const app = express();

const cors = require('cors');
app.use(cors());

app.use(express.json());

let livros = [];
let idAtual = 1;

const PORT = 3000;

//Faz a requisição get lebraar de colocar /livros dps da porta 3000 na url 
app.get('/livros', (req, res) => {
  res.json(livros);
});

app.post('/livros', (req, res) => {
  const { titulo, autor, ano, genero } = req.body;

  const novoLivro = {
    id: idAtual++,
    titulo,
    autor,
    ano,
    genero
  };

  livros.push(novoLivro);

  res.status(201).json(novoLivro);
});

app.get('/livros/:id', (req, res) => {
  const id = parseInt(req.params.id);

  const livro = livros.find(l => l.id === id);

  if (!livro) {
    return res.status(404).json({ mensagem: 'Livro não encontrado' });
  }

  res.json(livro);
});

app.put('/livros/:id', (req, res) => {
  const id = parseInt(req.params.id);
  const { titulo, autor, ano, genero } = req.body;

  const index = livros.findIndex(l => l.id === id);

  if (index === -1) {
    return res.status(404).json({ mensagem: 'Livro não encontrado' });
  }

  livros[index] = { id, titulo, autor, ano, genero };

  res.json(livros[index]);
});

app.patch('/livros/:id', (req, res) => {
  const id = parseInt(req.params.id);
  const { titulo, genero } = req.body;

  const livro = livros.find(l => l.id === id);

  if (!livro) {
    return res.status(404).json({ mensagem: 'Livro não encontrado' });
  }

  if (titulo) livro.titulo = titulo;
  if (genero) livro.genero = genero;

  res.json(livro);
});

app.delete('/livros/:id', (req, res) => {
  const id = parseInt(req.params.id);

  const index = livros.findIndex(l => l.id === id);

  if (index === -1) {
    return res.status(404).json({ mensagem: 'Livro não encontrado' });
  }

  livros.splice(index, 1);

  res.status(204).send();
});

app.listen(PORT, () => {
  console.log(`Servidor rodando em http://localhost:${PORT}`);
});