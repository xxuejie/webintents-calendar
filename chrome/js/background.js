var counter = 1;
var cache = {};

chrome.extension.onMessage.addListener(
    function(request, sender, sendResponse) {
        console.log(sender.tab ?
                    "from a content script:" + sender.tab.url :
                    "from the extension");
        console.log("Data: " + JSON.stringify(request));
        if(request.text) {
            // contains real text
            var i = "" + counter;
            counter++;

            cache[i] = request.text;
            sendResponse({id: i});
        } else {
            // contains other stuffs
            var k = request.key;
            if (cache[k]) {
                wic.mining.process(cache[k],
                                   request.title,
                                   request.startDate,
                                   request.endDate,
                                   request.place,
                                   request.description);
                delete cache[k];
            }
            sendResponse({status: "ok"});
        }
  });
