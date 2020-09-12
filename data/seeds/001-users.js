exports.seed = function (knex, Promise) {
  // Deletes ALL existing entries
  return knex('users')
    .truncate()
    .then(function () {
      // Inserts seed entries
      return knex('users').insert([
        {
          firstname: 'Test',
          lastname: 'Test',
          username: 'Test',
          password: 'Test',
        },
      ]);
    });
};
