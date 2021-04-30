
<?php
    require_once "../Model/ConnectionClass.php";

    class CountryClass{
        public $ConnectClass;
        public $connection;
        public $Results;

        function __construct(){
            $this->ConnectClass = new Connection();
            $this->connection = $this->ConnectClass->OpenConnection();
        }

        function Get_AllCountries(){
            $Query = "SELECT *FROM country;";
            $ResultSet = $this->connection->query($Query);
            $rows = $ResultSet->num_rows;

            if( $rows > 0 ){

                for( $i=0; $i<$rows; $i++){
                    $All_data[$i] = $ResultSet->fetch_assoc();
                }

                $this->Results = $All_data;

                return true;
            }else{
                return false;
            }

            $connection->CloseConnection();
        }
        
        function Update_CountryById($ID){}
        function Delete_CountryByID($id){}
        function Create_Country($Parameters){}


    }
?>
