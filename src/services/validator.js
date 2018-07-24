import validation from 'validator';

export const keys = {
  EMAIL_VALIDATION: 'WMV48Z',
  PASSWORD_VALIDATION: 'AF6C77',
};

export const validator = {
  email: email => typeof email === 'string' && validation.isEmail(email),
  password: password =>
    password &&
    new RegExp('^(?=.*[a-zA-Z])(?=.*[0-9])(?=.{6,})').test(password),
  firstName: firstName =>
    firstName && new RegExp(/^[a-z ,.'-]+$/i).test(firstName),
  lastName: lastName => lastName && new RegExp(/^[a-z ,.'-]+$/i).test(lastName),
  country: iso => typeof iso === 'string' && validation.isISO31661Alpha2(iso),
  location: location => validation.isLatLong(location),
  radius: radius => validation.isInt(radius, { gt: 1, lt: 90 }),
  productTitle: title =>
    typeof title === 'string' &&
    validation.isLength(title, { min: 5, max: 20 }),
  productDescription: description =>
    typeof description === 'string' &&
    validation.isLength(description, {
      min: 10,
      max: 255,
    }),
  productPrice: price =>
    typeof price === 'object' &&
    price.hasOwnProperty('min') &&
    price.hasOwnProperty('max'),
};
