import "dotenv/config";
import app from "./src/app.js";
import config from "./src/configs/config.db.js";

// Start server
const PORT = config.app.port;
const server = app.listen(PORT, () => {
  // eslint-disable-next-line no-console
  console.log(`Server running on port ${PORT}`);
});

process.on("SIGINT", () => {
  server.close(() => console.log("Close server"));
});
