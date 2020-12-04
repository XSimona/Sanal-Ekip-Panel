// JavaScript source code
$(document).ready(function () {


var docTitle = $(document).attr("title");

$("#dom-title").html('<img src="../assets/icon/win/app.ico" class="dom-logo img-fluid rounded rounded-circle shadow-lg" alt="Logo"> ' + docTitle);

ipcRenderer.on('Data', (err, res) => {
    console.error(err);
    console.log(res);
});

$('#documentLogoButton').click(function (events) {
    $('.documentLogoMenu').slideToggle('slow');
    $('.documentLogoMenu').width("300px");
    $('.documentLogoMenu-item').click(function () {
        var menuID = $(this).attr('menuID');
        console.log(menuID);
        $('#documentLogoMenu-submenu' + menuID).slideToggle('slow');
    });
});

$('#sidebar-bars').click(function () {
    /*background-color: !important;*/
    //$('#sidebar-bars').slideDown();
    $('.sidebar-main').css('background-color', '#404d59 ');
    $('.sidebar-main').css('height', '85vh');
    
}).dblclick(function () {
    $('.sidebar-main').css('background-color', 'transparent ');
    $('.sidebar-main').css('height', '25vh');
})

function documentLogoMenu() {
    $('.documentLogoMenu').slideToggle('slow');
    $('.documentLogoMenu').width("300px");
}

$(document).keypress(function (element) {


    if (element.charCode === 34) {
        documentLogoMenu();
    }

});

});
