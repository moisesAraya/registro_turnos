import passport from "passport";

export function authenticateJwt(req, res, next) {
  console.log('Authorization Header:', req.headers.authorization);

  passport.authenticate("jwt", { session: false }, (err, user, info) => {
    if (err) {
      console.error('Error en authenticateJwt:', err);
      return res.status(500).json({
        message: "Error de autenticación en el servidor",
        error: err.message,
      });
    }

    if (!user) {
      console.warn('Usuario no autenticado:', info);
      return res.status(401).json({
        message: "No tienes permiso para acceder a este recurso",
        info: info ? info.message : "No se encontró el usuario",
      });
    }

    req.user = user; // Usuario autenticado
    next();
  })(req, res, next);
}
