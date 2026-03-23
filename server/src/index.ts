import mongoose from 'mongoose';
import { config } from './config';
import app from './app';

async function bootstrap() {
  await mongoose.connect(config.mongoUri);
  app.listen(config.port, () => {
    if (config.nodeEnv !== 'production') {
      process.stdout.write(`Server running at http://localhost:${config.port}\n`);
    }
  });
}

bootstrap().catch((err) => {
  process.stderr.write(String(err));
  process.exit(1);
});
