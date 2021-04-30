<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    
    <title> Ejemplo: desarrollo bajo patrón MVC </title>

    <link rel="stylesheet" type="text/css" href="Resource/Materialize/materialize.min.css"> 
	<link rel="stylesheet" type="text/css" href="Resource/css/app.css">
</head>
<body>



    <div class="row">
        <div class="col l1"></div>
        <div class="col l10">
            <br>

            <?php
                define('Host', 'localhost');
                define('User', 'root');
                define('Password', 'Utn&Cbo&V1');
                define('Database', 'world');

                $connection = new mysqli(Host, User, Password, Database) or die("NO SE PUDO REALIZAR LA CONEXIÓN A LA BD");
                $connection->set_charset("utf8");

                $Query = "SELECT *FROM country;";
                $ResultSet = $connection->query($Query);
                $rows = $ResultSet->num_rows;
            ?>

            <div class="card">
                <div class="card-content">

                    <span class="card-title"><h4>Countries of the world</h4></span>

                    <table>
                        <thead>
                            <tr>
                                <th>Code            </th>
                                <th>Name            </th>
                                <th>GovernmentForm  </th>
                                <th>Continent       </th>
                                <th>Region          </th>
                                <th>Population      </th>
                            </tr>
                        </thead>

                        <tbody>
                            <?php 
                                if( $rows > 0 ){
                                    for( $i=0; $i<5; $i++){
                                        $Data = $ResultSet->fetch_assoc();

                                        echo "<tr>";
                                            echo "<td>".$Data["Code"]."</td>";
                                            echo "<td>".$Data["Name"]."</td>";
                                            echo "<td>".$Data["GovernmentForm"]."</td>";
                                            echo "<td>".$Data["Continent"]."</td>";
                                            echo "<td>".$Data["Region"]."</td>";
                                            echo "<td>".$Data["Population"]."</td>";
                                        echo "</tr>";
                                    }
                                }
                            ?>
                        </tbody>
                    </table>

                </div>
            </div>



        </div>
        <div class="col l1"></div>
    </div>

    <script src="Resource/jQuery/jquery-3.2.1.min.js"></script>
    <script src="Resource/Materialize/materialize.min.js"></script>
<!--    <script src="Resource/js/app.js"></script> -->
</body>
</html>