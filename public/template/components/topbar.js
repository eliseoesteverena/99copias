import { el } from '../../mount.js';
import { renderSearchBar } from './search-bar.js';
import { renderUserDropdown } from './user-dropdown.js';

export function renderTopBar(config, state, auth) {
  const topbar = el('header.topbar', {
    id: 'topbar'
  }, [
    // Left section
    el('div.topbar-left', {}, [
      // Hamburger button
      el('button.topbar-hamburger', {
        'aria-label': 'Toggle menu',
        onclick: () => state.toggleSidebar()
      }, [
        el('span', { style: { fontSize: '1.5rem' } }, '☰')
      ]),
      
      // Page title
      el('h1.topbar-title', {}, config.title.text)
    ]),
    
    // Right section
    el('div.topbar-right', {}, [
      // Search bar
      config.search.enabled ? renderSearchBar(config.search, state) : null,
      
      // Notifications (visual only)
      config.notifications.enabled ? el('button', {
        'aria-label': 'Notificaciones',
        class: 'relative p-2 hover:bg-gray-100 rounded',
        onclick: config.notifications.onClick || (() => {
          alert('Funcionalidad de notificaciones próximamente');
        })
      }, [
        el('span', { style: { fontSize: '1.25rem' } }, '🔔'),
        config.notifications.badge > 0 ? el('span', {
          class: 'absolute top-1 right-1 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center',
          style: {
            fontSize: '0.625rem',
            minWidth: '20px',
            height: '20px',
            padding: '0 4px'
          }
        }, config.notifications.badge.toString()) : null
      ].filter(Boolean)) : null,
      
      // User dropdown
      config.user ? renderUserDropdown(config.user, state, auth) : null
    ].filter(Boolean))
  ]);
  
  return topbar;
}
