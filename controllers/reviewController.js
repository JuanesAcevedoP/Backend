const Review = require('../models/Review');

// Crear nueva reseña
const createReview = async (req, res) => {
  try {
    const { name, comment, rating } = req.body;

    if (!name || !comment || !rating) {
      return res.status(400).json({ message: 'Todos los campos son obligatorios' });
    }

    const newReview = new Review({ name, comment, rating });
    await newReview.save();

    res.status(201).json({ message: 'Reseña creada correctamente', review: newReview });
  } catch (error) {
    console.error('Error al crear reseña:', error);
    res.status(500).json({ message: 'Error del servidor' });
  }
};

// Obtener todas las reseñas
const getReviews = async (req, res) => {
  try {
    const reviews = await Review.find().sort({ createdAt: -1 });
    res.status(200).json(reviews);
  } catch (error) {
    console.error('Error al obtener reseñas:', error);
    res.status(500).json({ message: 'Error del servidor' });
  }
};

module.exports = {
  createReview,
  getReviews
};
