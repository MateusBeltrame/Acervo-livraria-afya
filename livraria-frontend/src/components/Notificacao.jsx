export function ContainerNotificacao({ toasts }) {
  return (
    <div className="toast-container">
      {toasts.map(t => (
        <div key={t.id} className={`toast ${t.tipo}`}>
          {t.mensagem}
        </div>
      ))}
    </div>
  );
}
