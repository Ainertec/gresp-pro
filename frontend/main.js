const electron = require('electron');
const home = electron.app;
const janela = electron.BrowserWindow;
const shell = electron.shell;

home.on('ready', function () {
  let janelaPrincipal = new janela({
    backgroundColor: '#fff',
    width: 1280,
    height: 720,
    alwaysOnTop: false,
    show: false,
    title: 'Gresp Pro',
    autoHideMenuBar: true,
    webPreferences: {
      nodeIntegration: true,
      nativeWindowOpen: true,
      nodeIntegrationInSubFrames: true
    }
  });
  //janelaPrincipal.on('close', () =>{janelaPrincipal=null; shell.openItem("C://gresppro-x64//executaveis_modulos//impressaoClose.vbs");})
  janelaPrincipal.loadURL(`file://${__dirname}/index.html`);
  janelaPrincipal.once('ready-to-show', () => {
    janelaPrincipal.show();
    janelaPrincipal.maximize();
  });

  //shell.openItem("C://gresppro-x64//executaveis_modulos//startMongo.vbs")
  //shell.openItem("C://gresppro-x64//executaveis_modulos//startNode.vbs")
  //shell.openItem("C://gresppro-x64//executaveis_modulos//impressao.vbs")
  //shell.openItem("C://gresppro-x64//executaveis_modulos//startWeb.vbs")

  var data = new Date();

  if (data.getDate() == 5 || data.getDate() == 15 || data.getDate() == 25) {
    //shell.openItem("C://gresppro-x64//executaveis_modulos//startBackup.vbs")
  }
});