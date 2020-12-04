// JavaScript source code

$(document).ready(function () {

    var docTitle = $(document).attr("title");

    $("#dom-title").html('<img src="../assets/icon/win/app.ico" class="dom-logo img-fluid rounded rounded-circle shadow-lg" alt="Logo"> ' + docTitle);

    ipcRenderer.on('Data', (err, res) => {
        console.error(err);
        console.log(res);
    });

    $('button#close').click(function () {
        if (this.attributes.command = 'close') {
            ipcRenderer.send('close', this.attributes.windows.value);
        } else {
            ErrorBox("Error Command", "Command Don't Close");
        }
    });
    $('a#close').click(function () {
        if (this.attributes.command = 'close') {
            ipcRenderer.send('close', this.attributes.windows.value);
        } else {
            ErrorBox("Error Command", "Command Don't Close");
        }
    });
    $('#minimize').click(function () {
        //console.log(  this.attributes.command , this.attributes.windows);

        if (this.attributes.command = 'minimize') {
            ipcRenderer.send('minimize', this.attributes.windows.value);
        } else {
            console.log(this.attributes.command, this.attributes.windows);
        }
    });
    $('#maximize').click(function () {
        var command = $('#maximize').attr('command');
        console.log(command);
        var newCommand = parseInt(command);
        console.log(newCommand.typeOf);
        switch (command) {
            case 'maximize':
                ipcRenderer.send('maximize', this.attributes.windows.value);

                $(this).attr('command', 'restore');
                break;
            case 'restore':
                ipcRenderer.send('restore', this.attributes.windows.value);

                $(this).attr('command', 'maximize');
                break;
            default:
                console.log(this);
                break;
        }
    });

    //$(focus).click(function (e) {
    //    ipcRenderer.send("Focus", JSON.stringify(this));
    //});



    $('#documentLogoButton').click(function (events) {
        $('.documentLogoMenu').slideToggle('slow');
        $('.documentLogoMenu').width("300px");
        $('.documentLogoMenu-item').click(function () {
            var menuID = $(this).attr('menuID');
            //console.log(menuID);
            $('#documentLogoMenu-submenu' + menuID).slideToggle('slow');
        });
    });
    //userProfile
    $('#userProfile').click(function () {
        alert("Kullanýcý Ayarlarý");
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
$(window).load(function () {
    alert("Window Yüklendi.");   
});
