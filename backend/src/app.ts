import express from 'express';
import cors from 'cors';
import morgan from 'morgan';
import passport from 'passport';

import './security/auth';
import { sequelize } from './database';
import eventsRouter from './routes/events';
import authRouter from './routes/auth';
import rootRouter from './routes/root';

const APP_PORT = process.env.PORT || 8080;
export const isProduction = process.env.NODE_ENV === 'production';

if (!isProduction) {
  console.log('Starting server in development mode...');
}

const startServer = async () => {
  // Connect to the database before starting
  try {
    console.log('Connecting to database...');
    await sequelize.authenticate();
    if (!isProduction) {
      // Sync in dev mode
      await sequelize.sync();
    }
    console.log('Database connection successful.');
  } catch (err) {
    // Stop the server if the database connection was unsuccessful.
    console.error('Could not connect to the database!');
    console.error(err);
    process.exit(1);
  }

  // Initialize Express
  const app = express();

  // Initialize middleware
  app.use(helmet());
  app.use(bodyParser.json());
  app.use(cookieParser());
  app.use(morgan('tiny'));
  app.use(passport.initialize());
  app.use(
    cors({
      credentials: true,
      origin: process.env.FRONTEND_DOMAIN,
      exposedHeaders: 'Location',
    })
  );

  // Initialize routes
  app.use('/', rootRouter);
  app.use('/auth', authRouter);
  app.use('/events', eventsRouter);

  // Start listening for requests
  app.listen(APP_PORT);
};

startServer().then(() => {
  console.log(`Server successfully started on port ${APP_PORT}.`);
});