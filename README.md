# GamePortal

## Desarrolladores

| Nombre | Correo electronico | Usuario Github |
| :------------------------: | -------: | ---------: |
| Alejandro Izquierdo | <a.izquierdor.2025@alumnos.urjc.es> | @Alejandro18650 |
| Alejandro Sánchez | <a.sanchezu.2024@alumnos.urjc.es> | @alejandrosanchezuzquiano-sudo |
| Guillermo Hervás | <g.hervas.2025@alumnos.urjc.es> | @GHervas2025 |
| Marcos Bermejo | <m.bermejo.2025@alumnos.urjc.es> | @marcoso2005 |

## Propósito de la web

La web va a consistir en un portal de videojuegos para la comunidad donde se mostrarán los videojuegos más populares y se podrán realizar reseñas de los mismos.

## Funcionalidad

### Entidades

1. Videojuego que contiene Reseñas. **Atributos**:
    * título --> String.
    * descripción --> String.
    * año de lanzamiento --> int con formato xxxx.
    * PEGI --> string.
    * género --> string/enum {Terror,Carreras,Acción,RPG}.
    * estudio desarrollador --> string.
    * plataforma --> string/enum {PC,Play4,XBox}.

2. Reseña que pertenece a un videojuego. **Atributos**:
    * Nombre de usuario --> string.
    * puntuación:
      * jugabilidad --> int de 1 a 5.
      * gráficos --> int de 1 a 5.
      * historia --> int de 1 a 5.
      * precio --> int de 1 a 5.
    * comentario --> String.
    * fecha de publicación --> date.

### Imagenes

Los videojuegos tendrán una imagen de portada y varias imágenes de escenas del juego.

### Buscador

Se realizará la búsqueda en función del titulo del videojuego y el filtrado en función de la categoría.
