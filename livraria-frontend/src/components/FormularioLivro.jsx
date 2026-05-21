import { useState } from 'react';

const VAZIO = { titulo: '', autor: '', ano: '', genero: '' };

export function FormularioLivro({ onSubmit, carregando }) {
  const [form, setForm] = useState(VAZIO);

  const handle = (e) => setForm(f => ({ ...f, [e.target.name]: e.target.value }));

  const submit = async (e) => {
    e.preventDefault();
    if (!form.titulo || !form.autor || !form.ano || !form.genero) return;
    await onSubmit(form);
    setForm(VAZIO);
  };

  return (
    <div>
      <div className="form-group">
        <label className="form-label">Título</label>
        <input className="form-input" name="titulo" value={form.titulo} onChange={handle} placeholder="Nome do livro" />
      </div>
      <div className="form-group">
        <label className="form-label">Autor</label>
        <input className="form-input" name="autor" value={form.autor} onChange={handle} placeholder="Nome do autor" />
      </div>
      <div className="form-group">
        <label className="form-label">Ano</label>
        <input className="form-input" name="ano" type="number" value={form.ano} onChange={handle} placeholder="Ex: 1984" />
      </div>
      <div className="form-group">
        <label className="form-label">Gênero</label>
        <input className="form-input" name="genero" value={form.genero} onChange={handle} placeholder="Ex: Romance, Terror..." />
      </div>
      <button className="btn btn-primary" onClick={submit} disabled={carregando}>
        {carregando ? '...' : '＋ Adicionar Livro'}
      </button>
    </div>
  );
}
