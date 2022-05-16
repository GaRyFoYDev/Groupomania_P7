const jwt = require('jsonwebtoken');

// Middleware d'authentification 
module.exports = (req, res, next) => {
  try {
    const token = req.headers.authorization.split(' ')[1];
    const decodedToken = jwt.verify(token, process.env.SECRET);
    const userUuid = decodedToken.userUuid;

    // Vérification de la concordance entre les clés utilisateurs
    if (req.body.userUuid && req.body.userUuid !== userUuid ) {
      throw 'User ID non valable !';
    } else {
      next();
    }
  } catch (error) {
    res.status(401).json(error);
  }
};