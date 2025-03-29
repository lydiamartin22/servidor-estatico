const {createServer} = require("http");
const {createReadStream, stat} = require("fs");

function contentType(extension){
    if(extension == "html") return "text/html";
    if(extension == "css") return "text/css";
    if(extension == "js") return "text/javascript";
    if(extension == "jpg" || extension == "jpeg") return "image/jpeg";
    if(extension == "png") return "image/png";
    return "text/plain";
}

function servirFichero(respuesta, ruta, tipo, estado){
    respuesta.writeHead(estado, {"Content-type": tipo});

    let fichero = createReadStream(ruta);

    fichero.pipe(respuesta);

    fichero.on("end", () => respuesta.end());
}

createServer((peticion, respuesta) => {
    if(peticion.url == "/"){
        servirFichero(respuesta, "./estaticos/index.html", contentType("html"), 200);
    }else{
        let ruta = "./estaticos" + peticion.url;
        stat(ruta, (error, informacion) => {
            if(!error && informacion.isFile()){
                return servirFichero(respuesta, ruta, contentType(ruta.split(".").pop()),200);
            }
            servirFichero(respuesta, "./404.html",contentType("html"),404);
        });
    }

}).listen(process.env.PORT || 4000);