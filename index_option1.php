<!DOCTYPE html>
<html lang="es">
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

            <div class="card">
                <div class="card-content">

                    <span class="card-title"><h4>Countries of the world</h4></span>

                    <table>
                        <thead>
                            <tr>
                                <th>Code        </th>
                                <th>Name        </th>
                                <th>GovernmentForm     </th>
                                <th>Continent   </th>
                                <th>Region      </th>
                                <th>Population  </th>
                            </tr>
                        </thead>

                        <tbody id="world_view" class="world_countries">
                        </tbody>
                    </table>

                </div>
            </div>
            
        </div>
        <div class="col l1"></div>
    </div>

    <script src="Resource/jQuery/jquery-3.2.1.min.js"></script>
    <script src="Resource/Materialize/materialize.min.js"></script>
    <script src="Resource/js/app.js"></script>
</body>
</html>