// public/login.js
import { supabase } from './config.js';

// Verificar si ya hay sesión activa
async function checkSession() {
  try {
    const { data: { session }, error } = await supabase.auth.getSession();
    
    if (error) {
      console.error('Error verificando sesión:', error);
      return;
    }
    
    if (session) {
      console.log('✅ Sesión activa detectada, redirigiendo...');
      window.location.href = '/dashboard.html';
    }
  } catch (error) {
    console.error('Error en checkSession:', error);
  }
}

// Manejar el formulario de login
async function handleLogin(e) {
  e.preventDefault();
  
  const email = document.getElementById('email').value;
  const password = document.getElementById('password').value;
  const errorDiv = document.getElementById('errorMessage');
  const submitButton = e.target.querySelector('button[type="submit"]');
  
  // Limpiar errores previos
  errorDiv.textContent = '';
  
  // Deshabilitar botón mientras procesa
  submitButton.disabled = true;
  submitButton.textContent = 'Iniciando sesión...';
  
  try {
    const { data, error } = await supabase.auth.signInWithPassword({
      email: email,
      password: password
    });
    
    if (error) throw error;
    
    console.log('✅ Usuario autenticado:', data.user.email);
    
    // Login exitoso
    window.location.href = '/dashboard.html';
    
  } catch (error) {
    console.error('❌ Error en login:', error);
    
    // Mostrar mensaje de error amigable
    let errorMessage = 'Error al iniciar sesión';
    
    if (error.message.includes('Invalid login credentials')) {
      errorMessage = 'Correo o contraseña incorrectos';
    } else if (error.message.includes('Email not confirmed')) {
      errorMessage = 'Por favor confirma tu correo electrónico';
    } else {
      errorMessage = error.message;
    }
    
    errorDiv.textContent = errorMessage;
    
    // Rehabilitar botón
    submitButton.disabled = false;
    submitButton.textContent = 'Iniciar Sesión';
  }
}

// Inicializar cuando el DOM esté listo
function init() {
  // Verificar sesión existente
  checkSession();
  
  // Configurar formulario
  const loginForm = document.getElementById('loginForm');
  
  if (!loginForm) {
    console.error('❌ Formulario de login no encontrado');
    return;
  }
  
  loginForm.addEventListener('submit', handleLogin);
  
  console.log('✅ Login inicializado correctamente');
}

// Ejecutar init cuando el DOM esté listo
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', init);
} else {
  init();
}