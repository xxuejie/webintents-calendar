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
        "<div class='share-twitter share-btn'><a href='#' /></div>" +
        "<div class='share-facebook share-btn'><a href='#' /></div></div>"
    n.html(h)
    share_text = "I scheduled a '" + get_text(i.summary) + "' event, wanna join me?"
    n.find(".share-btn > a").attr('text', share_text)
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
        $(this).siblings(".content").slideToggle(600))
    $(".share-twitter > a").on('click', (event) ->
        twitter_url = "https://twitter.com/intent/tweet?text=" +
            $(this).attr('text') + "&hashtags=WIC"
        $.popupWindow(twitter_url))
    $(".share-facebook > a").on('click', (event) ->
        window.wic.fb.post_status($(this).attr('text'), (resp) ->
            if !resp || resp.error
                alert('Error occured')
            else
                alert('Post ID: ' + resp.id)))

    $("#waiting").hide()

$ ->
    $("#waiting").show()
    $("#container").hide()

    window.wic.gapi.after_load = () ->
        console.log("Running after load")
        window.wic.gapi.list_events((resp) ->
            console.log("Finished")
            if resp.items
                add_calendar_results(resp.items))
