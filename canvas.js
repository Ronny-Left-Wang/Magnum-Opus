let container = `
    <canvas id="game" width="400" height="400" style="border:1px solid #000000;"></canvas>

    
    <script>
        let c = document.getElementById("game");
        let ctx = c.getContext('2d');
        let width = c.width;
        let height = c.height;
        let x = 20;
        let y = 20;
        while (y != width) {
            ctx.beginPath();
            ctx.moveTo(x, 0);
            ctx.lineTo(x, height);
            ctx.stroke();
            x += 20;
            ctx.beginPath();
            ctx.moveTo(0, y);
            ctx.lineTo(width, y);
            ctx.stroke();
            y += 20;
        }
    
    
    </script>


<br>`;

module.exports = {
    container
}
