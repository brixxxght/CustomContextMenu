window.addEventListener("contextmenu", (e) => {
  e.preventDefault();
  // console.log("menu disabled");
});

window.onload = function () {
  const contextMenu = document.getElementById("context-menu");
  const viewportHeight = document.documentElement.clientHeight;
  const viewportWidth = document.documentElement.clientWidth;

  // get the contextmenu width and height class
  contextMenu.classList.remove("hide");
  const contextmenuWidth = contextMenu.clientWidth;
  const contextmenuHeight = contextMenu.clientHeight;
  contextMenu.classList.add("hide");

  // console.log(contextmenuHeight, contextmenuWidth);

  window.addEventListener("contextmenu", (event) => {
    event.preventDefault();

    // get the cursor position
    let contextmenuX = event.clientX;

    let contextmenuY = event.pageY; // incase the content is longer the the view port

    // get the context menu edge
    const contextMenuRightEdge = event.clientX + contextmenuWidth;
    const contextMenuBottomEdge = event.clientY + contextmenuHeight;

    const shouldInvertX = contextMenuRightEdge > viewportWidth;
    const shouldInvertY = contextMenuBottomEdge > viewportHeight;

    if (shouldInvertX) {
      contextmenuX = contextMenu - contextmenuWidth;
    }

    if (shouldInvertY) {
      contextmenuY = contextMenu - contextmenuHeight;
    }

    const style = `left: ${contextmenuX}px; top:${contextmenuY}px`;
    contextMenu.setAttribute("style", style);
    contextMenu.className = "";

    // console.log(style);
  });

  function isElementContextMenu(element) {
    return (
      element.classList.contains("context-menu-item") ||
      element.id === "context-menu"
    );
  }

  window.addEventListener("click", (e) => {
    const element = e.target;

    if (!isElementContextMenu(element)) {
      contextMenu.classList.add("hide");
    }
  });
};
