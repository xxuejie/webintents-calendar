// text mining part

wic.mining = {};

/**
 * Check if a tweet or status looks like a calendar event.
 *
 * Returns false if it does not look like a calendar event.
 * Otherwise an object containing possible time and place field
 * will be returned.
 */
wic.mining.isEvent = function(text, callback) {
    text = text.trim();
    text = encodeURIComponent(text);
    var URL = "http://nameless-refuge-7929.herokuapp.com/parse";
    var xhr = new XMLHttpRequest();
    xhr.open("POST", URL, true);
    xhr.onreadystatechange = function() {
        if (xhr.readyState == 4) {
            callback(JSON.parse(xhr.responseText));
        }
    };
    xhr.send(text);
};

wic.mining.process = function(text, title, startDate, endDate, place, description) {
    // TODO: implement this
    console.log("Received:\n" +
                "text: " + text + "\n" +
                "title: " + title + "\n" +
                "startDate: " + startDate + "\n" +
                "endDate: " + endDate + "\n" +
                "place: " + place + "\n" +
                "description: " + description + "\n");
}
