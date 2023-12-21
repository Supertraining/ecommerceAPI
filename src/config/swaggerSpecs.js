import swaggerJsdoc from "swagger-jsdoc";
import path from "path";

const options = {
    definition: {
        openapi: '3.0.0',
        info:
        {
            title: 'E-commerce API RESTful',
            description:
            '*Esta **API** permite crear, consultar, actualizar y eliminar usuarios, productos y carritos. Es un servicio web que proporciona una interfaz para que los clientes interactúen con una base de datos. Utiliza el protocolo HTTP para recibir solicitudes de los clientes y enviar respuestas a los clientes y tiene varias rutas, cada una de las cuales corresponde a una solicitud HTTP específica que la **API** puede manejar. Cuando se recibe una solicitud HTTP en la **API**, ésta verifica la información proporcionada en la solicitud y valida los datos para asegurarse de que sean correctos y completos. Luego, la **API** se comunica con la base de datos para realizar la operación solicitada. Si la operación se realiza con éxito, la **API** devuelve una respuesta HTTP con los datos solicitados. Si ocurre algún error durante el proceso, la **API** devuelve una respuesta HTTP con un mensaje de error que describe lo que salió mal. En resumen, la **API** Ecommerce-backend es un servicio web que proporciona una interfaz para que los clientes interactúen con una base de datos, y utiliza el protocolo HTTP para recibir solicitudes de los clientes y enviar respuestas a los clientes.*',

            version: '1.0.0',
        },
    },
    apis: [path.join(process.cwd(),'/docs/**/*.yaml')],
}

const swaggerSpec = swaggerJsdoc(options);

export default swaggerSpec;