module.exports = {
  //connectionUri: 'postgres://user:pass@example.com:5432/dbname',
  connectionUri: 'sqlite::memory:',
  //connectionUri: 'mysql://user:pass@example.com:5432/dbname',
  basePath: '/api/v1',
  defaultPageItems: 15,
  jwtSecret: 'secretsecretsecretsecret',
  jwtExpires: '1d'
};