import express from "express";
import { registerRoutes } from "./routes/routes";
import { connectToMongo } from "./connections/mongo.connection";
export const startServer = async () => {
  try {
    const app = express();
    await connectToMongo();
    registerRoutes(app);
    const { PORT } = process.env;
    app.listen(PORT || 3000, () =>
      console.log(`SERVER STARTED ON PORT: ${PORT || 3000}`)
    );
  } catch (error) {
    console.log("COULD NOT START SERVER", error);
    process.exit(1);
  }
};
