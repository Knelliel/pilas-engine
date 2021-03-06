import Service from "@ember/service";

export default Service.extend({
  /**
   * Adapta el código del proyecto a esta versión asumiendo que se
   * pudo haber creado con una versión anterior de pilas. Este código
   * de migración o migraciones se ejecutará siempre que se abra
   * un proyecto.
   */
  migrar(proyecto) {
    // Migración 2020-03-19: hacer que las escenas tengan definida el area
    //                       del escenario.
    proyecto.get("escenas").forEach(escena => {
      if (!escena.get("ancho")) {
        escena.set("ancho", 1000);
        escena.set("alto", 1000);
      }
    });

    // Migracion 2020-03-29: hacer cambios de nombres de imágenes
    proyecto.get("escenas").forEach(escena => {
      escena.set("fondo", this.convertir_nombre_de_imagenes(escena.get("fondo")));

      escena.get("actores").forEach(actor => {
        actor.set("imagen", this.convertir_nombre_de_imagenes(actor.get("imagen")));

        // miración 2020-04-12: hacer que los actores de texto tengan una fuente por omisión.
        if (actor.get("es_texto") && !actor.get("fuente")) {
          if (actor.get("fondo") === "imagenes:redimensionables/gris") {
            // caso particular, los botones tienen que tener una fuente de color negro.
            actor.set("fuente", "color-negro");
          } else {
            actor.set("fuente", "color-blanco-con-sombra");
          }
        }
      });
    });

    // migración 2020-04-12: hacer que el proyecto tenga almacenados los FPS
    if (!proyecto.get("fps")) {
      proyecto.set("fps", 60);
    }

    return proyecto;
  },

  convertir_nombre_de_imagenes(imagen) {
    let reemplazos = [
      {
        origen: "imagenes:fondos/",
        destino: "decoracion:fondos/"
      },
      {
        origen: "imagenes:decoracion/",
        destino: "decoracion:objetos/"
      }
    ];

    for (let i = 0; i < reemplazos.length; i++) {
      let item = reemplazos[i];

      if (imagen.includes(item.origen)) {
        return imagen.replace(item.origen, item.destino);
      }
    }

    return imagen;
  }
});
