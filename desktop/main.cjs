const { app, BrowserWindow } = require('electron');
const { brainDesktopUrl, guardBrainNavigation } = require('./brain-url.cjs');

app.whenReady().then(() => {
  const win = new BrowserWindow({
    width: 1680,
    height: 1050,
    title: 'PlugBrain V1 — Planet plugpt',
    backgroundColor: '#0c0e12',
    webPreferences: {
      nodeIntegration: false,
      contextIsolation: true,
      devTools: true
    }
  });

  win.setMenuBarVisibility(false);

  const targetUrl = brainDesktopUrl();
  const guardNavigation = (event, candidateUrl) => {
    guardBrainNavigation(event, candidateUrl, { endpoint: targetUrl });
  };
  win.webContents.on('will-navigate', guardNavigation);
  win.webContents.on('will-redirect', guardNavigation);
  win.webContents.setWindowOpenHandler(() => ({ action: 'deny' }));
  win.loadURL(targetUrl);
});
