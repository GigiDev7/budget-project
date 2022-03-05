const express = require("express");

//routers
const userRouter = require("./routes/user");
const accountRouter = require("./routes/account");
const expansesRouter = require("./routes/expanses");
const incomesRouter = require("./routes/incomes");
const categoryRouter = require("./routes/categories");

const app = express();

//middlewares
app.use(express.json());

//routes
app.use("/api/user", userRouter);
app.use("/api/myaccount", accountRouter);
app.use("/api/expanses", expansesRouter);
app.use("/api/incomes", incomesRouter);
app.use("/api/category", categoryRouter);

//server
const PORT = 5000;
app.listen(PORT, () => {
  console.log(`server running on port ${PORT}`);
});
