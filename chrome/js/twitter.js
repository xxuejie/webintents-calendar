// Content script for twitter
(function() {
    function getMiningText(tweet) {
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

        return result;
    }

    $("#page-container > .content-main > .stream-container").on(
        "hover", ".tweet", function(event) {
            var contentElement = $(this);
            if (!contentElement.hasClass("wic-mining-processed")) {
                contentElement.addClass("wic-mining-processed");
                var footerElement = contentElement.find(".stream-item-footer");
                var textElement = contentElement.find("p.js-tweet-text");
                var url = "http://localhost:9778/intent.html?" +
                        getMiningText(textElement.text());
                if (footerElement) {
                    $("<a/>")
                        .addClass("wic-calendar-btn")
                        .text("Calendar!")
                        .attr("href", "#")
                        .on('click', function(event) {
                            $.popupWindow(url);
                        })
                        .appendTo(footerElement);
                }
            }
        });
}());
