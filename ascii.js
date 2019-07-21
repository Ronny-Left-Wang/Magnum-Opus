let deer = `
<pre> 
\\    / 
\\_/  ___   ___
o o-'   '''   '
O -.         |
    | |'''| |
     ||   | |
     ||    ||
     "     "
</pre>`;

function test(s) {
    s.replace('_', "<br>");
    return s;
}

console.log(deer.length);
console.log(test(deer));

module.exports = {
    deer,
}
