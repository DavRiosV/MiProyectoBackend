# Proyecto-BackEnd


En este repositorio mostrare el avance de mi proyecto que realizare a lo largo de mi cursada en el curso de Programación Backend en [Coderhouse](https://www.coderhouse.cl/?utm_term=coderhouse&utm_campaign=0&utm_source=google_search_brand&utm_medium=cpc&gclid=CjwKCAjwitShBhA6EiwAq3RqA7-yzKOqUR9I3mjm8hrJsEfua7t7GSJUVzNyU8ISrqxIpxYGweUtVBoC5T0QAvD_BwE).

![Coderhouse](https://cdn.shopify.com/s/files/1/0695/1505/1298/files/logo--white_140x.webp?v=1681144024)

El proyecto consta de la creación de un E-commerce a elección el cual debe estar totalmente construido a través de Backend. La temática de esta web será la venta de productos de Pokémon.
![Pokemon](https://media.gamestop.com/i/gamestop/Pokemon_Evergreen_1440x332_Hero_D_1.webp)

# iniciación del servidor
Para poder inicializar nuestro servidor debemos comenzar con la creación de nuestro archivo package.json, para la creación de este utilizamos los siguientes comandos dentro de la terminal:
```sh
npm init
npm nodemon
npm express
```

Una vez creado nuestro archivo packaga.json debemos agregar dos cambios al archivo creado.

1. Dentro del archivo package.json dentro del array escribiremos debajo del "main" lo siguiente ``"type": "module",``
2. En el apartado de scripts escribimos las siguientes lineas de codigo:
    ``` sh
    "start": "node ./src/server.js",
    "dev": "nodemon ./src/server.js"
    ```
Nosotros elegimos el nombre de la carpeta JS con la cual se ejecutara nodemon.

# Manejo de los Endpoints
Para poder visualizar un limite de productos agregaremos a la  siguiente URL (http://localhost:8050/api/products) la query representada por un signo de interrogación"?" seguido de la palabra "limit=" y la cantidad limite de productos qe deseamos visualizar. En el siguiente ejemplo visualizamos el limite indicado de 3 productos:
- http://localhost:8050/api/products?limit=3

![limit](https://firebasestorage.googleapis.com/v0/b/proyecto-react-da05a.appspot.com/o/limit.PNG?alt=media&token=6670772f-5246-4b31-9fc1-a2fc8dc5508f)

Si no agregamos la query ``?limit=`` se mostrara el total de los productos existentes.

Si no ingresamos un limite y solo dejamos el endpoint hasta products http://localhost:8050/api/products se mostrara el total de productos dentro del package.json.

Si después del endpoint agregamos el ID del producto *PID* nos postrara unicamente la id del producto que hayamos indicado.
- http://localhost:8050/api/products/6

![PID](https://firebasestorage.googleapis.com/v0/b/proyecto-react-da05a.appspot.com/o/pid.PNG?alt=media&token=e4135459-7064-496d-9834-aed0ac114440)
