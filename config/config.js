module.exports = {
  //connectionUri: 'postgres://user:pass@example.com:5432/dbname',
  connectionUri: 'postgres://dkuzuxidecsfzo:9ff9f6b7fd3552d676358f39a1dc0585eacfb5bc42b3811de5036273d43c233f@ec2-35-171-250-21.compute-1.amazonaws.com:5432/d2rj75f76vmt5p',
  // connectionUri: 'sqlite::memory:',
  //connectionUri: 'mysql://user:pass@example.com:5432/dbname',
  basePath: '/api/v1',
  defaultPageItems: 15,
  jwtSecret: 'secretsecretsecretsecret',
  jwtExpires: '1d'
};
To use locally, use connectionUri: 'sqlite::memory:',