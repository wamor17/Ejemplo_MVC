
$(function(){
    $('.example').html('<h4> Hola mundo </h4>');

    getAllCountries();
});

function getAllCountries(){
    act = "__allCountries";
    
    $.post('Controller/CountryController.php', {Action: act}, function(data_receive){
        Data = JSON.parse(data_receive);
        console.log( " Countries => ", Data[0] );

        var collection_items = "";
        for(var i=0; i<5; i++){
            collection_items = collection_items + "<tr>" +
                                                    "<td>" + Data[i].Code           + "</td>"+
                                                    "<td>" + Data[i].Name           + "</td>"+
                                                    "<td>" + Data[i].GovernmentForm + "</td>"+
                                                    "<td>" + Data[i].Continent      + "</td>"+
                                                    "<td>" + Data[i].Region         + "</td>"+
                                                    "<td>" + Data[i].Population     + "</td>"+
                                                +"</tr>";
        }

        $('.world_countries').html(collection_items);
    });
}
