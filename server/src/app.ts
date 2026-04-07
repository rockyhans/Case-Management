import express from "express";
import cors from "cors";
import caseRoutes from "./routes/case.routes";
import taskRoutes from "./routes/task.routes";
import dashboardRoutes from "./routes/dashboard.routes";
import errorMiddleware from "./middlewares/error.middleware";

const app = express();

app.use(cors());
app.use(express.json());

// Routes
app.use("/api/cases", caseRoutes);
app.use("/api/tasks", taskRoutes);
app.use("/api/dashboard", dashboardRoutes);

app.use(errorMiddleware);

export default app;
