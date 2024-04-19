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

    const buildEst = Array.from(document.querySelectorAll('[data-cy="build-estimate-primary"]'))[0];
    const buildClone = buildEst.cloneNode(true);
    buildClone.setAttribute('id','autorx_button');
    buildEst.parentNode.parentNode.appendChild(buildClone);
    buildClone.querySelector('span').lastChild.textContent = "   AutoRx"
    buildClone.addEventListener("click", alert_message);
    clearInterval(interval);
};

function alert_message() {
    const ro = document.getElementsByTagName('title')[0].innerHTML.match('#([0-9]*):')[1]
    const url = `https://tekmetric.xjoin.io/?ro=${ro}`
    window.open(url, '_blank').focus();
}

let interval = setInterval(submit_search, 1000);