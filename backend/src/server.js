// Load environment variables FIRST
require('dotenv').config();

const express = require('express');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const http = require('http');
const { Server } = require('socket.io');

// Now configure cloudinary after dotenv
const { configCloudinary } = require('./config/cloudinary');
configCloudinary();

const connectDB = require('./config/db');

// Now import routes after cloudinary is configured
const authRoutes = require('./routes/auth');
const blogRoutes = require('./routes/blogs');
const jobRoutes = require('./routes/jobs');
const applicationRoutes = require('./routes/applications');
const newsletterRoutes = require('./routes/newsletter');
const quotationRoutes = require('./routes/quotations');
const notificationRoutes = require('./routes/notifications');

const app = express();
const server = http.createServer(app);

// Parse allowed origins from environment or use defaults for development
const getAllowedOrigins = () => {
  if (process.env.ALLOWED_ORIGINS) {
    return process.env.ALLOWED_ORIGINS.split(',').map(origin => origin.trim());
  }
  // Default development origins
  return [
    'http://localhost:5173',
    'http://localhost:5174',
    'http://localhost:3000',
  ];
};

const allowedOrigins = getAllowedOrigins();

// Setup Socket.io
const io = new Server(server, {
  cors: {
    origin: allowedOrigins,
    credentials: true,
  },
});

// Make io accessible to routes
app.locals.io = io;

// Connect to MongoDB
connectDB();

// Middleware
app.use(
  cors({
    origin: allowedOrigins,
    credentials: true,
  }),
);
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true, limit: '10mb' }));
app.use(cookieParser());

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/blogs', blogRoutes);
app.use('/api/jobs', jobRoutes);
app.use('/api/applications', applicationRoutes);
app.use('/api/newsletter', newsletterRoutes);
app.use('/api/quotations', quotationRoutes);
app.use('/api/notifications', notificationRoutes);

// Health check route
app.get('/api/health', (req, res) => {
  res.json({ status: 'OK', message: 'Serveur STIP Solutions en ligne' });
});

// 404 handler
app.use((req, res) => {
  res.status(404).json({ success: false, message: 'Route non trouvée' });
});

// Error handler
app.use((err, req, res, next) => {
  console.error('Erreur serveur:', err);
  res.status(500).json({
    success: false,
    message: 'Erreur interne du serveur',
    error: process.env.NODE_ENV === 'development' ? err.message : undefined,
  });
});

const PORT = process.env.PORT || 5000;

// Socket.io connection handling
io.on('connection', (socket) => {
  console.log(`Admin connected: ${socket.id}`);

  socket.on('disconnect', () => {
    console.log(`Admin disconnected: ${socket.id}`);
  });
});

server.listen(PORT, () => {
  console.log(`Serveur démarré sur le port ${PORT}`);
});
