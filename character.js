const imageCancel = 'image/cancel/';
const imageStart = 'image/start/';
const imageTest = 'image/test/';
const MAX_NUM=50;
const IMAGE_SIZE=160;

$(function () {
    'use strict';

    let isCancel = false;
    chrome.extension.onRequest.addListener(
        (request, sender, sendResponse) => {
            //★ここに★ 表示しているサイトのベースカラーを変更する処理を記述する。
            if (request.download === "start"){
                $('body')
                .append(
                    '<div class="character_wrapper"><div class="character-animation"></div></div>');
                $('.character-animation').on('click',()=>{
                   isCancel = true;
                });
                changeImage(imageStart);
                sendResponse({});
            }
            if(isCancel){
                isCancel = false;
                sendResponse({cancel:true});
            } else {
                if(request.downloadSpeed >= 0){
                    console.log('speed '+request.downloadSpeed / (1024*1024) );
                }
                if(request.downloadProgress >= 0 ){
                    console.log('progress '+request.downloadProgress);
                }
                sendResponse({});
            }

        }
    );

    function changeImage(srcImage){
        let imageUrl = '';
        let imageSize = '';
        for(let i=1; i < MAX_NUM;i++){
            imageUrl = imageUrl + 'url(' + chrome.extension.getURL(srcImage + ( '0000' + i ).slice( -4 ) + '.png')+'),';
            imageSize = imageSize + IMAGE_SIZE * (i -1) + 'px top,'
        }
        imageUrl = imageUrl + 'url(' + chrome.extension.getURL( srcImage + ( '0000' + MAX_NUM ).slice( -4 ) + '.png') +')';
        imageSize = imageSize + IMAGE_SIZE * (MAX_NUM -1) + 'px top,';
        imageSize = imageSize + IMAGE_SIZE * MAX_NUM + 'px top';
        console.log(imageSize);
        $('.character-animation').css('width',IMAGE_SIZE*MAX_NUM + 'px');
        $('.character-animation').css('animation-timing-function','steps(' + MAX_NUM + ')');
        $('.character-animation').css('background-image',imageUrl);
        $('.character-animation').css('background-position',imageSize);
    }

});