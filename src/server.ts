import { app } from "./app";

const port = 3333;

app
  .listen({
    port,
    host: "0.0.0.0",
  })
  .then(() => {
    console.log(`✅ Server listening on http://localhost:${port}`);
  });
