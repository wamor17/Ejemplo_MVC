
<?php
    require_once "CountryClass.php";

    $Action = $_POST["Action"];
    $CountryClass = new CountryClass();
    
    switch( $Action ){
        case "__allCountries":
            $Verify = $CountryClass->Get_AllCountries();
            
            if( $Verify ){
                $Data = $CountryClass->Results;
            }else{
                $Data["Status"] = "Error DB connection";
            }
        break;
    }

    echo json_encode($Data);
?>

