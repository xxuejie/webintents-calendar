window.wic = window.wic || {};
window.wic.fb = {};

post_stream = (body, callback) ->
    FB.api('/me/feed', 'post', { message: body }, callback)

try_login = (callback) ->
    FB.getLoginStatus((resp) ->
        if resp.status == 'connected'
            # already login
            callback()
        else
            FB.login(callback,
                {scope: 'publish_stream'}))

window.wic.fb.post_status = (body, callback) ->
    try_login(() ->
        post_stream(body, callback))