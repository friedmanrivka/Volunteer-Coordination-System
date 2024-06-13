import App from "./app";

(async () => {
    let app;
    try {
        app = new App();
        await app.init();
    } finally {
        await app?.terminate();
    }
})();



// (async () => {
//     let app;
//     try {
//         app = new App();
//         await app.init();
//     } catch (error) {
//         console.error('Error during initialization:', error);
//     } finally {
//         await app?.terminate();
//     }
// })();