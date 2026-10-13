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

- principalEntity.json
- formPrincipalEntity.html






