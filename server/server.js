import { app, server } from "./app.js";
import { connectDb } from "./data/database.js";


connectDb();



const PORT = process.env.PORT || 4000;
const server1 = server.listen(PORT, () => {
  // Log the server URL as a clickable link in the console
  console.log(
    `Server is running on http://localhost:${PORT} IN ${process.env.NODE_ENV} MODE `
  );
});



