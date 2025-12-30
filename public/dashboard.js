// dashboard.js - Página protegida

// Proteger la página
async function protectPage() {
  const { data: { session } } = await supabase.auth.getSession();
  
  if (!session) {
    // No hay sesión, redirigir a login
    window.location.href = '/index.html';
    return;
  }
  
  // Mostrar información del usuario
  document.getElementById('userEmail').textContent = session.user.email;
  document.getElementById('userId').textContent = session.user.id;
}

// Ejecutar protección al cargar
protectPage();

// Manejar logout
document.getElementById('logoutBtn').addEventListener('click', async () => {
  const { error } = await supabase.auth.signOut();
  
  if (error) {
    console.error('Error al cerrar sesión:', error);
    alert('Error al cerrar sesión');
  } else {
    window.location.href = '/index.html';
  }
});