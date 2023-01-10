// background.js
'use strict';

function buildUrls() {
    const removeDuplicates = function removeDuplicates(arr) {
        let uniqueArray = [];
        arr.forEach(function (value) {
            if (uniqueArray.indexOf(value) === -1) {
                uniqueArray.push(value);
            }
        });
        return uniqueArray;
    };

    let trElements = document.querySelectorAll('tr[id]');
    let urls = [];
    trElements.forEach(element => {
        let id = element.getAttribute('id');
        let url = `https://five.libsyn.com/episodes/edit/${id}`;
        urls.push(url);
    });
    trElements = document.querySelectorAll('a[id^="video-title"]');
    trElements.forEach(element => {
        let href = element.getAttribute('href');
        let url = `https://studio.youtube.com${href}`;
        urls.push(url);
    });
    return removeDuplicates(urls);
}

chrome.action.onClicked.addListener(async function (tab) {
    try {
        await chrome.scripting.executeScript({
            target: {
                tabId: tab.id,
            },
            func: buildUrls
        }, (res) => {
            res[0].result.forEach(url => {
                chrome.tabs.create({
                    url: url
                });
            });
        });
    } catch (err) {
        console.error(`failed to execute script: ${err}`);
    }
});
