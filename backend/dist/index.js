const express = require('express');
const app = express();
const cors = require('cors');
app.use(cors());
app.use(express.json());
app.listen(3001, () => console.log("Listening at port 3001"));
//# sourceMappingURL=index.js.map