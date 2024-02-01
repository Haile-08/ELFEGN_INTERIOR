const dotenv = require("dotenv");
const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const morgan = require("morgan");
const bodyParser = require("body-parser");
const helmet = require("helmet");
const passportSetup = require("./config/passportStrategy");
const cookieParser = require("cookie-parser");
const passport = require("passport");
const session = require("express-session");
const multer = require("multer");
const { createServer } = require("http");
const { Server } = require("socket.io");
const sockets = require("./sockets/sockets");

//local imports
const api = require("./routes/api.routes");

dotenv.config();
const app = express();
const PORT = process.env.PORT || 3500;

// https server

const httpServer = createServer(app);
const io = new Server(httpServer, {
  cors: {
    origin: ["https://merita.netlify.app"],
    methods: ["GET", "POST"],
  },
});

//connect the mongodb
const connectDB = require("./config/dbCon");
//allowed origins
const allowedOrigins = require("./config/allowedOrigins");

//connect to monogodb
connectDB();
app.use(cors(allowedOrigins));
app.use(morgan("common"));
app.use(helmet());
app.use(cookieParser());
app.use(express.static(`upload`));
app.use(helmet.crossOriginResourcePolicy({ policy: "cross-origin" }));
app.use(bodyParser.json({ extended: true }));
app.use(bodyParser.urlencoded({ extended: true }));

app.use(
  session({
    secret: "your-session-secret",
    resave: false,
    saveUninitialized: false,
    cookie: { secure: false },
  })
);
app.use(passport.initialize());
app.use(passport.session());

// api versioning
app.use("/v1", api);

io.on("connection", sockets);

//connection checker
mongoose.connection.once("open", () => {
  console.log("connected to MongoDB");
  httpServer.listen(PORT, () => console.log(`Server run on ${PORT}`));
});
