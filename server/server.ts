import app from "./src/app";

const server = app.listen(8000, async () => {
    console.log("Server runing on port 8000");
});

process.on("SIGINT", () => {
    server.close(() => console.log("Exit server express!"));
});
