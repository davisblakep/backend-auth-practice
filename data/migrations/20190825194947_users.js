exports.up = function (knex) {
  return knex.schema.createTable('users', (users) => {
    users.increments('id');
    users.string('firstname').notNullable();
    users.string('lastname').notNullable();
    users.string('username', 128).notNullable().unique();
    users.string('password', 128).notNullable();
  });
};

exports.down = function (knex) {
  return knex.schema.dropTableIfExists('users');
};
