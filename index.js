import { mongooseLoader, startServer } from "./loaders";

const app = startServer();
mongooseLoader('mongodb://localhost:27017/db')

// app.listen(3000, () => console.log("Server Started ~"));

export default app