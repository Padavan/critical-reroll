const routes = document.getElementById('router-links');
routes.addEventListener('click', (event) => {
    const clickedElement = event.target;    

    if (clickedElement.hasAttribute('data-router-id')) {
        const pathname = clickedElement.getAttribute('data-router-id');
        window.history.pushState(null, "shit", `#${pathname}`);
    }
});

