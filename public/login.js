// login.js - Lógica de autenticación

// Verificar si ya hay sesión activa
async function checkSession() {
  const { data: { session } } = await supabase.auth.getSession();
  
  if (session) {
    // Ya está logueado, redirigir
    window.location.href = '/dashboard.html';
  }
}

// Ejecutar al cargar la página
checkSession();

// Manejar el formulario de login
document.getElementById('loginForm').addEventListener('submit', async (e) => {
  e.preventDefault();
  
  const email = document.getElementById('email').value;
  const password = document.getElementById('password').value;
  const errorDiv = document.getElementById('errorMessage');
  
  // Limpiar errores previos
  errorDiv.textContent = '';
  
  try {
    const { data, error } = await supabase.auth.signInWithPassword({
      email: email,
      password: password
    });
    
    if (error) throw error;
    
    // Login exitoso
    console.log('Usuario autenticado:', data.user);
    window.location.href = '/dashboard.html';
    
  } catch (error) {
    console.error('Error en login:', error);
    errorDiv.textContent = error.message;
  }
});