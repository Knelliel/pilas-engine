import Component from "@ember/component";
import { later } from "@ember/runloop";
import { inject as service } from "@ember/service";
import { computed } from "@ember/object";

export default Component.extend({
  mostrar: false,
  proyecto: service(),
  tagName: "span",

  hacer_foco() {
    this.element.getElementsByTagName("input")[0].focus();
    this.element.getElementsByTagName("input")[0].select();
  },

  invalido_por_duplicado: computed("nombreSugerido", function() {
    return this.nombres_de_actores.indexOf(this.nombreSugerido) > -1;
  }),

  invalido_por_vacio: computed("nombreSugerido", function() {
    return this.nombreSugerido.length < 1;
  }),

  invalido_por_caracteres: computed("nombreSugerido", function() {
    return !/^[a-zA-Z_][0-9a-zA-Z_]+$/.test(this.nombreSugerido);
  }),

  invalido: computed("invalido_por_caracteres", "invalido_por_vacio", "invalido_por_duplicado", function() {
    return this.invalido_por_caracteres || this.invalido_por_vacio || this.invalido_por_duplicado;
  }),

  obtener_nombres_de_los_otros_actores() {
    let actores = this.proyecto.obtener_nombres_de_actores();
    actores.removeObject(this.nombre);
    return actores;
  },

  actions: {
    cambiarNombre() {
      this.set("mostrar", true);
      this.set("nombreSugerido", this.nombre);
      this.set("nombres_de_actores", this.obtener_nombres_de_los_otros_actores());
      later(this, this.hacer_foco, 1);
    },

    ocultar() {
      this.set("mostrar", false);
    },

    confirmar() {
      if (this.invalido) {
        return;
      }

      this.proyecto.renombrar_actor(this.nombre, this.nombreSugerido);
      this.send("ocultar");
      this.cuando_cambia(this.nombre);
    }
  }
});