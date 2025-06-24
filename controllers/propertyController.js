const Property = require('../models/Property');

// Crear propiedad
const createProperty = async (req, res) => {
  try {
    const {
      code,
      title,
      type,
      rent,
      price,
      bedrooms,
      bathrooms,
      area,
      location,
      available,
      featured,
      advisorWhatsapp,
      city,
      sector,
      image
    } = req.body;

    if (!image) {
      return res.status(400).json({ message: 'La imagen es requerida' });
    }

    const newProperty = new Property({
      code,
      title,
      type,
      rent,
      price,
      bedrooms,
      bathrooms,
      area,
      location,
      available,
      featured,
      advisorWhatsapp,
      image,
      city,
      sector,
    });

    const savedProperty = await newProperty.save();
    res.status(201).json(savedProperty);
  } catch (error) {
    console.error('Error al crear propiedad:', error);
    res.status(500).json({ message: 'Error del servidor' });
  }
};

// Obtener todas las propiedades
const getAllProperties = async (req, res) => {
  try {
    const properties = await Property.find().sort({ available: -1, createdAt: -1 });
    res.status(200).json(properties);
  } catch (error) {
    console.error('Error al obtener propiedades:', error);
    res.status(500).json({ message: 'Error del servidor' });
  }
};

// Obtener destacadas
const getFeaturedProperties = async (req, res) => {
  try {
    const featured = await Property.find({ featured: true });
    res.status(200).json(featured);
  } catch (error) {
    console.error('Error al obtener destacadas:', error);
    res.status(500).json({ message: 'Error del servidor' });
  }
};

// Obtener por código
const getPropertyByCode = async (req, res) => {
  try {
    const { code } = req.params;
    const property = await Property.findOne({ code });

    if (!property) {
      return res.status(404).json({ message: 'Propiedad no encontrada' });
    }

    res.status(200).json(property);
  } catch (error) {
    console.error('Error al obtener propiedad por código:', error);
    res.status(500).json({ message: 'Error del servidor' });
  }
};

// Actualizar propiedad
const updateProperty = async (req, res) => {
  try {
    const { id } = req.params;
    const updateData = { ...req.body };

    if (req.file?.location) {
      updateData.image = req.file.location; // ✅ Actualiza si se sube nueva imagen
    }

    const updatedProperty = await Property.findByIdAndUpdate(id, updateData, {
      new: true,
    });

    if (!updatedProperty) {
      return res.status(404).json({ message: 'Propiedad no encontrada' });
    }

    res.status(200).json(updatedProperty);
  } catch (error) {
    console.error('Error al actualizar propiedad:', error);
    res.status(500).json({ message: 'Error del servidor' });
  }
};

// Eliminar propiedad
const deleteProperty = async (req, res) => {
  try {
    const { id } = req.params;
    const deleted = await Property.findByIdAndDelete(id);

    if (!deleted) {
      return res.status(404).json({ message: 'Propiedad no encontrada' });
    }

    res.status(200).json({ message: 'Propiedad eliminada' });
  } catch (error) {
    console.error('Error al eliminar propiedad:', error);
    res.status(500).json({ message: 'Error del servidor' });
  }
};

module.exports = {
  createProperty,
  getAllProperties,
  getFeaturedProperties,
  getPropertyByCode,
  updateProperty,
  deleteProperty
};
