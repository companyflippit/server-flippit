const whitelist = [
  'http://flippitdemo.es',
  'https://nekodifications.com',
  'https://www.sweetparanoia.com',
  'http://localhost:4200',
  'http://localhost:3000',
  'http://localhost:3333',
  'null',
];

const corsOptions = {
  origin: (origin, callback) => {
    const originIsWhitelisted = whitelist.indexOf(origin) !== -1;
    callback(null, originIsWhitelisted);
  },
  credentials: true,
};

module.exports = {
  corsOptions,
};
