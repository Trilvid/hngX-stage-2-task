const swaggerJsDoc = require('swagger-jsdoc')
const swaggerUi = require('swagger-ui-express') 
 

const options = {
    definition: {
      openapi: '3.0.0',
      info: {
        title: "API Documentation for hngX stage 2 task",
        version: '1.0.0'
      },
      components:{
        securitySchemas: {
            bearerAuth: {
                type: 'http',
                schema: "bearer",
                bearerFormat: "jwt",
            }
        }
      },
      security: [
        {
            bearerAuth: []
        }
      ],
    },
    apis: ['./app.js', './models/*.js']
  }
  
  const swaggerSpec = swaggerJsDoc(options)

  function swaggerDocs (app, port) {

    app.use('/api/docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec))
    app.get('docs.json', (req, res) => {
        res.setHeader("Content-Type", "application/json")
        res.send(swaggerSpec)
    })

    console.log(`Docs available at http://localhost:${port}/api/docs`);

  }

module.exports = swaggerDocs; 