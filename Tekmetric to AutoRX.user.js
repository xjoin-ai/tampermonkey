// ==UserScript==
// @name         Tekmetric to AutoRX
// @namespace    http://tampermonkey.net/
// @version      2024-04-18
// @description  AI to improve your sales and insights!
// @author       XJoin LLC
// @match        https://shop.tekmetric.com/admin/shop/4728/repair-orders/*
// @icon         https://www.google.com/s2/favicons?sz=64&domain=tampermonkey.net
// @grant        none
// ==/UserScript==

function submit_search() {
    'use strict';
    if(!document.getElementsByClassName('pendo-vehicle-odometer')[0].children[1].outerHTML.toString().includes('Adding')){
        const mainBody = document.getElementsByTagName('main');
        const innerdiv = document.createElement('div');
        innerdiv.innerHTML = 'AutoRx';
        const autorxButton = document.createElement('button');
        const header = document.getElementsByTagName('header');
        autorxButton.setAttribute('class','MuiButtonBase-root outline-none items-center flex text-label-normal cursor-pointer rounded-lg px-4 h-10 bg-transparent disabled:text-v2-shade-200 hover:bg-blue-300');
        autorxButton.setAttribute('id','autorx_button');
        autorxButton.addEventListener('click', alert_message);
        autorxButton.appendChild(innerdiv);
        document.querySelectorAll('header div')[0].children[0].appendChild(autorxButton);
        clearInterval(interval);
    }
};

function alert_message() {
    const ro = document.getElementsByTagName('title')[0].innerHTML.match('#([0-9]*):')[1]
    const url = `https://autorx.xjoin.io/?ro=${ro}&mi=15000&test=false`
    // const url = `https://dev-autorx.xjoin.io/?ro=1021112&mi=15000&test=false`
    window.open(url, '_blank').focus();
}

let interval = setInterval(submit_search, 1000);