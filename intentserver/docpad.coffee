docpadConfig = {
    plugins:
        handlebars:
            helpers:
                getBlock: (type, additional...) ->
                    additional.pop()
                    @getBlock(type).add(additional).toHTML()
}

module.exports = docpadConfig