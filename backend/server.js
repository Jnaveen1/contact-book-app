// const express = require("express");
// const cors = require("cors");
// require("dotenv").config();

// const db = require("./db");

// const contactRoutes = require('./routes/contactRoutes'); // import routes



// const app = express();
// app.use(cors());
// app.use(express.json());

// app.get("/", (req, res)=>{
//     res.send("Hello World!");
// })

// // API Routes
// app.use("/contacts", contactRoutes);

// const PORT = process.env.PORT || 5000;
// app.listen(PORT, () => console.log(`Server running on port ${PORT}`));

// backend/server.js
const express = require("express");
const cors = require("cors");
require("dotenv").config();

const contactRoutes = require("./routes/contactRoutes"); // path must be correct

const app = express();
app.use(cors());
app.use(express.json());

// Root
app.get("/", (req, res) => res.send("Hello World!"));

// Use contacts router
app.use("/contacts", contactRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
