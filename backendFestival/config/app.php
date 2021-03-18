<?php

require_once "vendor/autoload.php";

//CORS y Preestablecidos.
mb_internal_encoding("UTF-8");
date_default_timezone_set('Europe/Madrid');
header("Access-Control-Allow-Methods: GET,PUT,POST,DELETE");