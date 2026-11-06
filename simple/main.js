console.log("main.js");


// // router
// function popstateLister() {
// 	console.log("popstateLister");
//     const pathname = window.location.pathname;
//     // broadcastToListers(pathname);
//     console.log("popstateLister:", pathname);
// }

// window.addEventListener("popstate", () => console.log("DONTWORK"));



document.addEventListener('DOMContentLoaded', () => {
    console.log("DOMContentLoaded");
    // --- 1. ROUTER CLICK LISTENER (Event Delegation) ---
    const routesContainer = document.getElementById('router-links');
    if (routesContainer) {
        routesContainer.addEventListener('click', (event) => {
            const clickedElement = event.target;    

            // Use the data attribute check for robustness
            if (clickedElement.hasAttribute('data-router-id')) {
                const pathname = clickedElement.getAttribute('data-router-id');
                
                // 1. Update the URL history
                history.pushState(null, "Page Title", `#${pathname}`); 

                // 2. (CRITICAL) Call the function that renders the new page based on the path
                // Your application logic goes here!
                // router.loadContent(pathname); 
            }
        });
    }


    // --- 2. POPSTATE LISTENER (Handling Browser Back/Forward) ---
    window.addEventListener("popstate", handlePopState);

    // Define the handler function separately
    function handlePopState() {
        const pathname = window.location.pathname;
        console.log("PopState detected:", pathname);
        
        // CRITICAL: When the URL changes via back/forward, you must also
        // trigger your rendering logic based on the new path.
        // router.loadContent(pathname); 
    }

});