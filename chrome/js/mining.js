// text mining part

wic.mining = {};

/**
 * Check if a tweet or status looks like a calendar event.
 *
 * Returns false if it does not look like a calendar event.
 * Otherwise an object containing possible time and place field
 * will be returned.
 */
wic.mining.isEvent = function(text) {
    // TODO: implement this
    return { "time": new Date().toJSON(),
             "place": "Mars" };
};
