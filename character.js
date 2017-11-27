const imageCancel = 'image/cancel/';
const imageStart = 'image/start/';
const imageTest = 'image/test/';
const MAX_NUM=50;
const IMAGE_SIZE=160;

$(function () {
    'use strict';

    chrome.extension.onRequest.addListener(
        (request, sender, sendResponse) => {
            //★ここに★ 表示しているサイトのベースカラーを変更する処理を記述する。
              
            if (request.download === "start"){
                $('body')
                .append(
                    '<div class="character_wrapper"><div class="character-animation"></div></div>');
                $('.character-animation').on('click',()=>{
                   // $('.character_wrapper').remove();
                });
                changeImage(imageStart);
                sendResponse({character: "show"});
            }
            if(request.downloadSpeed >= 0){
                console.log('speed '+request.downloadSpeed / (1024*1024) );
            }
            if(request.downloadProgress >= 0 ){
                console.log('progress '+request.downloadProgress);
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
    /*
    function changeImage(srcImage){
        let imageUrl = '';
        let imageSize = '';
        for(let i=1; i < MAX_NUM;i++){
            imageUrl = imageUrl + 'url(' + chrome.extension.getURL(srcImage + i + '.png')+'),';
            imageSize = imageSize + IMAGE_SIZE * (i -1) + ' top,'
        }
        imageUrl = imageUrl + 'url(' + chrome.extension.getURL( srcImage + MAX_NUM + '.png') +')';
        imageSize = imageSize + IMAGE_SIZE * (MAX_NUM -1) + ' top,'
        imageSize = imageSize + IMAGE_SIZE * MAX_NUM + ' top'
        $('.character-animation').css('background-image',imageUrl);
        $('.character-animation').css('background-position','0 top,160px top,320px top,480px top,640px top,800px top,960px top,1120px top,1280px top,1440px top');
    }
    */

});