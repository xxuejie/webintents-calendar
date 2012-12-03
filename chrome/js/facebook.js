(function() {
    function getMiningText(tweet, key) {
        var miningResult = wic.mining.isEvent(tweet) || {};
        var result = "";

        if (miningResult.time) {
            result += "time=" + miningResult.time;
        }

        if (miningResult.place) {
            // For only two fields, we simply check like this.
            // If we have more fields, we may think of refactoring this.
            if (result) {
                result += "&";
            }
            result += "place=" + miningResult.place;
        }

        if (result) {
            result += "&";
        }
        result += "key=" + key;

        return result;
    }
    $("#contentArea").on("hover", ".storyContent", function(event) {
        var contentElement = $(this);
        if (!contentElement.hasClass("wic-mining-processed")) {
            contentElement.addClass("wic-mining-processed");
            var footerElement = contentElement.find(".uiStreamFooter");
            var textElement = contentElement.find(".userContent");
            var url = "http://localhost:9778/intent.html?";
            if (footerElement) {
                $("<a/>")
                    .addClass("wic-calendar-btn")
                    .text("Calendar!")
                    .attr("href", "#")
                    .on('click', function(event) {
                            chrome.extension.sendMessage({ text: textElement.text()},
                                                         function(resp) {
                                                             $.popupWindow(url + getMiningText(textElement.text(), resp.id));
                                                         });
                    })
                    .appendTo(footerElement);
            }
        }
    });
} ());
