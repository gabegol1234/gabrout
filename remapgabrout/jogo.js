//inicia as config. do jogo
$().ready(function () {
    var canvas = $("#quadro")[0];
    var ctx = canvas.getContext("2d");
    var pontuacao = 0;
    var tijolos = [];
    var inicioGame = false;
    var gameOver = false;

    var base = {
        "vx": 0,
        "x": canvas.width / 2 - 50,
        "y": 270,
        "l": 100,
        "a": 15,
        "cor": "blue",
        atualiza: function () {
            this.x += this.vx;
        },
        desenharObjeto: function () {
            ctx.fillStyle = this.cor;
            ctx.fillRect(this.x, this.y, this.l, this.a);
        }
    };

    var bola = {
        "x": canvas.width / 2,
        "vx": 0,
        "vy": 0,
        "y": 264,
        "raio": 8,
        atualiza: function () {
            this.x += this.vx;
            this.y += this.vy;
        },
        desenharObjeto: function () {
            ctx.fillStyle = "black";
            ctx.beginPath();
            ctx.arc(this.x, this.y, this.raio, 0, 2 * Math.PI);
            ctx.fill();
            ctx.closePath();
        }
    };

    function tijolo(x, y, l, a) {
        return { "x": x, "y": y, "l": l, "a": a };
    }

    function colisaoBolaTijolo(b, t) {
        return (
            b.x + b.raio > t.x &&
            b.x - b.raio < t.x + t.l &&
            b.y + b.raio > t.y &&
            b.y - b.raio < t.y + t.a
        );
    }

    function apagarTela() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
    }

  

    function desenharTela() {
        apagarTela();
     
        // 🔹 Desenha e verifica colisões com tijolos
        for (var i = tijolos.length - 1; i >= 0; i--) {
            var t = tijolos[i];
            ctx.fillStyle = "orange";
            ctx.fillRect(t.x, t.y, t.l, t.a);

            if (!gameOver && colisaoBolaTijolo(bola, t)) {
                bola.vy *= -1;
                tijolos.splice(i, 1);
                pontuacao++;
            }
        }

        if (!gameOver) {
            base.atualiza();
            if (!inicioGame) {
                bola.x = base.x + 50;
            }
            bola.atualiza();

            // 🔹 Colisão com paredes laterais
            if (bola.x + bola.raio > canvas.width || bola.x - bola.raio < 0) {
                bola.vx = -bola.vx;
            }

            // 🔹 Colisão com teto
            if (bola.y - bola.raio < 0) {
                bola.y = bola.raio;
                bola.vy = -bola.vy;
            }

            // 🔹 Colisão com a base (apenas se descendo)
            if (
                bola.vy > 0 &&
                bola.x + bola.raio > base.x && // verifica se a borda direita da bola ultrapassou a esquerda
                bola.x - bola.raio < base.x + base.l &&//  verifica se  borda esquerda da bola esta antes da direita do tijolo
                bola.y + bola.raio >= base.y// verifica se a borda inferior da bola ultrapassou a sperior do tijolo
            ) {
                bola.y = base.y - bola.raio;
                bola.vy = -bola.vy;
            }

            // game over se bola cair abaixo da base
            if (bola.y - bola.raio > base.y + base.a) {
                gameOver = true;
            }
        }

        base.desenharObjeto();
        bola.desenharObjeto();

        // desenha pontuação acima dos tijolos
        ctx.fillStyle = "black";
        ctx.font = "16px Arial";
        ctx.fillText("Pontuação: " + pontuacao, 10, 20);

        // mostra GAME OVER centralizado
        if (gameOver) {
            ctx.fillStyle = "red";
            ctx.font = "40px Arial";
            ctx.textAlign = "center";
            ctx.fillText("GAME OVER", canvas.width / 2, canvas.height / 2);
        }

        requestAnimationFrame(desenharTela);
    }

    // Cria os tijolos
    var xx = 10;
    var yy = 40; // subimos um pouco para não ficar sobre a pontuação
    var ll = 50;
    var aa = 10;
    for (var i = 0; i < 40; i++) {
        if (xx + ll >= canvas.width) {
            yy += 20;
            xx = 10;
        }
        tijolos.push(tijolo(xx, yy, ll, aa));
        xx += ll + 10;
    }

    desenharTela();

    $(window).keydown(function (event) {
        if (event.which == 37) base.vx = -5;
        if (event.which == 39) base.vx = 5;
        if (event.which == 32 && !inicioGame) {
            inicioGame = true;
            bola.vx = Math.random() > 0.5 ? 3 : -3;
            bola.vy = -3;
        }
    });

    $(window).keyup(function (event) {
        if (event.which == 37 || event.which == 39) base.vx = 0;
    });
});
