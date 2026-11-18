# GamePortal

## Desarrolladores

| Nombre | Correo electronico | Usuario Github |
| :------------------------ | :------- | :--------- |
| Alejandro Izquierdo | <a.izquierdor.2025@alumnos.urjc.es> | @Alejandro18650 |
| Alejandro Sánchez | <a.sanchezu.2024@alumnos.urjc.es> | @alejandrosanchezuzquiano-sudo |
| Guillermo Hervás | <g.hervas.2025@alumnos.urjc.es> | @GHervas2025 |
| Marcos Bermejo | <m.bermejo.2025@alumnos.urjc.es> | @marcoso2005 |

## Propósito de la web

La web va a consistir en un portal de videojuegos para la comunidad donde se mostrarán los videojuegos más populares y se podrán realizar reseñas de los mismos.


### Entidades

1. Videojuego que contiene Reseñas. **Atributos**:
    * title --> String.
    * description --> String.
    * launch_age --> int con formato xxxx.
    * PEGI --> string. (Si el juego no tiene calificacion el PEGI corresponde a "Sin calificar")
    * genre --> string/enum[] {Terror, Carreras, Accion, RPG, Puzles, Estrategia, Disparos, Aventura, Multijugador}.
    * developer --> string.
    * platform --> string/enum[] {PC, PS4, PS5, XBOX,Nintendo Switch,Telefono movil}.
    * link --> String
    * cover --> string
    * scene --> string[]

2. Reseña que pertenece a un videojuego. **Atributos**:
    * username --> string.
    * score:
      * jugability--> int de 1 a 5.
      * graphics --> int de 1 a 5.
      * history --> int de 1 a 5.
      * price --> int de 1 a 5.
    * comment --> String.
    * date_publication --> date.

### Imagenes

Los videojuegos tendrán una imagen de portada y varias imágenes de escenas del juego.

### Buscador

Se realizará la búsqueda en función del titulo del videojuego y el filtrado en función de la categoría.

## Practica 1
### Página principal

<img width="1458" height="705" alt="image" src="https://github.com/user-attachments/assets/baba0b44-0df9-4add-b2c3-83037ed6904f" />
<img width="1457" height="726" alt="image" src="https://github.com/user-attachments/assets/cea7a257-df6f-4074-be69-4a2a1ea95e45" />

### Detalles

<img width="1241" height="894" alt="imagen" src="https://github.com/user-attachments/assets/66754b19-4b68-41a5-a052-068932f4d0c0" />
<img width="1185" height="878" alt="imagen" src="https://github.com/user-attachments/assets/4a85f9ec-a799-46af-b46c-a9c02976138b" />
<img width="1162" height="511" alt="imagen" src="https://github.com/user-attachments/assets/947035db-6647-41db-8384-204c675ac5df" />
<img width="1161" height="809" alt="imagen" src="https://github.com/user-attachments/assets/6324d643-a7ba-401c-b028-c9b6c8168aa5" />



### Nuevo elemento

<img width="1460" height="726" alt="image" src="https://github.com/user-attachments/assets/ea7c43f2-e5b2-493d-9e82-58ed09687b13" />
<img width="1470" height="731" alt="image" src="https://github.com/user-attachments/assets/cf96559a-5926-4a98-b087-54065cbd283d" />
<img width="1457" height="642" alt="image" src="https://github.com/user-attachments/assets/e91d7f53-0973-4311-bd92-bebf50b1360d" />
<img width="1462" height="732" alt="image" src="https://github.com/user-attachments/assets/806b56aa-578c-4781-9e34-591e4fd5925d" />

### Participación
#### Marcos Bermejo Salamanca
He realizado el formulario de la entidad principal desde 0, además de fusionar y corregir los errores en el principalEntity donde se recogen todos los datos que contendrá nuestra página web.

Commits: 
- [4982756319c5ac65ea052556188ff8b1b343b997](https://github.com/CodeURJC-FW-2026-27/webapp10/commit/4982756319c5ac65ea052556188ff8b1b343b997)
- [a7f01a24d78bab9058ad03d3afd2a36acaebeb7b](https://github.com/CodeURJC-FW-2026-27/webapp10/commit/a7f01a24d78bab9058ad03d3afd2a36acaebeb7b)
  
Ficheros:

- [formPrincipalEntity.html](https://github.com/CodeURJC-FW-2026-27/webapp10/blob/main/formPrincipalEntity.html)
- [principalEntity.json](https://github.com/CodeURJC-FW-2026-27/webapp10/blob/main/metadata/principalEntity.json#L3)

#### Alejandro Sánchez Uzquiano 

He realizado los cambios y adaptación de la pagina principal a nuestras necesidades, añadiendo desde cero el desplegable de categorías en el header, el grid con mínimo 9 elementos, el botón que redirige a la pagina añadir juego. Entre otras cosas he cambiado y adaptado el logo de la pagina y he modificado el footer para que este acorde a la practica.

Commits:

- [1ba9ed09b86c33da91df0be12376969229e961ba](https://github.com/CodeURJC-FW-2026-27/webapp10/commit/1ba9ed09b86c33da91df0be12376969229e961ba)
- [6a1dc33df4e14dab67dc55e0822f69fa7797ed12](https://github.com/CodeURJC-FW-2026-27/webapp10/commit/6a1dc33df4e14dab67dc55e0822f69fa7797ed12)

Ficheros:
 - [index.html](https://github.com/CodeURJC-FW-2026-27/webapp10/blob/main/index.html)
 - [templatemo-lugx-gaming.css](https://github.com/CodeURJC-FW-2026-27/webapp10/blob/main/assets/css/templatemo-lugx-gaming.css)

#### Guillermo Hervás García

He modificado el estilo de productdetails.html para adaptarlo a las necesidades de la página con la presentación en un estilo similar al de Steam. He añadido desde cero el carrusel de imágenes con Bootstrap para mostrar las escenas de los juegos.

Commits:

- [7bf492ca6648fbd547216a1cbe1717db4cf31477](https://github.com/CodeURJC-FW-2026-27/webapp10/pull/10/changes/7bf492ca6648fbd547216a1cbe1717db4cf31477)
- [bc1a9299f3cf18ad99422443f88381557920f61c](https://github.com/CodeURJC-FW-2026-27/webapp10/pull/20/changes/bc1a9299f3cf18ad99422443f88381557920f61c)
- [f2a0e21ea2823cafdbab9bbf248d13b9750ad573](https://github.com/CodeURJC-FW-2026-27/webapp10/pull/20/changes/f2a0e21ea2823cafdbab9bbf248d13b9750ad573)
- [caff27a99245c6c691ab007caa90b14c3be0b4b4](https://github.com/CodeURJC-FW-2026-27/webapp10/pull/20/changes/caff27a99245c6c691ab007caa90b14c3be0b4b4)


Ficheros:

- [productdetails.html](https://github.com/CodeURJC-FW-2026-27/webapp10/blob/main/product-details.html)


#### Alejandro Izquierdo

He diseñado toda la sección de reseñas de product-details.html incluyendo el formulario de creación de una nueva reseña. Además he revisado el trabajo de mis compañeros haciendo pequeños cambios en sus ficheros.

Commits:

- [8226410b0b6ef5811dc3d67c5eacfc511126b998](https://github.com/CodeURJC-FW-2026-27/webapp10/pull/20/changes/8226410b0b6ef5811dc3d67c5eacfc511126b998)
- [28c761ba69802e12c5c025ab0a8873b237fab8df](https://github.com/CodeURJC-FW-2026-27/webapp10/pull/20/changes/28c761ba69802e12c5c025ab0a8873b237fab8df)
- [e066132f1dc240976822c4f64060dd94956ff4c9](https://github.com/CodeURJC-FW-2026-27/webapp10/pull/20/changes/e066132f1dc240976822c4f64060dd94956ff4c9)

Ficheros:

- [productdetails.html](https://github.com/CodeURJC-FW-2026-27/webapp10/blob/main/product-details.html)

## Practica 2
### Requisitos
Para el correcto funcionamiento de la WEB es necesario instalar una serie de dependencias.

* Instalar NODE.js, para esta WEB se utiliza la versión 27.0.0-alpha.0.0.0.

* Instalar mongo para almacenar los datos y utilizaremos la versión 9.0.4.

* Importar unlink, de las librerías de node.js, para permitir la eliminación de imágenes.

* Utilizamos una serie de módulos de NODE para ellos utilizaremos el siguiente comando: 
```
npm install
```

### Funcionalidad
La funcionalidad de los diferentes ficheros de la página es la siguiente:
1. [Router.js](src/router.js):
   Este fichero es el encargado de obtener las peticiones que hace el front al back y las procesa. Por ejemplo de encarga de la recogida y validación de datos a la hora de crear un nuevo elemento, carga los datos de las plantillas para mostrar el contenido adecuado a cada juego, carga los datos de prueba en caso de que la BBDD esté vacía.
2.  [PrincipalEntity.jsons](src/principalEntity.jsons):
   Este fichero contiene datos de prueba para la página.
3. [Games.js](src/games.js):
   Este fichero es el encargado de realizar las conexiones con la BBDD, en este fichero se encuentran los diferentes métodos los cuales acceden a la BBDD para cargar juegos o consultarlos. Además es el encargado de subir todos los datos de prueba al a la BBDD.
4. [App.js](src/app.js):
   Este fichero se encarga de configurar y arrancar el servidor Express, carga mustache, conecta el [router.js](src/router.js) y conecta el puerto 3000 para mostrar la página.
5. [FormPrincipalEntity.html](views/formPrincipalEntity.html):
   Este fichero es el encargado de mostrar un formulario en el cual se mostrarán los diferentes campos para crear o modificar las entidades principales de la página.
6. [Window.html](views/window.html):
   Este fichero se encarga de mostrar mensajes informativos para el usuario, como diferentes errores al cargar o al realizar acciones, o confirmaciones de creación de elementos.

### Participación
#### Marcos Bermejo Salamanca
Me he encargado de la implementación del formulario principal el cual será el encargado de dar de alta las nuevas entidades, además he generado una nueva ventana la cual será la encargada de mostrar los diferentes mensajes a mostrar al usuario y por ultimo he creado un fichero que se encargará de realizar la conexión con la BBDD:

Commits:

- [e2e90e2d604341cc7d5fa3c3f1a8fff4e2e8f0f7](https://github.com/CodeURJC-FW-2026-27/webapp10/commit/e2e90e2d604341cc7d5fa3c3f1a8fff4e2e8f0f7)
- [c8eed863b787ed32119ac4ef0bb3f268b340444e](https://github.com/CodeURJC-FW-2026-27/webapp10/commit/c8eed863b787ed32119ac4ef0bb3f268b340444e)
- [ca356e104e3ee0ffb039ef309363881f6ee04ecd](https://github.com/CodeURJC-FW-2026-27/webapp10/commit/ca356e104e3ee0ffb039ef309363881f6ee04ecd)

Ficheros:
 - [Router.js](src/router.js).
 - [Window.html](views/window.html).
 - [PrincipalEntity.jsons](src/principalEntity.jsons).
 - [Games.js](src/games.js).
 - [Router.js](src/router.js).

#### Guillermo Hervás García
Me he encargado de modificar el formulario de Marcos para permitir la edición de entidades principales, creando las funciones necesarias en router.js para la eliminación y edición de juegos, con sus respectivas imágenes, para lo que se han añadido dos nuevos mensajes. Asimismo he editado product-details.html para renderizar correctamente las propiedades de cada entidad principal.


Commits:
https://github.com/CodeURJC-FW-2026-27/webapp10/commit/7d14721655c8310ba39610372bad8fcc1885c220
https://github.com/CodeURJC-FW-2026-27/webapp10/commit/1be0d1b979eb0ca0dca411afbf3854526f9106ab
https://github.com/CodeURJC-FW-2026-27/webapp10/commit/8ce9f12d03b0bad4f8ba200898737b064de7b8ce
https://github.com/CodeURJC-FW-2026-27/webapp10/commit/f6a328e21f6783ba60498f0c687ed4e8c6ff27e4

Ficheros:
 - [Games.js](src/games.js).
 - [Router.js](src/router.js).
 - [FormPrincipalEntity.html](views/formPrincipalEntity.html)
 - [productdetails.html](https://github.com/CodeURJC-FW-2026-27/webapp10/blob/main/product-details.html)

#### Alejandro Sanchez Uzquiano
Me he encargado de la implementación de la carga inicial de datos de ejemplo, es decir cargar el JSON en la BBDD y mover las imagenes de ejemplo a la carpeta /uploads, asi he podido crear una paginacion en la pagina principal para mostrar las entidades principales del proyecto, ademas de la implementacion de las funciones del header y el footer con sus correspondientes partials para la reutilizacion de los mismos, dentro del header la implementacion consta de las opciones de categorizacion y barra de busqueda. (Tambien me ocupe de la estructuracion del template para adaptarlo a node con express)

Commits:

- [22f43bc703398fe9ae09a59877d6baf3165aaf27](https://github.com/CodeURJC-FW-2026-27/webapp10/commit/22f43bc703398fe9ae09a59877d6baf3165aaf27)
- [66a0fc69df268afb3853c92dda7c3f68d612b3ac](https://github.com/CodeURJC-FW-2026-27/webapp10/commit/66a0fc69df268afb3853c92dda7c3f68d612b3ac)
- [11d832d7036e67d76cc5f90cc16b270cf11b445e](https://github.com/CodeURJC-FW-2026-27/webapp10/commit/11d832d7036e67d76cc5f90cc16b270cf11b445e)

Ficheros:
 - [Router.js](src/router.js).
 - [PrincipalEntity.jsons](src/principalEntity.jsons).
 - [Games.js](src/games.js).
 - [Router.js](src/router.js).
