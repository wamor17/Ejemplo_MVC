
window.onload = FunctInicializer;

var NewsContent = document.getElementById("news-content");
var News;

function FunctInicializer(){
    $('.menu-options').children().eq(2).addClass('active');
    News = firebase.database().ref().child("news");
    ShowNews();
}

function ShowNews(){
    var cards = "<h5> &Uacute;ltimas noticias <a class='btn-floating waves-effect blue darken-2 right'> <i class='material-icons'>add</i></a> </h5>";
    NewsContent.innerHTML = cards;

    News.on("value", function(v){
        var datos = v.val();

        for(var i in datos){ 
            cards = cards +
            "<div class='card'>"+
                "<div class='card-content'>"+
                    "<span class='card-title'>"+datos[i].title+"</span>"+
                    datos[i].content+
                "</div>"+
                "<div class='card-action'> Fecha: "+datos[i].date+"</div>"+
            "</div>"
        }

        NewsContent.innerHTML = cards;
    });
}
