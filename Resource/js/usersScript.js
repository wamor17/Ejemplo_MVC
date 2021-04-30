
// Hidden all the warnings messages
$('.incomplete-data').css('display', 'none');

// Getting user data
const User = JSON.parse( localStorage.getItem("User") );
const Trainer = JSON.parse( localStorage.getItem("TeamAndTrainers") );
var Players = JSON.parse( localStorage.getItem("Players") );
var Image_user;

$('#image-input').change(function(e) {
    var file = e.target.files[0];
    console.log("Name: ", file.name.split('.')[0], "\nFormat: ", file.name.split('.')[1] );
});

console.log("User -> ", User);
console.log("Trainer -> ", Trainer);
console.log("Player -> ", Players);

$(function(){
    $('.btn-save-data-trainer').css('transform', 'scale(0)');
    $('.btn-save-data-auxiliar').css('transform', 'scale(0)');
    $('#btn-add-new-player').css('transform', 'scale(0)');

    $('.trainer-team, .email-contact-team, .t-phone-number-team, .auxiliar-trainer-team, .at-phone-number-team').
    css('border-bottom', 'white');

    // Showing team info
    ShowDataTeam();

    // Showing trainers info
    ShowDataTrainer();

    // Showing players info
    ShowDataPlayers();
    
    var elems = document.querySelectorAll('.fixed-action-btn');
    $('.fixed-action-btn').floatingActionButton();
    var instances = M.FloatingActionButton.init(elems, {
      direction: 'bottom',
      hoverEnabled: false
    });
});

function ShowDataTeam(){
    // Name team
    $('.name-team').text(Trainer.NameTeam+" ("+Trainer.Category+")");
}

function ShowDataTrainer(){
    // Trainer
    var trainer = User.Name+' '+User.FirstLastName+' '+User.SecondLastName;
    $('.trainer-team').val(trainer);
    $('.email-contact-team').val(Trainer.T_Email);
    if( Trainer.T_PhoneNumber !== null ){
        $('.t-phone-number-team').val(Trainer.T_PhoneNumber);
        $('.icomplete-data').css('display', 'none');
    }else{
        $('.t-phone-number-team').val("*No registrado").css('color', 'rgb(215, 215, 215)');
        $('.icomplete-data').css('display', 'block');
    }

    // Trainer auxiliar
    var idauxiliar = Trainer.ID_TrainerAuxiliar;
    if( idauxiliar !== null ){
        // Buscamos el auxiliar por su id
        var act = '__infoauxiliar';
        $.post('Controller/TrainerAuxiliarController.php', {Action: act, ID: Trainer.ID_TrainerAuxiliar}, function(response){
            var aux = JSON.parse(response);
            localStorage.setItem("Auxiliar", JSON.stringify(aux) );

            aux_name = aux.Name+" "+aux.FirstLastName+" "+aux.SecondLastName;
            $('.auxiliar-trainer-team').val(aux_name);
            $('.at-phone-number-team').val(aux.PhoneNumber);
            $('.mssg-optional').css('display', 'none');
        });
    }else{
        var btn_auxiliar = $('.btn-auxiliar');
        btn_auxiliar.find('i').text('add');
        btn_auxiliar.removeClass('yellow').addClass('blue');
        btn_auxiliar.attr('href', '#AddNewAuxiliar');
        btn_auxiliar.attr('data-tooltip', 'Agregar un auxiliar de entrenador');
        
        $('.auxiliar-trainer-team').val("No registrado").css('color', 'rgb(215, 215, 215)');
        $('.at-phone-number-team').val("No registrado").css('color', 'rgb(215, 215, 215)');
        $('.mssg-optional').css('display', 'block');
    }
}

function ShowDataPlayers(){
    if( Players.length > 0 ){
//        $('.players-in-team').empty().append("Jugadores registrados en el equipo <strong>"+Trainer.NameTeam+"</strong> categor&iacute;a "+Trainer.Category+". ");

        var cardWithPlayer = "";
        for(var i=(Players.length - 1); i>=0; i--) {
            
            if( Players[i].DocsComplete && Players[i].DocsValidated ){
                status = "status-player-complete";
                IconUp = "check";
                ColorUp = "green";

                IconVal = "check";
                ColorVal = "green";
            }else{
                status = "status-player-incomplete";

                if( Players[i].DocsComplete ){ IconUp = "check"; ColorUp = "green"; }else{ IconUp = "close";  ColorUp = "red"; }
                if( Players[i].DocsValidated ){ IconVal = "check"; ColorVal = "green"; }else{ IconVal = "close"; ColorVal = "red"; }
            }

            var bday = Players[i].Birthday.split('-');
            var birthday = bday[2]+"/"+bday[1]+"/"+bday[0];
    
            completeName = Players[i].P_Name+" "+Players[i].P_LastName1+" "+Players[i].P_LastName2;
            id = Players[i].ID_Player;
            cardWithPlayer = cardWithPlayer +
                "<div id='card_n"+id+"' class='card-position'>"+
                    "<div class='card "+status+"'>"+
                        "<div class='card-overflow card-image waves-block'>"+
                            "<img class='activator waves-effect img-player center-align' src='Resource/images/background3.jpg'>"+
                            "<span class='card-title card-title-color'><h6 class='name_player_dimension'>"+completeName+"</h6></span>"+
                            
                            "<div class='fixed-action-btn btn-menu-options'>"+
                                "<a class='btn-floating btn-menu-color waves-effect'>"+
                                    "<i class='material-icons'>menu</i>"+
                                "</a>"+
                                "<ul class='buttons'>"+
                                    "<li><a class='btn-floating btn-delete-player red waves-effect modal-trigger' href='#DeletePlayer' onclick='DeletePlayer("+id+")'><i class='material-icons'>delete</i></a></li>"+
                                    "<li><a class='btn-floating yellow darken-1 waves-effect modal-trigger' href='#DataPlayer' onclick='ModifyOrAddPlayer("+id+")'><i class='material-icons'>edit</i></a></li>"+
                                "</ul>"+
                            "</div>"+

                            //"<a class='btn-floating waves-effect halfway-fab btn-middle grey darken-2'><i class='material-icons'>menu</i></a>"+
                        "</div>"+
                        "<div class='card-content'>"+
                            "<span class='card-title activator center-align card-title-player'> Más información <i class='material-icons right'>expand_less</i> </span>"+
                        "</div>"+
                        "<div class='card-reveal'>"+
                            "<span class='card-title grey-text text-darken-4 name-player'> <i class='material-icons right'>expand_more</i> "+completeName+" </span><br>"+
                            "<h6><strong>Fecha de nacimiento:</strong></h6>"+birthday+"<br>"+
                            "<h6><strong>N&uacute;mero de playera:</strong> "+Players[i].PlayerNumber+"</h6><br>"+
                            "<h6><strong>Estatus de documentos:</strong></h6>"+
                            "<h6><i class='material-icons "+ColorUp+" white-text right'>"+IconUp+"</i>Subidos</h6>"+
                            "<h6><i class='material-icons "+ColorVal+" white-text right'>"+IconVal+"</i>Validados</h6>"+
                        "</div>"+
                    "</div>"+
                "</div>"; 
        }
        
        $('.players-cards').empty().append(cardWithPlayer);
    }else{
        $('.players-in-team').empty().append("Click en el botón azul para agregar un jugador.");
    }
}

// SHOW OR HIDE THE ADD NEW PLAYER BUTTON
$('.tabs .tab').on('click', function(){
    var option = $(this).find('a').text().toString();

    if( option == 'Jugadores' ){
        $('#btn-add-new-player').css('transform', 'scale(1)');
    }else{
        $('#btn-add-new-player').css('transform', 'scale(0)');
    }
});

// SHOW THE IMAGEN TO UPLOAD
$('#image-input').change(function(e) {
    addImage(e);
});

function addImage(e){
    var file = e.target.files[0], imageType = /image.*/;

    if (!file.type.match(imageType))
        return;

    var reader = new FileReader();
    reader.onload = fileOnload;
    reader.readAsDataURL(file);
}

function fileOnload(e) {
    var result = e.target.result;
    $('.modify-img').attr("src",result);
}

// ----------------------------------------------------------------

function ModifyOrAddPlayer(element){
    var n, data;
    if( element > 0 ){
        Players.forEach(function(p, i){ if( element == p.ID_Player ) n = i; })
        data = Players[n];
    }

    if(element >= 0){
        // MODIFICAR LOS DATOS DE UN JUGADOR
        // Separamos la fecha y asignamos a su caja de texto correspondiente
        var cdate = data.Birthday.split('-');
        var year = cdate[0], month = cdate[1], day = cdate[2];  
        $('#b_day').val( Number(day).toString() );
        $('#b_month').val( Number(month).toString() );
        $('#b_year').val( Number(year).toString() );
        $('.idep').text(element).hide();
        $('.index').text(n).hide();

        // Cambiamos color del botón para modificar un jugador
        $('.btn-img-player').attr('data-tooltip', 'Click para cambiar foto');
        $('.btn-img-player').removeClass('blue').addClass('yellow').find('i').text('edit');
        $('.BtnAddPlayer').hide();
        $('.BtnModifyPlayer').show();

        // Asignamos datos a las cajas de texto correspondiente
        $('#first_name').val(data.P_Name);
        $('#lname1').val(data.P_LastName1);
        $('#lname2').val(data.P_LastName2);
        $('#PlayerNumber').val(data.PlayerNumber);
    }else{
        // AGREGAMOS UN NUEVO JUGADOR
        // Cambiamos color del botón para agregar un jugador
        $('#lname1, #lname2, #PlayerNumber').val("");
        $('.btn-img-player').attr('data-tooltip', 'Click para subir una fotografía');
        $('.btn-img-player').removeClass('yellow').addClass('blue').find('i').text('file_upload');
        $('.idep').text("");
        $('.BtnAddPlayer').show();
        $('.BtnModifyPlayer').hide();
    }
}

function ToNumberMonth(month){
    m = ["Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio", "Julio", "Agosto", "Septiembre", "Octubre", "Noviembre", "Diciembre"];
    return m.indexOf(month);
}

function DeletePlayer(element){
    $('.np').text(element);

    var n;
    Players.forEach(function(p, i){ if( element == p.ID_Player ) n = i; });
    var data = Players[n], name = data.P_Name + " " + data.P_LastName1 +" "+data.P_LastName2;
    
    $('.ip').text(n);
    $('.playerName').text(name);
}

$('.BtnAddPlayer').on('click', function(){
    var IDTeam = Trainer.ID_Team;
    var f_name = $('#first_name').val(), lname1 = $('#lname1').val(), lname2 = $('#lname2').val();
    var birthdate = $('#b_year').val()+"-"+$('#b_month').val()+"-"+$('#b_day').val();
    var num_player = $('#PlayerNumber').val();
    var url = 'Resource/users_images/';
    var complete = true;
    var validated = true;
    var data = {ID_Team: IDTeam, Name: f_name, LName1: lname1, LName2: lname2, Birthday: birthdate, NumPlayer: num_player, URL: url, Complete: complete, Validated: validated};
    console.log(data);

    funct = '__addplayer';
    $.post('Controller/PlayerController.php', {Action: funct, Player: data}, function(response){
        var Response = JSON.parse(response);

        if( Response.Status === "SUCCESS" ){
            M.toast({html: "Jugador agregado correctamente", classes: 'rounded green darken-2'});
            var newplayer = {ID_Player: Response.New_ID, P_Name: f_name, P_LastName1: lname1, P_LastName2: lname2, Birthday: birthdate, PlayerNumber: num_player, URL: url, DocsComplete: complete, DocsValidated: validated};
            
            if( Players.length === 0 ){
                Players[0] = newplayer;
            }else{
                Players.push(newplayer);
            }

            localStorage.setItem("Players", JSON.stringify(Players) );
            $('#DataPlayer').modal('close');
            
            setTimeout(function(){ window.location.reload(); }, 1000); 
        }else{
            M.toast({html: "¡Error! No se aplicaron los cambios", classes: 'rounded red darken-2'});
        }
    });
});

$('.BtnModifyPlayer').on('click', function(){
    var iden = $('.idep').text(), i = $('.index').text();
    var f_name = $('#first_name').val(), lname1 = $('#lname1').val(), lname2 = $('#lname2').val();
    var birthdate = $('#b_year').val()+"-"+$('#b_month').val()+"-"+$('#b_day').val();
    var num_player = $('#PlayerNumber').val();
    var data = {ID: iden, Name: f_name, LName1: lname1, LName2: lname2, Birthday: birthdate, NumPlayer: num_player};

    funct = '__modifyplayer';
    $.post('Controller/PlayerController.php', {Action: funct, Player: data}, function(response){
        var data = JSON.parse(response);

        if( data.Status === "SUCCESS" ){
            M.toast({html: "Datos actualizados correctamente", classes: 'rounded green darken-2'});
            Players[i].P_Name = f_name;
            Players[i].P_LastName1 = lname1;
            Players[i].P_LastName2 = lname2;
            Players[i].Birthday = birthdate;
            Players[i].PlayerNumber = num_player;

            localStorage.setItem("Players", JSON.stringify(Players) );
            $('#DataPlayer').modal('close');
            
            setTimeout(function(){ window.location.reload(); }, 1000);
            
        }else{
            M.toast({html: "¡Error! No se aplicaron los cambios", classes: 'rounded green darken-2'});
        }
    });
});

$('.confirm-delete-player').on('click', function(){
    var act = "__removeplayer";
    var iden = $('.np').text();
    var i = $('.ip').text();
    var ThrashCard = $('#card_n'+iden);

    $.post('Controller/PlayerController.php', {Action: act, id: iden}, function(response){
        var data = JSON.parse(response);

        if( data.Response ){
            $('#DeletePlayer').modal('close');

            del = Players.splice(i, 1);
            localStorage.setItem("Players", JSON.stringify(Players) );

            setTimeout(function(){
                ThrashCard.fadeOut("1200");
                M.toast({html: "Jugador eliminado correctamente", classes: 'rounded green darken-2'});
            }, 500);

            setTimeout(function(){
                ThrashCard.remove();
                var childs = $('.players-cards').children().length;
                
                if( childs == 0 )
                    ShowDataPlayers();

            }, 1500);
        }else{
            M.toast({html: "Error al eliminar el jugador", classes: 'rounded red darken-2'});
        }
    });
});

$('.btn-modify-trainer').on('click', function(){
    // Enabling edit the text inputs
    $(".trainer-team, .email-contact-team, .t-phone-number-team").removeAttr("disabled");
    $('.trainer-team, .email-contact-team, .t-phone-number-team').
    css('border-top', '1px dotted gray').css('border-bottom', '1px dotted gray').
    css('border-left', '1px dotted gray').css('border-right', '1px dotted gray');

    // Hiding the modify button and show the save button
    $(this).hide();
    $('.btn-save-data-trainer').show();
    $('.btn-save-data-trainer').css('transform', 'scale(1)');

    // Message for editing
    M.toast({html: "Puedes editar los datos del entrenador", classes: 'rounded blue lighten-2'});
});

$('.btn-save-data-trainer').on('click', function(){
    // Adding the attribute disabled to text boxes
    $(".trainer-team, .email-contact-team, .t-phone-number-team").prop("disabled", true);
    $('.trainer-team, .email-contact-team, .t-phone-number-team').css('border-color', 'white');

    // Hiding and showing the modify and save buttons
    $(this).hide();
    $('.btn-modify-trainer').show();
    $('.btn-modify-trainer').css('transform', 'scale(1)');
});

// FUNCIONAMIENTO DEL BOTON DE MODIFICAR AUXILIAR
$('.btn-auxiliar').on('click', function(){
    // Able the text inputs
    $('.auxiliar-trainer-team, .at-phone-number-team').removeAttr("disabled");
    $('.auxiliar-trainer-team, .at-phone-number-team').
    css('border-top', '1px dotted gray').css('border-bottom', '1px dotted gray').
    css('border-left', '1px dotted gray').css('border-right', '1px dotted gray');

    // Showing and hiding buttons
    $(this).hide();
    $('.btn-save-data-auxiliar').show();
    $('.btn-save-data-auxiliar').css('transform', 'scale(1)');

    // Message for editing
    M.toast({html: "Puedes editar los datos del entrenador auxiliar", classes: 'rounded blue lighten-2'});
});

$('.btn-save-data-auxiliar').on('click', function(){
    // Disable the text inputs
    $('.auxiliar-trainer-team, .at-phone-number-team').prop("disabled", true);
    $('.auxiliar-trainer-team, .at-phone-number-team').css('border-color', 'white');

    // Showing and hiding buttons
    $(this).hide();
    $('.btn-auxiliar').show();
    $('.btn-auxiliar').css('transform', 'scale(1)');
});

var btnCloseSession = $('.btn-close-session');
$('.btn-close-session').on('click', function(){
    var txtUser = '¡Vuelve pronto '+User.Name+"!";
    btnCloseSession.addClass('disabled');
    localStorage.removeItem("User");
    localStorage.removeItem("TeamAndTrainers");
    localStorage.removeItem("Players");
    
    M.toast({html: txtUser, classes: 'rounded green darken-2'});
    setTimeout(function(){
        window.location.assign('index.php');
    }, 1000);
});

/*

$('.btn-new-player').on('click', function(){
    $('#txtNumber').attr('value', '');
    $('#txtName').attr('value', '');
    $('#txtLastName').attr('value', '');
    $('#txtOld').attr('value', '');
    $('.btn-modal-players').text('Agregar jugador').removeClass("yellow darken-2").addClass("green darken-2");
});
*/

// Array of players only for testing
/*
    players = [ {Name: "María Citlalli Moreno Ramírez", Number: 4, Old: 17, UploadDoc: true, ValidateDoc: true},
                {Name: "Naztyenka Esmeralda Moreno Ramírez", Number: 7, Old: 19, UploadDoc: true, ValidateDoc: false},
                {Name: "Juana Martinez Juarez", Number: 8, Old: 16, UploadDoc: true, ValidateDoc: true},
                {Name: "Maria Isabel Vazquez de la Rosa", Number: 2, Old: 27, UploadDoc: true, ValidateDoc: false},
                {Name: "Blanca Medina Artiaga", Number: 1, Old: 16, UploadDoc: true, ValidateDoc: false},
                {Name: "Carolina Herrera Martinez", Number: 5, Old: 18, UploadDoc: true, ValidateDoc: true},
                {Name: "Karina Rodriguez Juarez", Number: 17, Old: 19, UploadDoc: true, ValidateDoc: true},
//                {Name: "Maria Lizarraga Morales", Number: 15, Old: 16, UploadDoc: true, ValidateDoc: false},
//                {Name: "Monica Trejo Muños", Number: 22, Old: 19, UploadDoc: true, ValidateDoc: false},
//                {Name: "Maria Moreno Calderon", Number: 28, Old: 19, UploadDoc: true, ValidateDoc: true},
//                {Name: "Dolores Moreno Calderon", Number: 10, Old: 19, UploadDoc: true, ValidateDoc: true},
//                {Name: "Walter Alejandro Moreno Ramirez", Number: 17, Old: 23, UploadDoc: true, ValidateDoc: true},
              ];
*/

/*
    // Getting the team information
    act = "__infoteam";
    $.post('Controller/TeamController.php', {Action: act, id: Trainer.ID_Trainer }, function(data){
        Team = JSON.parse(data);
        localStorage.setItem("Team", JSON.stringify(Team) );
    });
    Team = JSON.parse( localStorage.getItem("Team") );

    // Getting the trainer auxiliar information
    act = "__infoauxiliar";
    $.post('Controller/TrainerAuxiliarController.php', {Action: act, id: Team.ID_TrainerAuxiliar }, function(data){
        Auxiliar = JSON.parse(data);
        localStorage.setItem("Auxiliar", JSON.stringify(Auxiliar) );
    });
    Auxiliar = JSON.parse( localStorage.getItem("Auxiliar") );
    
    // Getting the players information
    act = "__infoplayers";
    $.post('Controller/PlayerController.php', {Action: act, id: Team.ID_Team }, function(data){
        Data = JSON.parse(data);
        act = "__infodocs";

        Data.forEach(function(p, i){
            $.post('Controller/DocumentsController.php', {Action: act, id: p.ID_Documents }, function(data){
                doc = JSON.parse(data);
                Players[i] = Object.assign(p, doc);
            }); 
        });
        localStorage.setItem("Players", JSON.stringify(Players) );
    });
    Players = JSON.parse( localStorage.getItem("Players") );
    */
