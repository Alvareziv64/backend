const main = async () => {
const response = await fetch("templates/index.hbs")
const templateText= await response.text();
const template = Handlebars.compile(templateText);
const html = template({ nombre: "coder" });
document.querySelector("span").innerHTML = html;
}

main();