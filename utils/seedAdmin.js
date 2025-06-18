const Admin = require('../models/Admin');

const seedAdmin = async () => {
  const existing = await Admin.findOne({ username: 'Sur_propiedades' });
  if (existing) {
    console.log('🟡 Admin ya existe');
    return;
  }

  const newAdmin = new Admin({
    username: 'Sur_propiedades',
    password: 'Sur765179*', // Este valor será hasheado automáticamente
  });

  await newAdmin.save();
  console.log('✅ Admin inicial creado');
};

module.exports = seedAdmin;
