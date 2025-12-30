// config.js - Configuración de Supabase
const SUPABASE_CONFIG = {
  url: 'https://vkthaoiurwuzuztpvuyl.supabase.co', // Ej: https://xxxxx.supabase.co
  anonKey: 'sb_publishable_B3sNAnwrbsAZHZeCTQhzjw_kONnukgc' // La clave pública larga
};

// Inicializar cliente Supabase
const supabase = window.supabase.createClient(
  SUPABASE_CONFIG.url,
  SUPABASE_CONFIG.anonKey
);