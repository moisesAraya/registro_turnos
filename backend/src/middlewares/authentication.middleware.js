export function authenticateJwt(req, res, next) {
  console.log('Authorization Header:', req.headers.authorization); // Añadir log
  passport.authenticate("jwt", { session: false }, (err, user, info) => {
    if (err) {
      console.error('Error en authenticateJwt:', err); // Añadir log
      return handleErrorServer(
        res,
        500,
        "Error de autenticación en el servidor"
      );
    }

    if (!user) {
      console.warn('Usuario no autenticado:', info); // Añadir log
      return handleErrorClient(
        res,
        401,
        "No tienes permiso para acceder a este recurso",
        { info: info ? info.message : "No se encontró el usuario" }
      )
    }

    req.user = user;
    next();
  })(req, res, next);
}
