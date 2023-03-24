// const { ipcRenderer } = require('electron')

// IPC: Renderer to main (one-way)
const btnTitle = document.getElementById('btn-title')
const titleInput = document.getElementById('title')
btnTitle.addEventListener('click', () => {
    const title = titleInput.value
    window.electronAPI.setTitle(title)
});

// IPC: Renderer to main (two-way)
const btnFile = document.getElementById('btn-file')
const filePathElement = document.getElementById('filePath')

btnFile.addEventListener('click', async () => {
    const filePath = await window.electronAPI.openFile()
    filePathElement.innerText = filePath
});

// IPC: Main to renderer
const counter = document.getElementById('counter')

window.electronAPI.handleCounter((event, value) => {
    const oldValue = Number(counter.innerText)
    const newValue = oldValue + value
    counter.innerText = newValue
    event.sender.send('counter-value', newValue)
});

// const channel = new MessageChannel();
// const port1 = channel.port1;
// const port2 = channel.port2;

// port2.postMessage({ answer: 42 });
// ipcRenderer.postMessage('port', null, [port1]);