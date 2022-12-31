// background.js
'use strict';

function buildUrls() {
    const trElements = document.querySelectorAll('tr[id]');
    let urls = [];
    trElements.forEach(element => {
        let id = element.getAttribute('id');
        let url = `https://five.libsyn.com/episodes/edit/${id}`;
        urls.push(url);
    });
    return urls;
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
