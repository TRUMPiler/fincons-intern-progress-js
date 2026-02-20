
/**
 * checkRole: factory middleware to enforce role-based access control.
 * - roles: array of allowed role names (e.g., ['admin']).
 * - Expects `req.user.role` to be present (set by earlier auth middleware).
 */
const checkRole = (roles) => {
  return (req, res, next) => {
    if (!req.user || !roles.includes(req.user.role)) {
      return res.status(403).send('Access denied. Insufficient role.');
    }
    next();
  };
};
module.exports=checkRole;