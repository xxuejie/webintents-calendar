// Content script for twitter
(function() {
    function getMiningText(tweet, key, callback) {
        wic.mining.isEvent(tweet, function(miningResult) {
            miningResult = miningResult || {};
            var result = "";

            if (miningResult.title) {
                result += "title=" + miningResult.title;
            }

            if (miningResult.time) {
                // For only two fields, we simply check like this.
                // If we have more fields, we may think of refactoring this.
                if (result) {
                    result += "&";
                }
                result += "time=" + miningResult.time;
            }

            if (miningResult.place) {
                if (result) {
                    result += "&";
                }
                result += "place=" + miningResult.place;
            }

            if (result) {
                result += "&";
            }
            result += "key=" + key;

            callback(result);
        });
    }

    $("#page-container > .content-main > .stream-container").on(
        "hover", ".tweet", function(event) {
            var contentElement = $(this);
            if (!contentElement.hasClass("wic-mining-processed")) {
                contentElement.addClass("wic-mining-processed");
                var footerElement = contentElement.find(".stream-item-footer");
                var textElement = contentElement.find("p.js-tweet-text");
                var url = "http://localhost:9778/intent.html?";
                if (footerElement) {
                    $("<a/>")
                        .addClass("wic-calendar-btn")
                        .text("Calendar!")
                        .attr("href", "#")
                        .on('click', function(event) {
                            chrome.extension.sendMessage({ text: textElement.text()},
                                                         function(resp) {
                                                             getMiningText(textElement.text(), resp.id, function(queryString) {
                                                                 $.popupWindow(url + queryString);
                                                             });
                                                         });
                        })
                        .appendTo(footerElement);
                }
            }
        });
}());
