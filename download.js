
chrome.downloads.onCreated.addListener(function (){
    chrome.tabs.getSelected(null, function(tab) {
        // ★現在選択中のtab.idが必要なので、getSelectedメソッドの中にsendRequestを記述する。
        alert("step1");
        chrome.tabs.sendRequest(tab.id, {greeting: "hello"}, function(response) {
            // ここに受信側からレスポンスが返ってきた時にする処理を記述する。
            alert("step3 " + response.farewell);
        });
    });    
});