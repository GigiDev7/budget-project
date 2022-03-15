const express = require("express");
const cors = require("cors");
require("dotenv").config();
const protectAuth = require("./middlewares/protectAuth");

//routers
const userRouter = require("./routes/user");
const accountRouter = require("./routes/account");
const transactionsRouter = require("./routes/transactions");
const categoryRouter = require("./routes/categories");

const app = express();

//middlewares
app.use(cors());
app.use(express.json());

//routes
app.use("/api/user", userRouter);
//protecting other routes, checking authorization
app.use(protectAuth);

app.use("/api/myaccount", accountRouter);
app.use("/api/transactions", transactionsRouter);
app.use("/api/category", categoryRouter);

//server
const PORT = process.env.PORT;
app.listen(PORT, () => {
  console.log(`server running on port ${PORT}`);
});
