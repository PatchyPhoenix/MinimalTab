chrome.runtime.onInstalled.addListener(function (object) {
    let externalUrl = "/welcome.html";

    if (object.reason === chrome.runtime.OnInstalledReason.INSTALL) {
        chrome.tabs.create({ url: externalUrl });
    }
});