const mongoose = require('mongoose');
const createServer = require("./server");
const PORT = 4000;

// connect to mongodb
mongoose
    .connect(`mongodb://localhost/kudosSystem`, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => {
		const app = createServer();
		app.listen(PORT, () => {
			console.log(`Server has started on port ${PORT}`)
		})        
    })
mongoose.Promise = global.Promise;


