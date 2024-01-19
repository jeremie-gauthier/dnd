const { promisify } = require('node:util');
const jwt = require('jsonwebtoken');
const jwksClient = require('jwks-rsa');

// const fetchJwksUri = async (issuer) => {
//   const response = await fetch(`${issuer}/.well-known/openid-configuration`);
//   console.log(response);
//   const { jwks_uri } = await response.json();
//   return jwks_uri;
// };

const getKey = (header, callback) => {
  const client = jwksClient({
    jwksUri: `https://dev-bzwd13qtp70ke1ou.eu.auth0.com/.well-known/jwks.json`,
    cache: true,
  });
  client.getSigningKey(header.kid, (err, key) => {
    // if (err) {
    //   return callback(err);
    // }
    // console.log(key.publicKey, key.rsaPublicKey, key.getPublicKey());
    callback(err, key.publicKey || key.rsaPublicKey);
  });
};

/**
 * Verify an OpenID Connect ID Token
 * @param {string} token - The JWT Token to verify
 */
const verify = async (token) => {
  // const jwksUri = await fetchJwksUri(issuer);
  // const jwksUri = `https://dev-bzwd13qtp70ke1ou.eu.auth0.com/.well-known/jwks.json`;
  return promisify(jwt.verify)(token, getKey);
};

const token =
  'eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCIsImtpZCI6ImU5dktCdnBJQV9pZFVaNGVKN0p2NCJ9.eyJuaWNrbmFtZSI6ImhlaW1kYWxoIiwibmFtZSI6ImhlaW1kYWxoIiwicGljdHVyZSI6Imh0dHBzOi8vY2RuLmRpc2NvcmRhcHAuY29tL2F2YXRhcnMvMjgyMTk2ODg2NjYyODA3NTUzLzQxNjM1MmIyYzdjNDRlN2NlMmJlYzFjMGZjYmFmZTYyLnBuZyIsInVwZGF0ZWRfYXQiOiIyMDIzLTEyLTMwVDE1OjQwOjU4LjIwM1oiLCJlbWFpbCI6ImplcmVtaWVndGhyQGdtYWlsLmNvbSIsImVtYWlsX3ZlcmlmaWVkIjp0cnVlLCJpc3MiOiJodHRwczovL2Rldi1iendkMTNxdHA3MGtlMW91LmV1LmF1dGgwLmNvbS8iLCJhdWQiOiJCY2hHY0Q3WUhnNGw1QUR6ZElleERlMWZYbzF2NndCOSIsImlhdCI6MTcwMzk1MDg1OCwiZXhwIjoxNzAzOTg2ODU4LCJzdWIiOiJvYXV0aDJ8ZGlzY29yZHwyODIxOTY4ODY2NjI4MDc1NTMiLCJzaWQiOiI1R0FDT2dkY2l3TnJCUDNjMlNNckozNEZ3c04wVUhZeiIsIm5vbmNlIjoiYkM0MlkwZEhNQzFTUTNaRFFqWnFhRUZHVUZGT00xVlROR2RWYm1WelJsaGlZVmsxVGkxeGMyY3VVdz09In0.pxAONJBDUU6dJ5H2HGGBXBTvj3F69ppwiaJatCQua-qIGyOIz4WR_LtDHeR1rxU2hIwROn2BploQgjQnNcaU0VIz2Hdojz51Ty07sP1ldaTz3Gz4UzcSoaTfcjQ7UKxNTkBoVp-uptBtjbOY1_fqzQzKPMOTFzQbP8atDaf1r4KrR6VqVXMsAMHKRWNpqiPLKH4EI5m9Z7jsXmWPAkin8780Ysl6Em-KN2UZzpkdxKl8t2YP-FjMpyHptR08VG63FP5Di-LVNPUiL7MEagcVxSFhqVi5fJ7HDS2mL3zy3rAyAKhJ8L8jxR0jqQAwo45PJgw8WEJcTrybtknshFQ4dQ';
verify(token)
  .then(() => {
    console.log('Token verified successfully.');
  })
  .catch(console.error);

const promiseGetKey = (header) =>
  new Promise((resolve, reject) => {
    const client = jwksClient({
      jwksUri: `https://dev-bzwd13qtp70ke1ou.eu.auth0.com/.well-known/jwks.json`,
      cache: true,
    });

    client.getSigningKey(header.kid, (err, key) => {
      if (err) {
        reject(err);
      } else {
        resolve(key?.getPublicKey());
      }
    });
  });

const promiseVerify = (token) =>
  new Promise(async (resolve, reject) => {
    // const decoded = jwt.decode(token, { complete: true });
    // if (!decoded) {
    //   throw new Error('cannot decode token');
    // }

    // const key = await promiseGetKey(decoded.header);
    // console.log(key);

    return jwt.verify(token, getKey, (err, decodedToken) => {
      if (err) {
        reject(err);
      } else {
        resolve(decodedToken);
      }
    });
  });

promiseVerify(token)
  .then(() => {
    console.log('Token promised verified successfully.');
  })
  .catch(console.error);

// TODO : Ca semble fonctionnel, reste plus qu'a le porter sur NestJS
