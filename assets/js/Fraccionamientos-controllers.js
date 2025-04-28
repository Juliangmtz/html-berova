const Fraccionamiento = require('../models/fraccionamientos'); // Ajusta la ruta si es necesario

// Crear un nuevo fraccionamiento
const crearFraccionamiento = async (req, res) => {
    try {
        const nuevoFraccionamiento = new Fraccionamiento(req.body);
        await nuevoFraccionamiento.save();
        res.status(201).json({
            mensaje: 'Fraccionamiento creado exitosamente',
            fraccionamiento: nuevoFraccionamiento.showData(),
        });
    } catch (error) {
        res.status(400).json({ mensaje: 'Error al crear fraccionamiento', error: error.message });
    }
};

// Editar un fraccionamiento existente por id_fraccionamiento
const editarFraccionamiento = async (req, res) => {
    try {
        const fraccionamientoActualizado = await Fraccionamiento.findOneAndUpdate(
            { id_fraccionamiento: req.params.id },
            req.body,
            { new: true }
        );
        if (!fraccionamientoActualizado) {
            return res.status(404).json({ mensaje: 'Fraccionamiento no encontrado' });
        }
        res.json({
            mensaje: 'Fraccionamiento actualizado',
            fraccionamiento: fraccionamientoActualizado.showData(),
        });
    } catch (error) {
        res.status(400).json({ mensaje: 'Error al editar fraccionamiento', error: error.message });
    }
};

// Eliminar un fraccionamiento por id_fraccionamiento
const eliminarFraccionamiento = async (req, res) => {
    try {
        const eliminado = await Fraccionamiento.findOneAndDelete({ id_fraccionamiento: req.params.id });
        if (!eliminado) {
            return res.status(404).json({ mensaje: 'Fraccionamiento no encontrado' });
        }
        res.json({ mensaje: 'Fraccionamiento eliminado' });
    } catch (error) {
        res.status(400).json({ mensaje: 'Error al eliminar fraccionamiento', error: error.message });
    }
};

// Mostrar todos los fraccionamientos
const mostrarFraccionamientos = async (req, res) => {
    try {
        const fraccionamientos = await Fraccionamiento.find();
        const fraccionamientosFormateados = fraccionamientos.map(frac => frac.showData());
        res.json(fraccionamientosFormateados);
    } catch (error) {
        res.status(500).json({ mensaje: 'Error al obtener fraccionamientos', error: error.message });
    }
};

module.exports = {
    crearFraccionamiento,
    editarFraccionamiento,
    eliminarFraccionamiento,
    mostrarFraccionamientos,
};
