import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:3000',
  headers: { 'Content-Type': 'application/json' },
});

// GET /livros  ou  GET /livros?genero=Valor
export const getLivros = (genero = '') => {
  const params = genero ? { genero } : {};
  return api.get('/livros', { params });
};

// POST /livros
export const criarLivro = (dados) => api.post('/livros', dados);

// PUT /livros/:id
export const atualizarLivro = (id, dados) => api.put(`/livros/${id}`, dados);

// DELETE /livros/:id
export const deletarLivro = (id) => api.delete(`/livros/${id}`);

export default api;
