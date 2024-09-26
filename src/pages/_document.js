import { Html, Head, Main, NextScript } from "next/document";

export default function Document() {
  return (
    <Html lang="en" className="light">
      <Head >
        {/* Cambiar el color de la barra superior en navegadores Chrome en Android */}
        <meta name="theme-color" content="#1C1C1C" />

        {/* Cambiar el color de la barra superior en Safari en iOS */}
        <meta name="apple-mobile-web-app-status-bar-style" content="black-translucent" />

        {/* Puedes agregar más configuraciones para iOS */}
        <meta name="apple-mobile-web-app-capable" content="yes" />

         {/* Agregar un ícono para la pantalla de inicio en iOS (opcional) */}
         <link rel="apple-touch-icon" href="/icon.png" />
      </Head>
      <body className="antialiased">
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
