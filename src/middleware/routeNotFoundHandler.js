module.exports = (req, res, next) => {
  return res.status(404).json({ 
    success: false, 
    message: `Route '${req.originalUrl}' tidak ditemukan` 
  });
};
