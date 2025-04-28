const mongoose = require('mongoose');

// Definición del esquema de Fraccionamientos
const fraccionamientoSchema = new mongoose.Schema({
  id_fraccionamiento: {
    type: Number, // Usamos Number para el tipo INT
    unique: true, // Asegura que cada ID sea único
    required: true, // Hace que el ID sea obligatorio
    min: 10000, // Mínimo 5 dígitos
    max: 99999, // Máximo 5 dígitos
  },
  descripcion: {
    type: String, // Usamos String para el tipo Texto
    maxlength: 255, // Puedes definir una longitud máxima si lo deseas
  },
});

// Middleware para asignar id_fraccionamiento automáticamente si no viene en el body
fraccionamientoSchema.pre('save', async function (next) {
  if (this.isNew && this.id_fraccionamiento == null) {
    const ultimo = await mongoose.model('Fraccionamiento').findOne().sort({ id_fraccionamiento: -1 }).limit(1);
    this.id_fraccionamiento = ultimo ? ultimo.id_fraccionamiento + 1 : 10000;  // Comienza desde el 10000 si no hay datos previos

    // Validación: asegurar que el id_fraccionamiento esté dentro de los 5 dígitos
    if (this.id_fraccionamiento > 99999) {
      return next(new Error('Se alcanzó el límite de IDs permitidos (máximo 99999)'));
    }
  }
  next();
});

// Método para mostrar datos (opcional, pero útil)
fraccionamientoSchema.methods.showData = function() {
  return {
    id_fraccionamiento: this.id_fraccionamiento,
    descripcion: this.descripcion,
  };
};

// Creación del modelo Fraccionamiento
const Fraccionamiento = mongoose.model('Fraccionamiento', fraccionamientoSchema, 'fraccionamientos');

module.exports = Fraccionamiento;
