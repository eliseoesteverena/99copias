// config.js - Configuración de Supabase
const SUPABASE_CONFIG = {
  url: 'https://vkthaoiurwuzuztpvuyl.supabase.co', // Ej: https://xxxxx.supabase.co
  anonKey: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InZrdGhhb2l1cnd1enV6dHB2dXlsIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjcwODM3MDksImV4cCI6MjA4MjY1OTcwOX0.GfQWCwW4I_PeHijgafPhBmBAlS2lqT8aw9UaIY8TdXY' // La clave pública larga
};

// Inicializar cliente Supabase
const supabase = window.supabase.createClient(
  SUPABASE_CONFIG.url,
  SUPABASE_CONFIG.anonKey
);

console.log(supabase);