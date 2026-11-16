export function AccessDenied() {
  return (
    <div className="rounded-lg border border-red-200 bg-red-50 p-6 text-red-800">
      <h1 className="text-xl font-bold">Acesso negado</h1>
      <p>Seu perfil não tem permissão para ver esta tela. Troque o perfil no menu lateral.</p>
    </div>
  );
}
