import { useState } from 'react';

export function CartaoLivro({ livro, onDelete, onUpdate }) {
  const [editando, setEditando] = useState(false);
  const [form, setForm] = useState({
    titulo: livro.titulo,
    autor: livro.autor,
    ano: livro.ano,
    genero: livro.genero,
  });
  const [salvando, setSalvando] = useState(false);

  const handle = (e) => setForm(f => ({ ...f, [e.target.name]: e.target.value }));

  const salvar = async () => {
    setSalvando(true);
    await onUpdate(livro.id, form);
    setSalvando(false);
    setEditando(false);
  };

  const cancelar = () => {
    setForm({ titulo: livro.titulo, autor: livro.autor, ano: livro.ano, genero: livro.genero });
    setEditando(false);
  };

  return (
    <div className={`book-card ${editando ? 'editing' : ''}`}>
      <div>
        {editando ? (
          <div className="inline-edit">
            <div className="form-group">
              <label className="form-label">Título</label>
              <input className="form-input" name="titulo" value={form.titulo} onChange={handle} />
            </div>
            <div className="form-group">
              <label className="form-label">Autor</label>
              <input className="form-input" name="autor" value={form.autor} onChange={handle} />
            </div>
            <div className="form-group">
              <label className="form-label">Ano</label>
              <input className="form-input" name="ano" type="number" value={form.ano} onChange={handle} />
            </div>
            <div className="form-group">
              <label className="form-label">Gênero</label>
              <input className="form-input" name="genero" value={form.genero} onChange={handle} />
            </div>
            <div className="inline-edit-actions">
              <button className="btn btn-primary" onClick={salvar} disabled={salvando}>
                {salvando ? '...' : '✓ Salvar'}
              </button>
              <button className="btn btn-cancel" onClick={cancelar}>Cancelar</button>
            </div>
          </div>
        ) : (
          <>
            <div className="book-title">{livro.titulo}</div>
            <div className="book-meta">
              <span className="book-meta-item">por&nbsp;<strong>{livro.autor}</strong></span>
              <span className="book-meta-item"><strong>{livro.ano}</strong></span>
            </div>
            <span className="book-genre">{livro.genero}</span>
          </>
        )}
      </div>

      {!editando && (
        <div className="book-actions">
          <button className="btn btn-ghost btn-edit" onClick={() => setEditando(true)}>✎ Editar</button>
          <button className="btn btn-ghost btn-delete" onClick={() => onDelete(livro.id)}>✕ Excluir</button>
        </div>
      )}
    </div>
  );
}
