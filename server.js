const { default: mongoose } = require('mongoose');
const app = require('./app');
const PORT = process.env.PORT || 8080;
const path = require('path');
require('dotenv').config({ path: path.resolve(__dirname, "./.env") });

mongoose.connect(process.env.db_url, {
    useNewUrlParser: true, useUnifiedTopology: true
});
const db = mongoose.connection;
db.on("error", console.error.bind(console, "Connection Error"));
db.once("open", () => {
    console.log("Connected");
});

app.listen(PORT, () => {
    console.log(`Server running on Port: ${PORT}`);
})