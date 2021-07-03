# www-back-end

Backend para la aplicación World White Web. MiniProyecto de Desarrollo de Software para la USBve.

## Integrantes

* Yuni Quintero
* Germán Robayo
* Nairelys Hernandez
* Fabiola Martinez
* David Cabeza
* Jose Acevedo

## Tutores

* Yudith Cardinale
* Irvin Dongo

## Instalación del Proyecto

### Requerimientos

Solo es necesario tener instalado Node lts/dubnium (v10.16.0). Se recomienda usar nvm para administrar las versiones locales de node.

### Cómo ejecutar

#### Para desarrollo

1. Ejecuta `npm install` para descargar todas las dependencias.
2. En la raíz del directorio, crea un archivo .env que contenga variables de entorno necesarias (una por línea):
```
PORT=3000 # Puerto en el que se va a ejecutar el servidor. Normalmente su valor es 3000
TWITTER_CONSUMER_KEY: '' # Consumer key provista por twitter al aplicar a la API
TWITTER_CONSUMER_SECRET: '' # Consumer secret provista por twitter al aplicar a la API
```
3. Ejecuta `npm start` para correr el servidor de desarrollo. El mismo se encarga recargar las páginas en el navegador cuando guardas alguna modificación a los archvos del repositorio.
4. Visita http://localhost:3000/health
5. Verificar que retorne código 200 y un JSON { "status": "UP" }
