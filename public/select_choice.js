var choices = ["_", "MOUSE_UP", "MOUSE_DOWN", "MOUSE_LEFT","MOUSE_RIGHT",
 "ENTER","ESCAPE","SPACE", "TAB","SHIFT","CONTROL",
 "ALT","UP","DOWN","LEFT", "RIGHT"]

var f = "F"
var all_f = []

for (var i = 1; i<13; i++){
    all_f.push(f+i)
}

var all_choices = [...choices, ...all_f]

var min = 0
var max = all_choices.length


for (var i = min; i < max; i++){
    $(".select").append(`<option value=${all_choices[i]}>${all_choices[i]}</option>`)
}
