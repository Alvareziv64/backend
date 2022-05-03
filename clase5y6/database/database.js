const fs = require("fs");

/*const read = () => {
    return fs.promises.readFile("./database.json", "utf-8").then((data) => {
      return JSON.parse(data);
    });
}
*/

const database = fs.readFile("./database.json", "utf-8", (error, data) => {
    if (error) {
        console.log(error);
    } else {
        return(JSON.parse(data));
    }
}
);


