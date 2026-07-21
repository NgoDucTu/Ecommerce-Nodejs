import app from "./src/app.js";

// Start server
const PORT = process.env.PORT || 3055;
const server = app.listen(PORT, () => {
  // eslint-disable-next-line no-console
  console.log(`Server running on port ${PORT}`);
});

process.on("SIGINT", () => {
  server.close(() => console.log("Close server"));
});
