// Content script for twitter
(function() {
    function startCalendarService(tweet) {
        var result = wic.mining.isEvent(tweet) || {};
        var resultTime = result.time || "no time";
        var resultPlace = result.place || "no place";

        // TODO: implement this
        alert("Start calendar intent service with time: " + resultTime
              + " and place: " + resultPlace);
    }

    $("#page-container > .content-main > .stream-container").on(
        "hover", ".content", function(event) {
            var contentElement = $(this);
            if (!contentElement.hasClass("wic-mining-processed")) {
                contentElement.addClass("wic-mining-processed");
                var footerElement = contentElement.find(".stream-item-footer");
                var textElement = contentElement.find("p.js-tweet-text");
                if (footerElement) {
                    $("<a/>")
                        .addClass("wic-calendar-btn")
                        .text("Calendar!")
                        .click(function() {
                            startCalendarService(textElement.text());
                        })
                        // .end()
                        .appendTo(footerElement);
                }
            }
        });
}());
