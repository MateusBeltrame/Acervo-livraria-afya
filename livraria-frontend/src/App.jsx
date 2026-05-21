import { useState, useEffect } from 'react';
import { getLivros, criarLivro, atualizarLivro, deletarLivro } from './services/api';

const LS_KEY = 'livraria_filtro_genero';

export default function App() {
  const [livros, setLivros] = useState([]);
  const [carregando, setCarregando] = useState(true);

  // Estado do formulário de cadastro
  const [titulo, setTitulo] = useState('');
  const [autor, setAutor] = useState('');
  const [ano, setAno] = useState('');
  const [genero, setGenero] = useState('');

  // Estado do filtro — recupera do localStorage ao iniciar
  const [filtroGenero, setFiltroGenero] = useState(
    () => localStorage.getItem(LS_KEY) || ''
  );

  // Estado de edição
  const [editandoId, setEditandoId] = useState(null);
  const [editTitulo, setEditTitulo] = useState('');
  const [editAutor, setEditAutor] = useState('');
  const [editAno, setEditAno] = useState('');
  const [editGenero, setEditGenero] = useState('');

  // Busca livros na API
  async function buscarLivros(generoFiltro) {
    setCarregando(true);
    try {
      const { data } = await getLivros(generoFiltro);
      setLivros(data);
    } catch (err) {
      alert('Erro ao carregar livros. A API está rodando?');
    }
    setCarregando(false);
  }

  // Busca inicial usando o filtro salvo no localStorage
  useEffect(() => {
    buscarLivros(filtroGenero);
  }, []);

  // Salva o filtro no localStorage toda vez que ele muda
  useEffect(() => {
    localStorage.setItem(LS_KEY, filtroGenero);
  }, [filtroGenero]);

  // Cadastrar livro
  async function handleCadastrar(e) {
    e.preventDefault();
    if (!titulo || !autor || !ano || !genero) {
      alert('Preencha todos os campos!');
      return;
    }
    await criarLivro({ titulo, autor, ano, genero });
    setTitulo('');
    setAutor('');
    setAno('');
    setGenero('');
    buscarLivros(filtroGenero);
  }

  // Excluir livro
  async function handleExcluir(id) {
    if (!confirm('Deseja excluir este livro?')) return;
    await deletarLivro(id);
    buscarLivros(filtroGenero);
  }

  // Abrir edição
  function handleEditar(livro) {
    setEditandoId(livro.id);
    setEditTitulo(livro.titulo);
    setEditAutor(livro.autor);
    setEditAno(livro.ano);
    setEditGenero(livro.genero);
  }

  // Salvar edição
  async function handleSalvarEdicao(id) {
    await atualizarLivro(id, {
      titulo: editTitulo,
      autor: editAutor,
      ano: editAno,
      genero: editGenero,
    });
    setEditandoId(null);
    buscarLivros(filtroGenero);
  }

  return (
    <div>
      <h1>Gerenciamento de Livros</h1>

      {/* ── FORMULÁRIO DE CADASTRO ── */}
      <h2>Cadastrar Livro</h2>
      <form onSubmit={handleCadastrar}>
        <div className="form-group">
          <label>Título</label>
          <input value={titulo} onChange={e => setTitulo(e.target.value)} placeholder="Título do livro" />
        </div>
        <div className="form-group">
          <label>Autor</label>
          <input value={autor} onChange={e => setAutor(e.target.value)} placeholder="Nome do autor" />
        </div>
        <div className="form-group">
          <label>Ano</label>
          <input type="number" value={ano} onChange={e => setAno(e.target.value)} placeholder="Ex: 1984" />
        </div>
        <div className="form-group">
          <label>Gênero</label>
          <input value={genero} onChange={e => setGenero(e.target.value)} placeholder="Ex: Romance" />
        </div>
        <button type="submit">Adicionar Livro</button>
      </form>

      <hr />

      {/* ── FILTRO POR GÊNERO ── */}
      <h2>Lista de Livros</h2>
      <div className="filtro">
        <label>Filtrar por gênero:</label>
        <input
          value={filtroGenero}
          onChange={e => setFiltroGenero(e.target.value)}
          placeholder="Ex: Romance"
        />
        <button onClick={() => buscarLivros(filtroGenero)}>Buscar</button>
        <button className="btn-cancelar" onClick={() => { setFiltroGenero(''); buscarLivros(''); }}>
          Limpar
        </button>
      </div>

      {/* ── TABELA DE LIVROS ── */}
      {carregando ? (
        <p>Carregando...</p>
      ) : livros.length === 0 ? (
        <p className="vazio">Nenhum livro encontrado.</p>
      ) : (
        <table>
          <thead>
            <tr>
              <th>ID</th>
              <th>Título</th>
              <th>Autor</th>
              <th>Ano</th>
              <th>Gênero</th>
              <th>Ações</th>
            </tr>
          </thead>
          <tbody>
            {livros.map(livro => (
              <tr key={livro.id}>
                {editandoId === livro.id ? (
                  <>
                    <td>{livro.id}</td>
                    <td className="td-edit"><input value={editTitulo} onChange={e => setEditTitulo(e.target.value)} /></td>
                    <td className="td-edit"><input value={editAutor} onChange={e => setEditAutor(e.target.value)} /></td>
                    <td className="td-edit"><input value={editAno} onChange={e => setEditAno(e.target.value)} /></td>
                    <td className="td-edit"><input value={editGenero} onChange={e => setEditGenero(e.target.value)} /></td>
                    <td>
                      <button className="btn-salvar" onClick={() => handleSalvarEdicao(livro.id)}>Salvar</button>
                      <button className="btn-cancelar" onClick={() => setEditandoId(null)}>Cancelar</button>
                    </td>
                  </>
                ) : (
                  <>
                    <td>{livro.id}</td>
                    <td>{livro.titulo}</td>
                    <td>{livro.autor}</td>
                    <td>{livro.ano}</td>
                    <td>{livro.genero}</td>
                    <td>
                      <button onClick={() => handleEditar(livro)}>Editar</button>
                      <button className="btn-excluir" onClick={() => handleExcluir(livro.id)}>Excluir</button>
                    </td>
                  </>
                )}
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}
