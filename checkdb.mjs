import mongoose from "mongoose";

const uris = ["mongodb://127.0.0.1:27017", "mongodb://localhost:27017"];

for (const uri of uris) {
  const conn = mongoose.createConnection(uri, { serverSelectionTimeoutMS: 3000 });
  try {
    await conn.asPromise();
    const admin = conn.db.admin();
    const info = await admin.serverStatus();
    const dbs = await admin.listDatabases();
    console.log(`=== ${uri} ===`);
    console.log("host:", info.host, "pid:", info.pid, "version:", info.version);
    console.log("databases:", dbs.databases.map((d) => d.name));
  } catch (e) {
    console.log(`=== ${uri} === ERROR:`, e.message);
  } finally {
    await conn.close();
  }
}
