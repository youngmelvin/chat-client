const $ = require('jquery')
const widget = require('./src')

$(document).ready(() => {
    let w = widget()
    w.appendTo(document.body)
})