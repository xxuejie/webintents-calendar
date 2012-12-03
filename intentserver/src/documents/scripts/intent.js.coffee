getParameterByName = (name) ->
    name = name.replace(/[\[]/, "\\[").replace(/[\]]/, "\\]")
    regexS = "[\\?&]" + name + "=([^&#]*)"
    regex = new RegExp(regexS)
    results = regex.exec(window.location.search)
    unless results?
        ""
    else
        decodeURIComponent results[1].replace(/\+/g, " ")

setTimePicker= (i, t) ->
    picker = $("#" + i)
    picker.scroller({
        preset: 'datetime',
        theme: 'android-ics light',
        display: 'bubble',
        mode: 'mixed'
    })
    picker.scroller('setDate', t)

    timeShowText = $.scroller.formatDate('mm/dd/yyyy hh:ii A ', t)
    picker.val(timeShowText)

$ ->
    timeText = getParameterByName("time")
    placeText = getParameterByName("place")

    t = new Date();
    if timeText != ""
        t = new Date(timeText)
    setTimePicker("calendar-start", t)
    setTimePicker("calendar-end", t)

    $("#calendar-place").val(placeText)
    $("#calendar-title").val(getParameterByName("title"))

    $("#submit").click(() ->
        body = {
            "summary": $("#calendar-title").val(),
            "start": {
                "dateTime": $("#calendar-start").scroller('getDate').toISOString()
            },
            "end": {
                "dateTime": $("#calendar-end").scroller('getDate').toISOString()
            },
            "location": $("#calendar-place").val()
            "description": $("#calendar-description").val() + "\n#WIC"
        }
        window.wic.gapi.create_event(body, (resp) ->
            window.resp = resp
            if resp.error
                # Error occurs
                $("#alert").text("Error:" + resp.message)
                    .addClass("error")
            else
                # Okay
                $("#alert").text("Event created!")
                    .addClass("ok")))
