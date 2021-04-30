
<?php
    define('Host', 'localhost');
    define('User', 'root');
    define('Password', 'Utn&Cbo&V1');
    define('Database', 'world');

//    require_once "Configuration.php";

    class Connection{
        public $connection;

        public function OpenConnection(){
            $this->connection = new mysqli(Host, User, Password, Database) or die("NO SE PUDO REALIZAR LA CONEXIÓN A LA BD");
            $this->connection->set_charset("utf8");

            return $this->connection;
        }

        public function CloseConnection(){
            if( $this->connection ){
                $this->connection->close();
            }
        }
    }
?>
