const Departamento = require('../models/departamentos'); // Ajusta la ruta si es necesario

// Crear un nuevo departamento
const crearDepartamento = async (req, res) => {
    try {
        // Si no se envía el id_departamento, se genera automáticamente
        const nuevoDepartamento = new Departamento(req.body);
        await nuevoDepartamento.save();
        res.status(201).json({
            mensaje: 'Departamento creado exitosamente',
            departamento: nuevoDepartamento.showData()
        });
    } catch (error) {
        res.status(400).json({ mensaje: 'Error al crear departamento', error: error.message });
    }
};

// Editar un departamento existente por id_departamento
const editarDepartamento = async (req, res) => {
    try {
        const departamentoActualizado = await Departamento.findOneAndUpdate(
            { id_departamento: req.params.id },  // Buscar por id_departamento
            req.body,
            { new: true }
        );
        if (!departamentoActualizado) {
            return res.status(404).json({ mensaje: 'Departamento no encontrado' });
        }
        res.json({
            mensaje: 'Departamento actualizado',
            departamento: departamentoActualizado.showData()
        });
    } catch (error) {
        res.status(400).json({ mensaje: 'Error al editar departamento', error: error.message });
    }
};

// Eliminar un departamento por id_departamento
const eliminarDepartamento = async (req, res) => {
    try {
        const eliminado = await Departamento.findOneAndDelete({ id_departamento: req.params.id });
        if (!eliminado) {
            return res.status(404).json({ mensaje: 'Departamento no encontrado' });
        }
        res.json({ mensaje: 'Departamento eliminado' });
    } catch (error) {
        res.status(400).json({ mensaje: 'Error al eliminar departamento', error: error.message });
    }
};

// Mostrar todos los departamentos
const mostrarDepartamentos = async (req, res) => {
    try {
        const departamentos = await Departamento.find();
        const departamentosFormateados = departamentos.map(dep => dep.showData());
        res.json(departamentosFormateados);
    } catch (error) {
        res.status(500).json({ mensaje: 'Error al obtener departamentos', error: error.message });
    }
};

module.exports = {
    crearDepartamento,
    editarDepartamento,
    eliminarDepartamento,
    mostrarDepartamentos
};
