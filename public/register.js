// register.js - Lógica de registro

document.addEventListener('DOMContentLoaded', function() {
  
  var registerForm = document.getElementById('registerForm');
  
  if (!registerForm) {
    console.error('❌ Formulario de registro no encontrado');
    return;
  }
  
  registerForm.addEventListener('submit', async function(e) {
    e.preventDefault();
    
    var email = document.getElementById('email').value;
    var password = document.getElementById('password').value;
    var confirmPassword = document.getElementById('confirmPassword').value;
    var errorDiv = document.getElementById('errorMessage');
    var successDiv = document.getElementById('successMessage');
    
    // Limpiar mensajes
    errorDiv.textContent = '';
    successDiv.textContent = '';
    
    // Verificar que supabase existe
    if (typeof supabase === 'undefined' || !supabase) {
      errorDiv.textContent = 'Error: Configuración no cargada. Recarga la página.';
      console.error('❌ supabase no está definido');
      return;
    }
    
    // Validación de contraseñas
    if (password !== confirmPassword) {
      errorDiv.textContent = 'Las contraseñas no coinciden';
      return;
    }
    
    try {
      console.log('🔄 Intentando registrar:', email);
      
      var result = await supabase.auth.signUp({
        email: email,
        password: password
      });
      
      if (result.error) {
        throw result.error;
      }
      
      console.log('✅ Registro exitoso:', result.data);
      successDiv.textContent = '¡Cuenta creada! Redirigiendo al login...';
      
      // Limpiar formulario
      registerForm.reset();
      
      // Redirigir después de 2 segundos
      setTimeout(function() {
        window.location.href = '/index.html';
      }, 2000);
      
    } catch (error) {
      console.error('❌ Error en registro:', error);
      errorDiv.textContent = error.message || 'Error al crear la cuenta';
    }
  });
});