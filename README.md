# Mi Portafolio en React — Guía práctica #4

Proyecto de ejemplo basado en la guía de clase: portafolio construido por componentes React, cada uno con su archivo CSS. Se utiliza Vite para ejecutar la aplicación y Bootstrap para cumplir con la instalación indicada en la guía.

## 1. Requisitos

- Node.js instalado (Node.js 20.19 o superior dentro de la rama 20, o 22.12 o superior).
- Visual Studio Code.
- Conexión a internet la primera vez para instalar los paquetes con npm.

Comprueba las instalaciones desde la terminal:

```bash
node -v
npm -v
```

## 2. Ejecutar el proyecto descargado

1. Descomprime `PortafolioReact.zip`.
2. Abre Visual Studio Code.
3. Selecciona **Archivo > Abrir carpeta** y abre la carpeta `PortafolioReact`.
4. Abre una terminal en VS Code con **Terminal > Nueva terminal**.
5. Ejecuta, línea por línea:

```bash
npm install
npm run dev
```

6. Abre en el navegador la dirección local que muestre la terminal (normalmente `http://localhost:5173`).
7. Para detener el servidor, vuelve a la terminal y presiona `Ctrl + C`.

Para comprobar que el proyecto compila para producción:

```bash
npm run build
```

## 3. Estructura

```text
PortafolioReact/
├── index.html
├── package.json
├── README.md
└── src/
    ├── App.jsx
    ├── App.css
    ├── index.css
    ├── main.jsx
    ├── assets/
    │   ├── miFoto.svg
    │   ├── proyecto-web.svg
    │   ├── proyecto-datos.svg
    │   └── proyecto-app.svg
    └── components/
        ├── Navbar/Navbar.jsx + Navbar.css
        ├── Banner/Banner.jsx + Banner.css
        ├── Perfil/Perfil.jsx + Perfil.css
        ├── Habilidades/Habilidades.jsx + Habilidades.css
        ├── Proyectos/Proyectos.jsx + Proyectos.css
        ├── Servicios/Servicios.jsx + Servicios.css
        └── Contacto/Contacto.jsx + Contacto.css
```

## 4. Qué debes personalizar antes de entregar

- **Banner.jsx:** cambia `Tu Nombre`, `Tu Apellido`, el rol y la descripción por tus datos.
- **Navbar.jsx:** cambia el texto `TU PORTAFOLIO` si deseas que se vea tu nombre.
- **miFoto.svg:** es una ilustración de reemplazo. Puedes poner una foto cuadrada en `src/assets` (por ejemplo `miFoto.jpg`) y cambiar la importación de `Banner.jsx` a `import miFoto from '../../assets/miFoto.jpg';`.
- **Perfil.jsx:** cambia la biografía, educación y experiencia por información verdadera.
- **Habilidades.jsx:** ajusta las tecnologías y niveles a tus conocimientos reales.
- **Proyectos.jsx:** cambia las tarjetas por proyectos propios; edita nombre, descripción, tecnologías y enlaces de demo/código.
- **Contacto.jsx:** actualiza el correo, ubicación y enlace a GitHub.

La guía de clase no proporciona un componente Servicios completo aunque la barra de navegación sí contiene ese enlace; se agregó un componente de ejemplo para que el enlace funcione. Puedes conservarlo, modificarlo o quitarlo con su enlace en `Navbar.jsx`.

## 5. Importante sobre el formulario

El formulario de Contacto es una demostración de React: valida los campos, muestra un mensaje y los limpia, pero **no envía correos ni guarda datos**. Para enviar mensajes realmente se necesitaría conectar un backend o un servicio de formularios.

## 6. Evidencia para el PDF de la práctica

La última página de la guía solicita documentar en PDF lo realizado, con capturas del código y de la ejecución. Puedes incluir:

1. Portada con curso, práctica, estudiante y fecha.
2. Captura de la estructura de carpetas en Visual Studio Code.
3. Capturas de los componentes clave: `Navbar.jsx`, `Banner.jsx`, `Habilidades.jsx`, `Proyectos.jsx` y `Contacto.jsx`.
4. Capturas del portafolio ejecutándose en el navegador; muestra la parte superior y también las secciones inferiores.
5. Breve conclusión sobre lo aprendido.

La guía indica el asunto de correo `LABORATORIO #4 – FULLSTACK DEVELOPER SOFTWARE– SEMINARIO IA 502`. Confirma con tu instructor la dirección de destino si no aparece en el aula virtual.
