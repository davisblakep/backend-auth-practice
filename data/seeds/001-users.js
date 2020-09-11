exports.seed = function (knex, Promise) {
  // Deletes ALL existing entries
  return knex('users')
    .truncate()
    .then(function () {
      // Inserts seed entries
      return knex('users').insert([
        {
          username: 'bdavis',
          password:
            '$2a$10$TxPuQorlWTbJo2Vqh7Pk0OKV0QxTrERzGet0LDeVVwkbEivNouiMS',
        },
        {
          username: 'fwallaby',
          password:
            '$2a$10$RJj9FjEgrFDYdH8HSIwliufudALkAvTI76EG9aDCZCazoqwF4CBbW',
        },
        {
          username: 'lfrank',
          password:
            '$2a$10$9l7GmZbAlgBU7N00UzbmEOIIO1h7oF41wgC1plLcZAoFI6uC/5Any',
        },
      ]);
    });
};
