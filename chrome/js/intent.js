(function() {
    var getParameterByName;

    getParameterByName = function(name) {
        var regex, regexS, results;
        name = name.replace(/[\[]/, "\\[").replace(/[\]]/, "\\]");
        regexS = "[\\?&]" + name + "=([^&#]*)";
        regex = new RegExp(regexS);
        results = regex.exec(window.location.search);
        if (results == null) {
            return "";
        } else {
            return decodeURIComponent(results[1].replace(/\+/g, " "));
        }
    };

    $("#submit").click(function() {
        chrome.extension.sendMessage({
            key: getParameterByName("key"),
            title: $("#calendar-title").val(),
            startDate: $("#calendar-start").val(),
            endDate: $("#calendar-end").val(),
            place: $("#calendar-place").val(),
            description: $("#calendar-description").val()
        }, function(response) {
            console.log("Response: " + JSON.stringify(response));
        });
    });
} ());
