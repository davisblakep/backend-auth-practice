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
            '$2a$10$ZwcZDiyzbqXerbb5GLalWOwwmHry6Lgs873BGQhQx1Tec4zolBtEi',
        },
      ]);
    });
};
