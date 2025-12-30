// register.js - Lógica de registro

document.getElementById('registerForm').addEventListener('submit', async (e) => {
  e.preventDefault();
  
  const email = document.getElementById('email').value;
  const password = document.getElementById('password').value;
  const confirmPassword = document.getElementById('confirmPassword').value;
  const errorDiv = document.getElementById('errorMessage');
  const successDiv = document.getElementById('successMessage');
  
  // Limpiar mensajes
  errorDiv.textContent = '';
  successDiv.textContent = '';
  
  // Validación de contraseñas
  if (password !== confirmPassword) {
    errorDiv.textContent = 'Las contraseñas no coinciden';
    return;
  }
  
  try {
    const { data, error } = await supabase.auth.signUp({
      email: email,
      password: password
    });
    
    if (error) throw error;
    
    // Registro exitoso
    successDiv.textContent = '¡Cuenta creada! Verifica tu email antes de iniciar sesión.';
    
    // Limpiar formulario
    document.getElementById('registerForm').reset();
    
    // Redirigir después de 3 segundos
    setTimeout(() => {
      window.location.href = '/index.html';
    }, 3000);
    
  } catch (error) {
    console.error('Error en registro:', error);
    errorDiv.textContent = error.message;
  }
});