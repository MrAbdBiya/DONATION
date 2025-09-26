import 'dotenv/config';
import { createServer } from './server.js';

const port = Number(process.env.PORT ?? 4000);

async function bootstrap() {
  const app = await createServer();
  app.listen(port, () => {
    console.info(`🚀 MediQueuePro API listening on http://localhost:${port}`);
  });
}

bootstrap().catch((error) => {
  console.error('Failed to start MediQueuePro API', error);
  process.exit(1);
});
