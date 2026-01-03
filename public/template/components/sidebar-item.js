import { el } from '../../mount.js';

export function renderSidebarItem(item, state, isCollapsed) {
  const isActive = item.active || window.location.pathname === item.href;
  const hasSubItems = item.subItems && item.subItems.length > 0;
  const isExpanded = state.state.sidebar.expandedItems.includes(item.id);
  
  // Main item
  const itemElement = el('a.sidebar-item', {
    href: hasSubItems ? '#' : (item.href || '#'),
    class: [
      isActive ? 'sidebar-item--active' : '',
      hasSubItems && isExpanded ? 'sidebar-item--expanded' : ''
    ].filter(Boolean).join(' '),
    'data-tooltip': item.tooltip,
    onclick: (e) => {
      if (hasSubItems) {
        e.preventDefault();
        toggleSubItems(item.id);
      }
    }
  }, [
    // Icon
    el('span.sidebar-item-icon', {},
      typeof item.icon === 'string' ?
      item.icon :
      renderIcon(item.icon)
    ),
    
    // Label
    el('span.sidebar-item-label', {}, item.label),
    
    // Arrow for subitems
    hasSubItems ? el('span.sidebar-item-arrow', {}, '›') : null
  ].filter(Boolean));
  
  // Tooltip for collapsed state
  if (isCollapsed && item.tooltip) {
    itemElement.addEventListener('mouseenter', (e) => showTooltip(e, item.tooltip));
    itemElement.addEventListener('mouseleave', hideTooltip);
  }
  
  // SubItems container
  const subItemsElement = hasSubItems ? el('div.sidebar-subitems', {},
    item.subItems.map(subItem =>
      el('a.sidebar-item', {
        href: subItem.href || '#',
        style: { paddingLeft: '2.5rem' }
      }, [
        subItem.icon ? el('span.sidebar-item-icon', {}, subItem.icon) : null,
        el('span.sidebar-item-label', {}, subItem.label)
      ].filter(Boolean))
    )
  ) : null;
  
  function toggleSubItems(itemId) {
    const index = state.state.sidebar.expandedItems.indexOf(itemId);
    
    if (index > -1) {
      state.state.sidebar.expandedItems.splice(index, 1);
    } else {
      state.state.sidebar.expandedItems.push(itemId);
    }
    
    itemElement.classList.toggle('sidebar-item--expanded');
    if (subItemsElement) {
      subItemsElement.style.display =
        itemElement.classList.contains('sidebar-item--expanded') ? 'block' : 'none';
    }
  }
  
  // Return wrapper with item and subitems
  if (hasSubItems) {
    return el('div', {}, [itemElement, subItemsElement]);
  }
  
  return itemElement;
}

function renderIcon(iconConfig) {
  if (iconConfig.type === 'svg') {
    const temp = document.createElement('div');
    temp.innerHTML = iconConfig.content;
    return temp.firstChild;
  }
  return iconConfig.content;
}

// Tooltip helpers
let activeTooltip = null;

function showTooltip(event, text) {
  const rect = event.target.getBoundingClientRect();
  
  activeTooltip = el('div.tooltip.tooltip--visible', {
    style: {
      left: `${rect.right + 10}px`,
      top: `${rect.top + rect.height / 2}px`,
      transform: 'translateY(-50%)'
    }
  }, text);
  
  document.body.appendChild(activeTooltip);
}

function hideTooltip() {
  if (activeTooltip) {
    activeTooltip.remove();
    activeTooltip = null;
  }
}