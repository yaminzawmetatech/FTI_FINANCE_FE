const filterNavigationItem = (item, enabledModules) => {
  if (item.moduleId && !enabledModules.has(item.moduleId)) {
    return null;
  }

  if (!Array.isArray(item.children) || item.children.length === 0) {
    return item;
  }

  const children = item.children
    .map((child) => filterNavigationItem(child, enabledModules))
    .filter(Boolean);

  if (children.length === 0) {
    return null;
  }

  return { ...item, children };
};

const filterNavigationForModules = (items, moduleIds) => {
  const enabledModules = new Set(moduleIds);
  return items
    .map((item) => filterNavigationItem(item, enabledModules))
    .filter(Boolean);
};

export default filterNavigationForModules;
