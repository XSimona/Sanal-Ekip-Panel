// JavaScript source code

$('[data-toggle="electron-href"]').click(function () {
    var link = $(this).attr('data-href');
    if (link != '#' ) {
        ipcRenderer.send("Web:Href", link);
    }
})

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

