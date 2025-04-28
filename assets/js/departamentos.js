const mongoose = require('mongoose');

const departamentoSchema = new mongoose.Schema({
  id_departamento: {
    type: Number,
    unique: true,
    required: true,
    min: 10000,
    max: 99999
  },
  descripcion: {
    type: String,
    maxlength: 255
  }
});

// Middleware: generar id_departamento de 5 dígitos aleatorios si no viene en el body
departamentoSchema.pre('save', async function (next) {
  if (this.isNew && this.id_departamento == null) {
    let generado;
    let existe = true;
    let intentos = 0;

    // Intentar hasta 10 veces generar un ID único de 5 dígitos
    while (existe && intentos < 10) {
      generado = Math.floor(Math.random() * 90000) + 10000; // entre 10000 y 99999
      const existente = await mongoose.model('Departamento').findOne({ id_departamento: generado });
      if (!existente) {
        existe = false;
        this.id_departamento = generado;
      }
      intentos++;
    }

    if (existe) {
      return next(new Error('No se pudo generar un ID único de 5 dígitos después de varios intentos'));
    }
  }
  next();
});

// Método para mostrar datos
departamentoSchema.methods.showData = function () {
  return {
    id_departamento: this.id_departamento,
    descripcion: this.descripcion
  };
};

const Departamento = mongoose.model('Departamento', departamentoSchema);
module.exports = Departamento;
