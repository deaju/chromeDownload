let character = [];
let timer;
let tabInfo;

class Character {
    constructer (){
        this._speed = 0;
        this._progress=0;
    }
    set downloadItem(downloadItem){
        this._downloadItem = downloadItem;
    }
    get downloadItem() {
        return this._downloadItem;
    }
    get speed(){
        return this._speed;
    }
    set speed(speed){
        this._speed = speed;
    }
    get progress(){
        return this._progress;
    }
    set progress(progress){
        this._progress = progress;
    }

    calcDownloadSpeed(downloadItem){
        this._speed = downloadItem.bytesReceived - this._downloadItem.bytesReceived;
    }
    calcDownloadProgress(downloadItem){
        this._progress= (downloadItem.bytesReceived / downloadItem.totalBytes)*100;
    }
}

chrome.downloads.onCreated.addListener( startDownload );




function startDownload(downloadItem) {
    chrome.tabs.getSelected(null, (tab) => {
        tabInfo = tab;
            // ★現在選択中のtab.idが必要なので、getSelectedメソッドの中にsendRequestを記述する。
        chrome.tabs.sendRequest(tab.id, {download: "start"}, (response) => {
            // ここに受信側からレスポンスが返ってきた時にする処理を記述する。
        });
    }); 
    let tmpC = new Character();
    tmpC.downloadItem=downloadItem;
    character.push(tmpC);
    timer = setInterval(getDownloadObject,1000);
}

function getDownloadObject(){
    if( character.length > 0 ){
        let index = 0;
        let tmpChara = character[index];
        let query = {id:tmpChara.downloadItem.id};
        chrome.downloads.search(query,(downloadItems)=>{
            let downloadItem = downloadItems[index];
            if(downloadItem.state === 'complete' || downloadItem.state === 'interrupted'){
                clearInterval(timer);
                tmpChara.downloadItem = downloadItem;
            } else {
                tmpChara.calcDownloadSpeed(downloadItem);
                tmpChara.calcDownloadProgress(downloadItem);
                tmpChara.downloadItem = downloadItem;
                let request = {
                    downloadSpeed: tmpChara.speed,
                    downloadProgress:tmpChara.progress
                };
                chrome.tabs.sendRequest(tabInfo.id, request,frontAction);
            }
         });
    }
}
function frontAction(response){
    if(response.cancel){
        let index = 0;
        let tmpChara = character[index];
        chrome.downloads.cancel(tmpChara.downloadItem.id,()=>{

        });
    }
}

