exports.seed = function (knex, Promise) {
  // Deletes ALL existing entries
  return knex('users')
    .truncate()
    .then(function () {
      // Inserts seed entries
      return knex('users').insert([
        {
          firstname: 'Blake',
          lastname: 'Davis',
          username: 'bdavis',
          password:
            '$2a$10$i50Hxak017e147R93G4rWu07/8aJcpU0E2MV6F6Ul.rL2x8yddUGu',
        },
      ]);
    });
};
