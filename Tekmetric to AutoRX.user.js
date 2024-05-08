// ==UserScript==
// @name         Tekmetric to AutoRX
// @namespace    http://tampermonkey.net/
// @version      2024-05-03
// @description  AI to improve your sales and insights!
// @author       XJoin LLC
// @match        https://shop.tekmetric.com/admin/shop/4728/repair-orders/*
// @icon         https://www.google.com/s2/favicons?sz=64&domain=tampermonkey.net
// @grant        none
// @downloadURL  https://github.com/xjoin-ai/tampermonkey/raw/main/Tekmetric%20to%20AutoRX.user.js
// @updateURL https://github.com/xjoin-ai/tampermonkey/raw/main/Tekmetric%20to%20AutoRX.user.js
// ==/UserScript==

function gather_ro() {
    try {
        if(!demo){
            ro = false;
            ro = document.getElementsByTagName('title')[0].innerHTML.match('#([0-9]*):')[1]
            console.log('RO # found! RO: '+ro);
        }else{
            console.log(`Demo - skipping "gathering"`);
        }
    } catch (error) {
        window.alert(`Unable to find RO # on the page. \n Please contact AutoRx support.`);
    }
    clearInterval(gather_ro_interval);
}

function gather_miles() {
    // This whole try-catch block can be removed if we do not wish to check for mileage before launching autorx
    try {
        if(!demo){
            mileage = false;
            if(!document.getElementsByClassName('pendo-vehicle-odometer')[0].children[1].outerHTML.toString().includes('Add')){
                mileage = document.getElementsByClassName('pendo-vehicle-odometer')[0].children[1].children[1].innerHTML.match('#([0-9]*):')[1];
                console.log('Mileage found! Miles: '+mileage);
                clearInterval(gather_miles_interval);
            }
        }else{
            console.log(`Demo - skipping miles`);
            clearInterval(gather_miles_interval);
        }
    } catch (error) {
        window.alert(`Unable to find miles on the page. \n Please contact AutoRx support.`);
        clearInterval(gather_miles_interval);
    }
}

function builder() {
    'use strict';
    if(!button_built){
        // build our button 'AutoRx'
        const innerdiv = document.createElement('div');
        innerdiv.innerHTML = 'AutoRx';
        const autorxButton = document.createElement('button');
        // autorxButton.setAttribute('class','MuiButtonBase-root outline-none items-center flex text-label-normal cursor-pointer rounded-lg px-4 h-10 bg-transparent disabled:text-v2-shade-200 hover:bg-blue-300');
        autorxButton.setAttribute('id','autorx_button');
        autorxButton.setAttribute('style',`transition: all .25s ease-in-out; position: fixed; bottom: 0; left: 5%; display: inline-flex;
                                        cursor: pointer; align-items: center; justify-content: center; margin: 0 3em 3em 0; border-radius: 50%;
                                        padding: .2em; width: 60px; height: 60px; background-color: #0396ff; background-image: linear-gradient(to bottom right, #e6f4ff, #0396ff);
                                        box-shadow: 7px 7px 3px lightblue; text-shadow: .5px .5px #81a6cc;`);
        autorxButton.addEventListener('click', go_autorx);
        autorxButton.appendChild(innerdiv);

        // Add the button
        document.body.appendChild(autorxButton);
        button_built = true;
        clearInterval(build_interval);
    }
};

// 'click' listener for button
function go_autorx() {
    let url = '';
    if(!demo){
        if(!mileage){
            window.alert('Please add mileage to this RO first.');
            gather_miles_interval = setInterval(gather_miles, 5000);
            return;
        }
        url = `https://dev-autorx.xjoin.io/?ro=${ro}&mi=${mileage}&test=false`
    }else{
        // For Demos - Prod Site
        url = `https://autorx.xjoin.io/?ro=${ro}&mi=${mileage}&test=false`
        // For Demos - Dev Site
        // const url = `https://dev-autorx.xjoin.io/?ro=${ro}&mi=${mileage}&test=false`
    }
    //
    // *BELOW* - For use with Tekmetric sandbox
    //

    // AutoRx Dev Site
    // const url = `https://dev-autorx.xjoin.io/?ro=${ro}&mi=${mileage}&test=false`

    // AutoRx Prod Site
    // const url = `https://autorx.xjoin.io/?ro=${ro}&mi=${mileage}&test=false`

    window.open(url, '_blank').focus();
}
// Set this to `true` for demos. This turns off mileage blocker.
let demo = true;
// Used to check if mileage has been set on the RO and if it can be retrieved
let mileage = 15000;
// Used to store RO #
let ro = 1021112;
// Used to ensure only one button is added
let button_built = false;
// Call 'submit_search' every 5 seconds
let build_interval = setInterval(builder, 1000);
let gather_ro_interval = setInterval(gather_ro, 5000);
let gather_miles_interval = setInterval(gather_miles, 5000);