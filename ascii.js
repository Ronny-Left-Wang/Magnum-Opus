let deer = ` 
    \\  /
    \\_/  ___   ___
    o o-'   '''   '
    O -.         |
        | |'''| |
         ||   | |
         ||    ||
         "     "
`;

// What did alan want me to do here?
// he said he wanted me to use critical thinking to debug
// remember to use console log cause it'll help figure out

function transgender(s) {
    let s2 = [];
    s2[0] = "<pre>"
    s2[s.length-1] = "</pre>";
    for (let i = 1; i < s.length - 1; i++) {
        if (s[i] == '\n') {
            s2[i] = '<br>';
        } else {
            s2[i] = s[i];
        }
    }
    return s2.join("");
}

module.exports = {
    deer,
    transgender
}
