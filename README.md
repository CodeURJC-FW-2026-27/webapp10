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

## Funcionalidad

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
- [index.html](https://github.com/CodeURJC-FW-2026-27/webapp10/blob/main/index.html)
- [formPrincipalEntity.html](https://github.com/CodeURJC-FW-2026-27/webapp10/blob/main/formPrincipalEntity.html)





