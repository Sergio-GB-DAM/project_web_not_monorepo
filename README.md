# PROYECTO - SGB

## Función del proyecto

Página web que se conecta con una API REST de restaurantes y permite a los usuarios ver los prodcutos subidos por los restaurantes así como realizar pedidos en los mismos.


## Funcionamiento interno

El proyecto dispone de una sección de servicios encargada de realizar peticiones a la API REST de restaurantes y varios hooks que nos permiten hacer uso de los servicios. Gracias a estos somos capaces de recoger la información y la plasmamos en la página web gracias a los componentes que hemos creado.

Podremos realizar operaciones básicas sobre los productos y restaurantes (Podemos verlos en las páginas principales y pedir informació adicional) así como añadir productos al pedido aunque esta función no esté implementada al completo.


## Tecnologías utilizadas

Para este proyecto se usa React para la parte web y una API REST con springboot que nos permite acceder a una base de datos PostgreSQL.


## Cómo usar el proyecto

Una vez descargardo el proyecto nos debemos situar en la raíz del mismo desde la terminal de comandos y ejecutar el comando "mnpm install". En caso de no disponer de mnpn, debemos instalarlo.

Una vez instalado podremos ejecutar el comando "npn run dev" o "mnpm dev" desde la raíz y nos debería de abrir el navegador con la previsualización de la página web.