require('dotenv').config();
const express = require('express');
const path = require('path');
const morgan = require('morgan');
const cors = require('cors');
const mongoose = require('mongoose');
 
// Connect to MongoDB 
mongoose.connect(process.env.MONGO_URL, {
  useNewUrlParser: true,   
  useUnifiedTopology: true,
})
.then(() => {
  console.log('Database Connected'); 
})
.catch((error) => {
  console.error('Database Connection Error:', error);
});

const app = express();
app.use(express.json());

app.use(morgan('dev'));
app.use(cors()); 

// For userRoutes

const userRoute = require('./Routes/UserRoute');
app.use('/users', userRoute);
//For Admin routes
const adminRoute = require('./Routes/AdminRoutes');
app.use('/admin', adminRoute);

const PORT = process.env.PORT || 3000; // Use PORT from environment variable if available, otherwise default to 3000

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
