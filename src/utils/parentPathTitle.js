const parentPathTitle = function(routes = [], currRoute, title = "") {
  for (let item of routes) {
    if (!item.children && item.path === currRoute.path) {
      return title;
    } else if (
      item.children &&
      (currRoute.path.includes(item.path) || item.path == "/")
    ) {
      return parentPathTitle(
        item.children,
        currRoute,
        item.meta ? item.meta.title : ""
      );
    }
  }
};

export default parentPathTitle;
