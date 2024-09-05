const User = require('../models/User');
const Role = require('../models/Role');
const Permission = require('../models/Permission');

// Middleware to check if user has required role
const checkRole = (roleName) => async (req, res, next) => {
  try {
    const user = await User.findById(req.user._id).populate('roles');
    if (user.roles.some(role => role.roleName === roleName)) {
      next();
    } else {
      res.status(403).json({ message: 'Access denied' });
    }
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
};

// Middleware to check if user has required permission
const checkPermission = (permissionName) => async (req, res, next) => {
  try {
    const user = await User.findById(req.user._id).populate('permissions');
    if (user.permissions.some(permission => permission.permissionName === permissionName)) {
      next();
    } else {
      res.status(403).json({ message: 'Access denied' });
    }
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
};

module.exports = { checkRole, checkPermission };
