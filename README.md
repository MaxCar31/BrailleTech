# BrailleTech

 <img src="https://github.com/MaxCar31/BrailleTech/assets/141116497/bb746657-6220-4f87-a121-1bb73f7c927f" alt="prueba" width="300px">

## Descripción
BrailleTech es un proyecto que ofrece herramientas para la transcripción de textos entre español y braille, así como la generación de señalética braille a partir de textos en español. Además, proporciona la capacidad de generar impresiones en espejo de textos en braille para su uso en escritura manual.

## Características
1. **Transcripción de Español a Braille**: Convierte texto en español, incluyendo números, el abecedario, y vocales acentuadas, al sistema braille.
2. **Transcripción de Braille a Español**: Traduce textos en braille de vuelta al español.
3. **Generación de Señalética Braille**: Permite generar señalética en braille a partir de textos en español.
4. **Generación de Impresión en Espejo**: Facilita la generación de impresiones en espejo de textos en braille para su escritura manual. Esto es especialmente útil ya que la escritura braille se realiza de derecha a izquierda, por lo que se requiere una versión en espejo para usarla como guía.

## Uso
1. Ingresa un texto en español en el campo correspondiente y haz clic en "Traducir a Braille" para obtener su transcripción a braille.
2. Para transcribir un texto en braille de vuelta al español, introduce el texto en braille en el campo correspondiente y haz clic en "Traducir a Español".
3. Para generar señalética braille a partir de un texto en español, escribe el texto en el campo adecuado y haz clic en "Generar Señalética".
4. Para generar una impresión en espejo de un texto en braille, introduce el texto en el campo correspondiente y haz clic en "Generar Impresión en Espejo".

![image](https://github.com/MaxCar31/BrailleTech/assets/94008713/57a32b82-9b48-41e7-82ab-465126d9ae00)


## Instrucciones de Instalación y Ejecución 

Sigue los siguientes pasos para instalar Node.js y npm, clonar, instalar dependencias y ejecutar el proyecto BrailleTech:

### 1.-Instalar Node.js y npm:

#### Windows:

1. Descarga el instalador de Node.js desde nodejs.org.
   
2. Ejecuta el instalador y sigue las instrucciones. Asegúrate de marcar la opción "Install npm".

3. Alternativamente, si ejecutas desde cmd el siguiente comando:

 ```sh
winget install OpenJS.NodeJS
 ```
Este comando instalará la última versión estable de Node.js, que incluye npm.

#### macOS:

1. Descarga el instalador de Node.js desde nodejs.org.

2. Ejecuta el instalador y sigue las instrucciones.

3. Alternativamente, si usas Homebrew, puedes instalarlo con:
 ```sh
 brew install node
```

#### Linux:

Abre tu terminal y ejecuta los siguientes comandos:

 ```sh
sudo apt update
sudo apt install nodejs npm
 ```

### 2.-Verificar la instalación de Node.js y npm:

Abre una terminal y ejecuta los siguientes comandos para asegurarte de que Node.js y npm se han instalado correctamente:

 ```sh
node -v
npm -v
 ```

Deberías ver los números de versión instalados de Node.js y npm.

### 3. Clona este repositorio o descárgalo como archivo ZIP.

En la terminal, clona el repositorio BrailleTech usando el siguiente comando:
   
```bash
git clone https://github.com/MaxCar31/BrailleTech.git
```
### 4. Navega al directorio del proyecto

Cambia al directorio del proyecto clonado:
   
```bash
cd BrailleTech_Codigo
```

### 5. Instala las dependencias:

Ejecuta el siguiente comando para instalar todas las dependencias necesarias que se encuentran en el archivo package.json:

```bash
npm install
```

### 6. Ejecutar el proyecto:

Usa el siguiente comando para iniciar el servidor de desarrollo:


```bash
npm run dev
```


### Descripción de los comandos en `package.json`

Para mayor claridad, aquí tienes una breve descripción de los scripts en tu archivo `package.json`:

- `dev`: nicia el servidor de desarrollo utilizando Vite y abre el proyecto en el navegador.
- `build`: Construye el proyecto para producción utilizando Vite.
- `serve`: Inicia un servidor para previsualizar la construcción de producción.
- `preview`: Alias para serve, inicia un servidor para previsualizar la construcción de producción.
- `test`: Ejecuta las pruebas utilizando Jest.
- `docs`: Genera la documentación del proyecto utilizando JSDoc. (Tambien lo puedes encontrar en la carpeta Docs del repositorio)

Asegúrate de incluir cualquier otra información relevante o dependencias adicionales que puedan ser necesarias para el correcto funcionamiento del proyecto.


## Contribuciones
Las contribuciones son bienvenidas. Si deseas mejorar este proyecto, por favor abre un issue para discutir los cambios propuestos o envía un pull request con tus modificaciones.

## Licencia
Este proyecto está bajo la Licencia [MIT](https://opensource.org/licenses/MIT).
