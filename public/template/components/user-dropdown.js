import { el } from '../../mount.js';

export function renderUserDropdown(userConfig, state, auth) {
  let dropdownOpen = false;
  
  const userContainer = el('div.topbar-user', {});
  
  // User trigger (avatar + name)
  const userData = auth.getUserData();
  
  const userTrigger = el('div.user-trigger', {
    onclick: (e) => {
      e.stopPropagation();
      dropdownOpen = !dropdownOpen;
      updateDropdown();
    }
  }, [
    el('img.user-avatar', {
      src: userData.avatar,
      alt: userData.name,
      onerror: (e) => {
        // Fallback si la imagen falla
        e.target.src = `https://ui-avatars.com/api/?name=${encodeURIComponent(userData.name)}&background=064e3b&color=fff`;
      }
    }),
    el('span', {
      style: {
        fontSize: '0.875rem',
        display: window.innerWidth < 640 ? 'none' : 'block'
      }
    }, userData.name)
  ]);
  
  // Dropdown menu
  const dropdown = el('div.user-dropdown', {
    id: 'user-dropdown'
  }, userConfig.dropdown.map(item => {
    if (item.type === 'divider') {
      return el('div.user-dropdown-divider');
    }
    
    return el('a.user-dropdown-item', {
      href: item.href || '#',
      class: item.variant === 'danger' ? 'user-dropdown-item--danger' : '',
      onclick: (e) => {
        if (item.action === 'logout') {
          e.preventDefault();
          handleLogout();
        } else if (item.href === '#') {
          e.preventDefault();
        }
        dropdownOpen = false;
        updateDropdown();
      }
    }, [
      el('span', {}, item.icon),
      el('span', {}, item.label)
    ]);
  }));
  
  function updateDropdown() {
    dropdown.classList.toggle('user-dropdown--open', dropdownOpen);
  }
  
  async function handleLogout() {
    const confirmed = confirm('¿Estás seguro de que deseas cerrar sesión?');
    if (confirmed) {
      state.emit('user:logout');
    }
  }
  
  // Close dropdown when clicking outside
  document.addEventListener('click', () => {
    if (dropdownOpen) {
      dropdownOpen = false;
      updateDropdown();
    }
  });
  
  userContainer.appendChild(userTrigger);
  userContainer.appendChild(dropdown);
  
  return userContainer;
}