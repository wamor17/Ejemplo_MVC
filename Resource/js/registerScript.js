
var btnRegister = $('.btn-register');
var txtName = $('#name');
var txtLastName = $('#last_name');
var txtNameUser = $('#name_user');
var txtEmail = $('#email');
var txtPwd1 = $('#password1');
var txtPwd2 = $('#password2');
var txtNameTeam = $('#name_team');
var SelectCategory = $('#select_category');
var bname=false, blastname=false, busername=false, bemail=false, bpwd1=false, bpwd2=false, bnameteam=false, bcategory=false;

$(function(){
    $('.menu-options').children().eq(3).addClass('active');
    $('.progress').css('display', 'none');
});


$('.btn-register').on('click', function(){
    var ln = txtLastName.val().split(" ");
    var ln1 = ln[0], ln2 = ln[1];
    btnRegister.addClass('disabled');

    if( ln.length < 2 ){
        ln2 = 'null';
    }

    if( bname && blastname && busername && bnameteam && bcategory && bemail && bpwd1 && bpwd2 ){
        $('.progress').css('display', 'block');

        // Creamos el objeto con todos los datos del formulario
        var form = { name: txtName.val(), Ln1: ln1, Ln2: ln2, nameuser: txtNameUser.val(), 
            nameteam: txtNameTeam.val(), category: SelectCategory.val(), email: txtEmail.val(), pwd1: txtPwd1.val(), pwd2: txtPwd2.val() };

        // CODIGO PARA REALIZAR EL REGISTRO DE UN NUEVO USUARIO
        var funct = '__newuser';
        $.post('Controller/UserController.php', {Action: funct, info: form}, function(response){
            var Response = JSON.parse(response);

            if( Response.Status === 'SUCCESS' ){
                M.toast({html: '¡Registro exitoso!', classes: 'rounded green darken-1 white-text'});
                txtNameUser.removeClass('invalid').addClass('valid');

                bname=false, blastname=false, busername=false, bemail=false, bpwd1=false, bpwd2=false, bnameteam=false;
                $('#name, #last_name, #name_user, #name_team, #email, #password1, #password2').removeClass('valid').val('');
                $('#select_category').removeClass('valid-select').val('');
                btnRegister.removeClass('disabled');
                $('.progress').css('display', 'none');
            }else{
                M.toast({html: '¡Error! Usuario ya registrado', classes: 'rounded red darken-1 white-text'});
                txtNameUser.removeClass('valid').addClass('invalid');
                btnRegister.removeClass('disabled');
                $('.progress').css('display', 'none');
            }
        });
    }else{
        if( bname === false ) txtName.removeClass('valid').addClass('invalid');
        if( blastname === false ) txtLastName.removeClass('valid').addClass('invalid');
        if( busername === false ) txtNameUser.removeClass('valid').addClass('invalid');
        if( bnameteam === false ) txtNameTeam.removeClass('valid').addClass('invalid');
        if( bcategory === false ) SelectCategory.removeClass('valid-select').addClass('invalid-select');
        if( bemail === false ) txtEmail.removeClass('valid').addClass('invalid');
        if( bpwd1 === false ) txtPwd1.removeClass('valid').addClass('invalid');
        if( bpwd2 === false ) txtPwd2.removeClass('valid').addClass('invalid');

        btnRegister.removeClass('disabled');
        M.toast({html: '¡Error! Debe corregir los campos señalados', classes: 'rounded red darken-1 white-text'});
    }
});

// Validación de los datos del formulario    $('#select_category').val();
$('#name, #last_name, #name_user, #name_team, #select_category, #email, #password1, #password2').blur(function(){
    var text = $(this).val();
    var id = $(this).attr('id');

    // Validation only for the select component
    if( id === "select_category" ){
        if( text !== null ){
            bcategory = true;
            $(this).removeClass("invalid-select").addClass("valid-select");
        }else{
            bcategory = false;
            $(this).removeClass("valid-select").addClass("invalid-select");
        }
    }

    // Validation for all the text box
    if( text !== '' ){
        $(this).removeClass('invalid').addClass('valid');

        if( id === 'name' ) bname = true; 
        else if( id === 'last_name' ) blastname = true;
        else if( id === 'name_team' ) bnameteam = true;
        else if( id === 'email' ) bemail = true;

        if( id === 'name_user' ){
            var nu = $(this).val().indexOf(' ');

            if( nu === -1 ){
                $(this).removeClass('invalid').addClass('valid');
                busername = true;
            }else{
                $(this).removeClass('valid').addClass('invalid');
                busername = false;
            }

        }else if( id === 'email' ){
            var em = $(this).val().indexOf("@");

            if( em === -1 ){
                bemail = false;
                $(this).removeClass('valid').addClass('invalid');
                M.toast({html: 'El correo no tiene el formato específico', classes: 'rounded red darken-1 white-text'});
            }else{
                bemail = true;
                $(this).removeClass('invalid').addClass('valid');
            }
        }else if( id === 'password1') {
            bpwd1 = vefynospace( $(this).val() );

            if( bpwd1 === false ){
                $(this).removeClass('valid').addClass('invalid');
                M.toast({html: 'La contraseña no debe tener espacios', classes: 'rounded red darken-1 white-text'});
            }else{
                $(this).removeClass('invalid').addClass('valid');
            }
        }else if( id === 'password2' ){
            bpwd2 = vefynospace( $(this).val() );

            if( bpwd2 === false ){
                $(this).removeClass('valid').addClass('invalid');
                M.toast({html: 'La contraseña no debe tener espacios', classes: 'rounded red darken-1 white-text'});                
            }else{
                var equal = vefypass( $('#password1').val(), $('#password2').val() );

                if( equal ){
                    $(this).removeClass('invalid').addClass('valid');
                    bpwd2 = true;
                }else{
                    $(this).removeClass('valid').addClass('invalid');
                    M.toast({html: 'Las contraseña no coinciden', classes: 'rounded red darken-1 white-text'}); 
                    bpwd2 = false;
                }
            }
        }
    }else{
        $(this).removeClass('valid').addClass('invalid');

        if( id === 'name' ) bname = false; 
        else if( id === 'last_name' ) blastname = false;
        else if( id === 'name_user' ) busername = false;
        else if( id === 'name_team' ) bnameteam = false;
        else if( id === 'email' ) bemail = false;
        else if( id === 'password1' ) bpwd1 = false;
        else if( id === 'password2' ) bpwd2 = false;
    }
});

function vefynospace(p1){
    if( p1.indexOf(" ") === -1 )
        return true;
    else
        return false;
}

function vefypass(p1, p2){
    if( p1 === p2 )
        return true;
    else
        return false;
}

