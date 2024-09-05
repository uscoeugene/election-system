const express = require('express');
const app = express();
const cors = require('cors');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const rateLimiterMiddleware = require('./middleware/rateLimiter');
const authRoutes = require('./routes/authRoutes'); // Import the auth routes
const voteRoutes = require('./routes/voteRoutes'); // Import vote routes
const userRoutes = require('./routes/userRoutes');
// const organizationRoutes = require('./routes/organizationRoutes');
// const electionRoutes = require('./routes/electionRoutes');
// const positionRoutes = require('./routes/positionRoutes');
// const candidateRoutes = require('./routes/candidateRoutes');

const verificationRoutes = require('./routes/verificationRoutes'); // Import verification routes

dotenv.config();

// Middleware
app.use(express.json());
app.use(cors({
  origin: 'http://localhost:3000',  // Adjust as needed
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  allowedHeaders: ['Content-Type', 'Authorization'],
}));
app.use(require('helmet')());
app.use(rateLimiterMiddleware);
app.use('/api/auth', authRoutes);
app.use('/api/users', userRoutes);
app.use('/api/vote', voteRoutes); // Register the vote routes
app.use('/api/verification', verificationRoutes); // Register the verification routes
// app.use('/api/organizations', organizationRoutes);
// app.use('/api/elections', electionRoutes);
// app.use('/api/positions', positionRoutes);
// app.use('/api/candidates', candidateRoutes);


// Connect to MongoDB
// console.log(process.env.MONGODB_URI);
mongoose.connect(process.env.MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('MongoDB connected'))
  .catch(err => console.error('MongoDB connection error:', err));

// Basic route
app.get('/', (req, res) => res.send('Election System Backend'));

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
