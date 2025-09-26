import swaggerJsdoc from 'swagger-jsdoc';

export const swaggerSpec = swaggerJsdoc({
  definition: {
    openapi: '3.1.0',
    info: {
      title: 'MediQueuePro API',
      version: '0.1.0',
      description: 'API documentation for the MediQueuePro medical cabinet platform'
    },
    servers: [{ url: 'http://localhost:4000/api' }],
    components: {
      securitySchemes: {
        bearerAuth: {
          type: 'http',
          scheme: 'bearer',
          bearerFormat: 'JWT'
        }
      }
    }
  },
  apis: []
});
