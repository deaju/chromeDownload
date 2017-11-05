$(function () {
    'use strict';

    chrome.extension.onRequest.addListener(
        (request, sender, sendResponse) => {
            $('body')
            .append(
                '<div class="eye-animation__wrapper"><div class="eye-animation"></div></div>');
            alert("step2 " + request.greeting);
            $('.eye-animation').on('click',()=>{
                $('.eye-animation__wrapper').remove();
            });
              
            //★ここに★ 表示しているサイトのベースカラーを変更する処理を記述する。
              
            if (request.greeting == "hello")
                sendResponse({farewell: "goodbye"});
            else
                //★ここ重要★ レスポンスがない場合でも、必ず空のオブジェクトを返す。
                sendResponse({}); // snub them.
            });

});