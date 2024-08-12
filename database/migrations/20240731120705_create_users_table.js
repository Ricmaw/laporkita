exports.up = function(knex) {
  return knex.schema.createTable("complaints", (table) => {
    table.increments("id").primary();
    table.string("name").notNullable();
    table.string("email").notNullable();
    table.string("address").notNullable();
    table.string("phone").notNullable();
    table.string("title").notNullable();
    table.text("content").notNullable();
    table.timestamps(true, true);
  });
};

exports.down = function(knex) {
  return knex.schema.dropTable("complaints");
};
