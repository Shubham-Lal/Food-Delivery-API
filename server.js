const app = require("./app.js");

const port = process.env.PORT || 5000;
app.listen(port, () => {
    console.log(`[server]: Server running at PORT => ${port}`);
});