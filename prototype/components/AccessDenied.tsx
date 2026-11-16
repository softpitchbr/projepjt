export function AccessDenied() {
  return (
    <div className="hud p-6">
      <h1 className="font-mono text-xl font-bold text-accent-light">ACESSO NEGADO</h1>
      <p className="mt-1 text-muted">Seu perfil não tem permissão para ver esta tela. Troque o perfil no menu lateral.</p>
    </div>
  );
}
