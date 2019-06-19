class ceferino extends Actor {
  propiedades = {
    imagen: "imagenes:basicos/invisible"
  };

  contenedor: any;
  huesos: Huesos;

  iniciar() {
    this.contenedor = this.pilas.modo.add.container();
    this.huesos = new Huesos(this.pilas, "ceferino", "atlas-ceferino", this.contenedor);
  }

  actualizar() {
    this.huesos.actualizar_animacion(8);

    if (this.pilas.control.izquierda || this.pilas.control.derecha) {
      if (this.pilas.control.izquierda) {
        this.x -= 5;
        this.espejado = true;
        this.huesos.definir_animacion("camina");
      }

      if (this.pilas.control.derecha) {
        this.x += 5;
        this.espejado = false;
        this.huesos.definir_animacion("camina");
      }
    } else {
      this.huesos.definir_animacion("mueve");
    }
  }

  pre_actualizar() {
    this.pilas.utilidades.sincronizar_contenedor(this.contenedor, this.sprite);
  }
}
