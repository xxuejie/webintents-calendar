get_time = (o) ->
    if o && o.dateTime
        moment(new Date(o.dateTime)).format('LLLL')
    else
        "Not specified!"

get_text = (t) ->
    if t
        t
    else
        "Not specified!"

create_new_node = (i) ->
    n = $("<div class='item' />")
    h = "<div class='title'>" + i.summary + "</div>" +
        "<div class='content'>" +
        "<div><span>Start Time: </span><p>" + get_time(i.start) + "</p></div>" +
        "<div><span>End Time: </span><p>" + get_time(i.end) + "</p></div>" +
        "<div><span>Place: </span><p>" + get_text(i.location) + "</p></div>" +
        "<div><span>Description: </span><p>" + get_text(i.description) + "</p></div>" +
        "</div>"
    n.html(h)
    n

filter_item = (i) ->
    if i.description && (typeof i.description == 'string')
        i.description.indexOf("#WIC") != -1
    else
        false


add_calendar_results = (items) ->
    $("#container").show()

    left_title = 0
    container = $("#container")
    for i in items
        if filter_item(i)
            create_new_node(i).appendTo(container)

    $(".item .title").click(() ->
        $(this).siblings(".content").slideToggle(1000))

    $("#waiting").hide(1000)

$ ->
    $("#waiting").show()
    $("#container").hide()

    window.wic.gapi.after_load = () ->
        console.log("Running after load")
        window.wic.gapi.list_events((resp) ->
            console.log("Finished")
            if resp.items
                add_calendar_results(resp.items))
