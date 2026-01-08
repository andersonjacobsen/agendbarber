import swaggerJSDoc from "swagger-jsdoc";

export const swaggerSpec = swaggerJSDoc({
  definition: {
    openapi: "3.0.0",
    info: {
      title: "AgendBarber API",
      version: "1.0.0",
      description: "API for barber shop appointment scheduling",
    },
    servers: [
      {
        url: "http://localhost:3333",
        description: "Local server",
      },
    ],
  },
  apis: ["./src/routes/**/*.ts"],
});
