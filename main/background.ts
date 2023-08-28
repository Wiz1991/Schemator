import { BrowserWindow, app } from 'electron';
import installExtension, { REDUX_DEVTOOLS } from 'electron-devtools-installer';
import serve from 'electron-serve';
import { createWindow } from './helpers';

const isProd: boolean = process.env.NODE_ENV === 'production';

if (isProd) {
    serve({ directory: 'app' });
} else {
    app.setPath('userData', `${app.getPath('userData')} (development)`);
}

async function createWindows() {
    const mainWindow = createWindow('main', {
        width: 1000,
        height: 600,
    });

    if (isProd) {
        await mainWindow.loadURL('app://./home.html');
    } else {
        const port = process.argv[2];
        await mainWindow.loadURL(`http://localhost:${port}/home`);
        mainWindow.webContents.openDevTools();
    }
}

(async () => {
    await app.whenReady();

    await installExtension(REDUX_DEVTOOLS);

    createWindows();
})();

app.on('window-all-closed', () => {
    // On macOS, it's common for an app and its menu bar to remain
    // active until the user shuts down the application via the Cmd + Q shortcut
    if (process.platform !== 'darwin') {
        app.quit();
    }
});

app.on('activate', async () => {
    // On macOS, if an application is in the dock, it is common for a window to be created after
    // clicking on the icon in the dock if there are no windows active
    if (BrowserWindow.getAllWindows().length === 0) {
        createWindows();
    }
});
