const mongoose = require('mongoose');
const express = require("express")
const router = require('./routes/api');

const PORT = 4000;

function createServer() {
    const app = express()
    app.use(express.json());
    app.use('/api', router);
    // error handling middleware
    app.use((err, req, res, next) => {
        if (err.status) {
          return res.status(err.status).json({
            status: 'error',
            message: err.message
          });
        }
      
        return res.status(500).json({
          status: 'error',
          message: err.message
        });
      });
    
    return app
}

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


