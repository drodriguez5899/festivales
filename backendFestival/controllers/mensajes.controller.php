<?php

class MensajesController {
    private $db = null;

    function __construct($conexion) {
      $this->db = $conexion;
    }

  
    public function obtenerMensajes() {
      $eval = "SELECT * FROM mensajes WHERE (idUser IS NULL";
      $eval .= (IDUSER ? " OR idUser = ". IDUSER : null).")";

      $peticion = $this->db->prepare($eval);
      $peticion->execute();
      $resultado = $peticion->fetchAll(PDO::FETCH_OBJ);
      exit(json_encode($resultado));
   
      exit(json_encode(["error" => "Fallo de autorizacion"]));       
      }
      
    
    
    public function publicarMensaje() {
      $mensaje = json_decode(file_get_contents("php://input"));
  
      if(!isset($mensaje->titulo) || !isset($mensaje->contenido)) {
        http_response_code(400);
        exit(json_encode(["error" => "No se han enviado todos los parametros"]));
      }
  
      $peticion = $this->db->prepare("INSERT INTO mensajes (titulo,contenido,idUser) VALUES (?,?,?)");
      $resultado = $peticion->execute([$mensaje->titulo,$mensaje->contenido,IDUSER]);
      http_response_code(201);
      exit(json_encode("Mensaje creada correctamente"));
    }
  
    public function editarMensaje() {
      $mensaje = json_decode(file_get_contents("php://input"));
      if(IDUSER) {
        if(!isset($mensaje->id) || !isset($mensaje->titulo) || !isset($mensaje->contenido)) {
          http_response_code(400);
          exit(json_encode(["error" => "No se han enviado todos los parametros"]));
        }
        $eval = "UPDATE mensajes SET titulo=?, contenido=? WHERE id=? AND idUser=?";
        $peticion = $this->db->prepare($eval);
        $resultado = $peticion->execute([$mensaje->titulo,$mensaje->contenido,$mensaje->id,IDUSER]);
        http_response_code(201);
        exit(json_encode("Mensaje actualizado correctamente"));
      } else {
        http_response_code(401);
        exit(json_encode(["error" => "Fallo de autorizacion"]));        
      }
    }
  
    public function eliminarMensaje($id) {
      if(empty($id)) {
        http_response_code(400);
        exit(json_encode(["error" => "Peticion mal formada"]));    
      }
      if(IDUSER) {
        $eval = "DELETE FROM mensajes WHERE id=? AND idUser=?";
        $peticion = $this->db->prepare($eval);
        $resultado = $peticion->execute([$id,IDUSER]);
        http_response_code(200);
        exit(json_encode("mensaje eliminado correctamente"));
      } else {
        http_response_code(401);
        exit(json_encode(["error" => "Fallo de autorizacion"]));            
      }
    }


    public function subirAvatar() {
      if(is_null(IDUSER)){
        http_response_code(401);
        exit(json_encode(["error" => "Fallo de autorizacion"]));
      }
      if(isset($_FILES['imagen'])) {
        $imagen = $_FILES['imagen'];
        $mime = $imagen['type'];
        $size = $imagen['size'];
        $rutaTemp = $imagen['tmp_name'];
    
        //Comprobamos que la imagen sea JPEG o PNG y que el tamaño sea menor que 400KB.
        if( !(strpos($mime, "jpeg") || strpos($mime, "png")) || ($size > 400000) ) {
          http_response_code(400);
          exit(json_encode(["error" => "La imagen tiene que ser JPG o PNG y no puede ocupar mas de 400KB"]));
        } else {
    
          //Comprueba cual es la extensión del archivo.
          $ext = strpos($mime, "jpeg") ? ".jpg":".png";
          $nombreFoto = "p-".IDUSER."-".time().$ext;
          $ruta = ROOT."images/".$nombreFoto;
    
          //Comprobamos que el usuario no tenga mas fotos de perfil subidas al servidor.
          //En caso de que exista una imagen anterior la elimina.
          $imgFind = ROOT."images/p-".IDUSER."-*";
          $imgFile = glob($imgFind);
          foreach($imgFile as $fichero) unlink($fichero);
          
          //Si se guarda la imagen correctamente actualiza la ruta en la tabla usuarios
          if(move_uploaded_file($rutaTemp,$ruta)) {
    
            //Prepara el contenido del campo imgSrc
            $imgSRC = "http://localhost/backendFestival/images/".$nombreFoto;
    
            $eval = "UPDATE mensajes SET imgSrc=? WHERE id=?";
            $peticion = $this->db->prepare($eval);
            $peticion->execute([$imgSRC,IDUSER]);
    
            http_response_code(201);
            exit(json_encode("Imagen actualizada correctamente"));
          } else {
            http_response_code(500);
            exit(json_encode(["error" => "Ha habido un error con la subida"]));      
          }
        }
      }  else {
        http_response_code(400);
        exit(json_encode(["error" => "No se han enviado todos los parametros"]));
      }
    }
  }