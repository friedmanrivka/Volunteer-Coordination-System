// import App from "./app";

// (async () => {
//     let app;
//     try {
//         app = new App();
//         await app.init();
//     } finally {
//         await app?.terminate();
//     }
// })();
import App from "./app";

(async () => {
    const app = new App();
    await app.init();

    // Only terminate when the process is interrupted
    process.on('SIGINT', async () => {
        await app.terminate();
        process.exit(0);
    });

    process.on('SIGTERM', async () => {
        await app.terminate();
        process.exit(0);
    });
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