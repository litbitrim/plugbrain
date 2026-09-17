const { app, BrowserWindow } = require('electron');
const path = require('node:path');

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

  const targetUrl = 'http://127.0.0.1:4310/?token=plug-7d9ab56ed9c743fc8b02e61392aa6e3f&workspace=ws-a2373c999ef3';
  win.loadURL(targetUrl);

  win.webContents.on('did-finish-load', () => {
    win.webContents.executeJavaScript(`
      try {
        localStorage.setItem('plugbrain.token', 'plug-7d9ab56ed9c743fc8b02e61392aa6e3f');
        localStorage.setItem('plugbrain.auth_token', 'plug-7d9ab56ed9c743fc8b02e61392aa6e3f');
        localStorage.setItem('plugbrain.workspace', 'ws-a2373c999ef3');
        localStorage.setItem('plugbrain.agentId', 'agy-brain-02');
        localStorage.setItem('plugbrain.agent_id', 'agy-brain-02');
      } catch (e) {}
    `);
  });
});
