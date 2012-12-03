window.wic = window.wic || {};
window.wic.gapi = {};

API_KEY = "AIzaSyDQ__oRXr-5fk5a0OEdF-L02uFF0YvnyKI"
CLIENT_ID = "273033143934.apps.googleusercontent.com"
SCOPES = "https://www.googleapis.com/auth/calendar"

window.wic.gapi.create_event = (body, callback) ->
    request = gapi.client.calendar.events.insert({
        'calendarId': 'primary',
        'resource': body
    })
    request.execute(callback)

window.wic.gapi.list_events = (callback) ->
    request = gapi.client.calendar.events.list({
        'calendarId': 'primary'
    })
    request.execute(callback)

authComplete = (authResult) ->
    gapi.client.load('calendar', 'v3', () ->
        console.log("Calendar api loaded!")
        if typeof window.wic.gapi.after_load == 'function'
            window.wic.gapi.after_load())

checkAuth = () ->
    gapi.auth.authorize({client_id: CLIENT_ID, scope: SCOPES, immediate: true},
        authComplete)

load = () ->
    gapi.client.setApiKey(API_KEY)
    window.setTimeout(checkAuth, 1)

window.load = load
