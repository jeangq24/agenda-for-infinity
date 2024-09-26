
![En construccion...](https://raw.githubusercontent.com/jeangq24/CLIENT_LEXART_LABS/main/public/under-construction.jpg)

# AGENDA (INFINITY PELUQUERIA) 

CLIENT DEVELOPMENT BY JEAN GARZON


# Cliente con Next.js, NextUI, TailwindCSS

Este cliente está desarrollado con el framework Next.js que trabaja con React, y utiliza TailwindCSS para los estilos,NextUI para algunos componentes entre otras librerías.

## Configuración del Entorno de Desarrollo

### Instalación de Dependencias

Para instalar las dependencias necesarias, ejecuta el siguiente comando en la raíz del proyecto:

```bash
npm install
```

### Variables de Entorno

Crea un archivo `.env.local` en la raíz del proyecto y define las siguientes variables de entorno:

```env
NEXT_PUBLIC_SERVER_HOST=http://localhost:3001 # Host de la conexion con la API-REST (Validacion de este HOST en la CSP, Politica de seguridad de contenido)
NEXT_PUBLIC_SERVER_HOST_SOCKET=ws://localhost:3001 #Host de la conexion del socket (Validacion de este HOST en la CSP, Politica de seguridad de contenido)
NEXT_PUBLIC_ENV_DEV=true # Establecemos el modo desarrollo en true (*)
```

### Ejecución del Servidor

Después de establecer las variables, puedes ejecutar el siguiente comando para correr el servidor:

```bash
npm run dev (dev)
npm run build && num run start (prod)
```

El servidor se ejecutará en [http://localhost:3000/](http://localhost:3000/).

## Despliegue

Proximamente...




