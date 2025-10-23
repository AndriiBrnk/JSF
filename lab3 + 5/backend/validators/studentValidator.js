const { body, validationResult } = require('express-validator');

const studentRules = [
  body('firstName')
    .trim()
    .notEmpty().withMessage('firstName is required')
    .matches(/^[^\d]+$/).withMessage('firstName must not contain digits'),
  body('lastName')
    .trim()
    .notEmpty().withMessage('lastName is required')
    .matches(/^[^\d]+$/).withMessage('lastName must not contain digits'),
  body('birthDate')
    .notEmpty().withMessage('birthDate is required')
    .isISO8601().toDate().withMessage('birthDate must be a valid date'),
  body('groupNumber')
    .notEmpty().withMessage('groupNumber is required')
    .isInt({ min: 0, max: 999 }).withMessage('groupNumber must be integer 0-999'),
];

const validate = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  next();
};

module.exports = {
  studentRules,
  validate,
};
