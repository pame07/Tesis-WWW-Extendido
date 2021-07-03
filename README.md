# Tesis-WWW-Extendido

## Backend - Integration

Esta carpeta contiene el servidor Node JS que se encarga del procesamiento de credibilidad de la extensión. Para probarlo, una vez descargado o clonado, se debe correr el comando ```npm install``` para descargar las dependencias correspondientes.

En el README dentro de esta carpeta se encuentran las instrucciones para poder ejecutar el servidor de manera local.

La integración del análisis semántico con el servidor aún está en trabajo, por el momento se puede probar con un tweet a través de la extensión.

## Frontend - Integration

Esta carpeta contiene la parte visual de la extensión que se encarga de tomar la información y enviarla al servidor para su procesamiento. Para probarlo, una vez descargado o clonado, se debe correr el comando ```npm install``` para descargar las dependencias correspondientes.

En el README dentro de esta carpeta se encuentran las instrucciones generar el build para poder instalar la extensión en el browser Google Chrome. 

## Dataset Covid.csv

Dataset con tweets con contenido o hashtags referentes a la pandemia. Es un dataset para realizar pruebas del filtro de análisis semántico.

## Semantic y archivos integration_test (.ts y .js)

La carpeta Semanic contiene todos los script de Python que realizan el análisis semántico y los archivos integration_test integran Node JS con Python, para hacer pruebas en texto de manera externa a la extensión.
