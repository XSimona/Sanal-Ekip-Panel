//console.log("Electron Ready");

const electron = require("electron"); // Electron
const ClientFtp = require("ftp"); // Ftp
const $ = require("jquery"); // jQuery
const fs = require('fs'); // File System
const url = require("url"); // Url
const path = require("path"); // Path
const { readJSON } = require("fs-extra");


// Example Module



const { app, net, BrowserWindow, Menu, ipcMain, globalShortcut, dialog, Notification, systemPreferences, session } = electron;
const { readFile } = fs;


let mainWin;
let netStatusWin;
let AppIcon = "assets/icon/win/app.ico";

// Uygulama Hazır Ise
app.on("ready", () => {

    netStatusWin = new BrowserWindow({
        webPreferences: {
            nodeIntegration: true,
        },
        width: 300,
        height: 200,
        center: true,
        frame: false,
        resizable: false,
        icon: "assets/icon/win/app.ico",
        title: "Hazırlanıyor"
    });
    netStatusWin.setProgressBar(0.9);
    netStatusWin.loadURL(
        url.format({
            pathname: path.join(__dirname, "views/netStatus.html"),
            protocol: 'file',
            slashes: true
        })
    );

    const request = net.request('https://www.electronjs.org');
    request.on('response', (response) => {
        if (response.statusCode == 200) {
            netStatusWin.close();
        }
    });
    request.end();

    var sess = netStatusWin.webContents.session

    console.log(sess.getUserAgent())

    netStatusWin.on('close', () => {
        console.log("Islem Basarili...");




        mainWin = new BrowserWindow({
            webPreferences: {
                nodeIntegration: true,
            },
            width: 1284,
            height: 660,
            frame: false,
            fullscreen: false,
            resizable: true,
            icon: AppIcon,
            title: "Main Windows",
            minWidth: 1200,
            minHeight: 600
        });

        mainWin.loadURL(
            url.format({
                pathname: path.join(__dirname, "views/MainWin.html"),
                protocol: "file",
                slashes: true
            })
        );

        //var Filereal = __dirname + '/package.json';
        //var Filereal = 'package.json';
        //readFile(Filereal, function (err, data) {
        //    var ver = JSON.parse(data);
        //    console.log(ver.name);
        //    $.each
        //    for (vers in ver) {
        //        console.log(vers + " : " + ver[vers]);
        //    }
        //});

        new Notification({
            title: app.name,
            body: 'Notification from the Main process',
            icon: 'assets/icon/win/app.ico'
        }).show();

        const newVisionTemplate = Menu.buildFromTemplate(newVision);
        Menu.setApplicationMenu(newVisionTemplate);

        const fileArray = [
            {
                label: 'File 1',
                fileName: "file-1",
                type: 'html',
                icon: '../assets/icon/iconfinder_html.png'
            },
            {
                label: 'File 2',
                fileName: "file-2",
                type: 'json',
                icon: '../assets/icon/iconfinder_json.png'
            }

        ];
        setTimeout(() => {
            mainWin.webContents.send('testArray', fileArray);
        }, 1500);
    });

    globalShortcut.register("Ctrl+Q", () => {
        app.quit();
    });


    ipcMain.on("Web:Href", (error, link) => {
        //console.log(link)
        NewFileOpen(link)

    });

    ipcMain.on('minimize', (err, data) => {

        if (data === 'main') {
            mainWin.minimize();

        }
    });
    ipcMain.on('maximize', (err, data) => {

        if (data === 'main') {

            mainWin.maximize();

        }
    });
    ipcMain.on('restore', (err, data) => {

        if (data === 'main') {

            mainWin.restore();
            //console.log(mainWin);
        }

    });
    ipcMain.on('close', (err, data) => {
        if (data = 'main') {
            app.quit();
        }
        else {
            newWindow.close();
            newWindow = null;
        }
    });
    ipcMain.on('login', (err, data) => {
        NewFileOpen("views/" + data)
    });
    // Windows Size
    ipcMain.on('window:size', (err, data) => {
        console.log(data);
    });
    // Html Focus
    ipcMain.on('Focus', (err, data) => {
        console.log("Focus");
        console.log("-----");
        console.log(JSON.parse(data));
        console.log("-----------------------------");
    });
});



function NewFileOpen(file) {
    mainWin.loadURL(
        url.format({
            pathname: path.join(__dirname, file),
            protocol: "file",
            slashes: true,
        })
    );
}

function NewWindowOpen($file = null, $width = 800, $height = 600, $frame = true) {


    newWindow = new BrowserWindow({
        webPreferences: {
            nodeIntegration: true,
        },
        width: $width,
        height: $height,
        frame: $frame,
        icon: AppIcon,
        fullscreenWindowTitle: "NewWindow"

    });

    if ($file == null) {
        dialog.showErrorBox('Hata', 'Dosya Yoluna Ulaşılamadı...');
    } else {
        newWindow.loadURL(
            url.format({
                pathname: path.join(__dirname, "views/" + $file),
                protocol: "file",
                slashes: true,
            })
        );
    }
    newWindow.on('close', () => {
        newWindow = null;
    });

}

const newVision = [
    {
        label: 'Dosya',
        submenu:
            [
                {
                    'label': 'Yeni Ftp Baglantisi',
                    click(element) {
                        setTimeout(() => {

                            //{width: 370, height: 537}
                            NewWindowOpen("HTMLPage1.html", 370, 537, false);
                        }, 1500);
                    },
                    accelerator: 'Ctrl+N'
                }
            ]
    },
    {
        label: 'Yenile',
        role: 'reload'


    },
    {
        label: 'DevTools',
        submenu: [
            {
                label: 'DevTools Open',
                accelerator: 'Ctrl+Shift+i',
                role: 'toggleDevTools'
            }
        ]
    }
];





/*
    mainClientFtp = new ClientFtp();

    mainClientFtp.on("ready", () => {
        mainClientFtp.list(function (err, data) {
            if (err) {
                console.log(err);
            } else {
                //console.log("--------------------------------");
                //console.dir(data);

                mainWin.webContents.send("FTP", data);
            }
        });
    });
    mainClientFtp.connect({
        host: "ftp.demoyayinla.tk",
        port: 21,
        user: "demoyayinla",
        password: "3821246Mh!",
    });
    */