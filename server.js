import "dotenv/config";
import app from "./src/app.js";
import config from "./src/configs/config.db.js";

// Start server
const PORT = config.app.port;
const server = app.listen(PORT, () => {
  // eslint-disable-next-line no-console
  console.log(`Server running on port ${PORT}`);
});

let shuttingDown = false;
process.on("SIGINT", () => {
  if (shuttingDown) return;
  shuttingDown = true;
  console.log("Close server");
  server.close();
  process.exit(0);
});
