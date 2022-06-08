const { clienteSql, clienteSqlite} = require("./clienteSql.js");

clienteSql.schema
  .hasTable("products")
  .then((exists) => {
    if (!exists) {
      clienteSql.schema
        .createTable("products", (tabla) => {
          tabla.increments("id"), tabla.string("title"), tabla.integer("price");
          tabla.string("thumbnail");
        })
        .then(() => {
          console.log("Product table created");
        });
    } else {
      console.log("Product table already exists");
    }
  })
  .finally(() => {
    clienteSql.destroy();
  });

  clienteSqlite.schema
  .hasTable("chat")
  .then((exists) => {
    if (!exists) {
      clienteSqlite.schema
        .createTable("chat", (tabla) => {
          tabla.string("autor"), tabla.string("texto");
          tabla.date("fecha");
        })
        .then(() => {
          console.log("Chat table created");
        });
    } else {
      console.log("Chat table already exists");
    }
  })
  .finally(() => {
    clienteSqlite.destroy();
  });
