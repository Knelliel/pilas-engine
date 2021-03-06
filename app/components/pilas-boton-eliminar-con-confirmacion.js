import { computed } from "@ember/object";
import Component from "@ember/component";

export default Component.extend({
  tagName: "",
  modalVisible: false,
  comoCelda: false, // TODO: eliminar una vez que las escenas tengan menú contextual, ahora se deja así porque aún se accede a este componente desde las escenas como un ícono simple.
  modalFixed: false,

  idDialogo: computed("tipo", function() {
    return "dialogoEliminar" + this.tipo;
  }),

  actions: {
    ocultar() {
      this.set("modalVisible", false);
    },
    mostrar() {
      this.set("modalVisible", true);
    },
    ocultarEjecutandoAccion() {
      this.send("ocultar");
      this.accion();
    }
  }
});
