let moveButtonHtml = `
    <h1>YAYO YAYOOOOO DREAMIN</h1>
    <p>
        Guy 1 Controls: Move with W A S D or the buttons below.<br>
        Guy 2 Controls: I J K L or buttons below
    </p>
    <form action="/" method="post">
        <h3>Guy 1 Controls</h3>
        <button name="action" value="up">Up</button><br>
        <button name="action" value="down">Down</button><br>
        <button name="action" value="left">Left</button><br>
        <button name="action" value="right">Right</button><br><br>
    </form>

    <form action="/" method="post">
        <h3>Guy 2 Controls</h3>
        <button name="action2" value="up">Up</button><br>
        <button name="action2" value="down">Down</button><br>
        <button name="action2" value="left">Left</button><br>
        <button name="action2" value="right">Right</button><br><br>
    </form>

    <form action="/reset" method="get">
        <input type="submit" value="Reset World">
    </form>

    <script src="https://code.jquery.com/jquery-3.4.1.min.js"></script>
    <script>
        // keyCodes:
        // a=65 s=83 d=68 w=87
        // i=73 j=74 k=75 l=76
        let action = "none";
        var action2 = "none";
        let loc = window.location.pathname;
        let dir = loc.substring(0, loc.lastIndexOf('/'));
        window.addEventListener('keydown', function(e) {
            switch(e.keyCode) {
            case 65:
                action = "left";
                break;
            case 83:
                action = "down";
                break;
            case 68:
                action = "right";
                break;
            case 87:
                action = "up";
                break;
            case 74:
                action2 = "left";
                break;
            case 75:
                action2 = "down";
                break;
            case 76:
                action2 = "right";
                break;
            case 73:
                action2 = "up";
                break;
            default:
                action = "none";
            }
            $.ajax({
                type: "POST",
                url: "/",
                data: {
                    action: action,
                    action2: action2
                },
                success: function() {
                    console.log("Moved " + action);
                }
            });
            window.location.replace(dir);
        });
    </script>
`;


module.exports = {
    moveButtonHtml
}
