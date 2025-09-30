// incia as configurações do jogo 
$().ready(function () { // executa o codigo quando o HTML estiver totalmente carregado
    var canvas = $("#quadro")[0];// pega o elemento canvas com o id armazena na variavel canvas
    var ctx = canvas.getContext("2d");// criando o contexto para desenhar no canvas
    var ultimaColisao = false;
    var pontuacao = 0;
    var gameOver = false;
    var tijolos = [];
    var inicioGame=false;

    // Controle de tempo para velocidade da cobra
    var ultimoTempoAtualizacao = 0;
    var intervaloAtualizacao = 120; // fiz o controle de intervalo da cobra em milessegundos, limitando a velocidade
     // ciando a cobra 
    var base =  {
            "vx": 0, //velocidade 
            "x": canvas.width/2-50,
            "y": 270,
            "l": 100,//largura
            "a": 15,//altura
            "cor": "blue",
            atualiza: function () {// movimenta o segmento somandosse a velocidade
                this.x += this.vx;
               // this.y += this.vy;
            },
            desenharObjeto: function () { // desenha o retangulo 
                ctx.fillStyle = this.cor;
                ctx.fillRect(this.x, this.y, this.l, this.a);
            }
    }
    var bola = {
        "x": canvas.width/2,
        "vx":0,
        "vy":0,
        "y": 264,
        "raio":8,
        atualiza: function () {// movimenta o segmento somandosse a velocidade
            this.x += this.vx;
            this.y += this.vy;
        },
        desenharObjeto:function(){
            ctx.fillStyle = "black";
            ctx.beginPath();
            ctx.arc(this.x, this.y, this.raio, 0, 2 * Math.PI); // círculo completo
            ctx.fill();   
            ctx.closePath(); 
        }
    }
     function tijolo(x,y,l,a){
        return{
            "x":x,
            "y":y,
            "l":l,
            "a":a,
            "verdadeiro":true
        }
      

        
     }
     // verifica se o o1 e o2 se sobrepoe faz o aumento das pontuações e add um novo quadrado no final da cobra
    function detectaColisao(o1, o2) {
        var top1 = o1.y;
        var top2 = o2.y;
        var esq1 = o1.x;
        var esq2 = o2.x;
        var dir1 = o1.x + o1.l;
        var dir2 = o2.x + o2.l;
        var base1 = o1.y + o1.a;
        var base2 = o2.y + o2.a;

        if (base1 > top2 && dir1 > esq2 && base2 > top1 && dir2 > esq1) {
            if (!ultimaColisao) {
                pontuacao++;
                let ultimo = snake[snake.length - 1];
                // Posiciona o novo segmento sempre atras do ultimo segmento 
                let novoX = ultimo.x - ultimo.vx;
                //let novoY = ultimo.y - ultimo.vy;
                snake.push(criaItemSnake(novoX, novoY));
                
                ultimaColisao = true;
            }
        } else {
            ultimaColisao = false;
        }
    }
     // verifica se a cobra saiu doi limite do canvas se sim, ativo o gameover
    function detectaLimite(obj) {
        if (obj.x < 0){
            obj.x =0;
        }
        else if(obj.x + obj.l > canvas.width) {
            obj.x =  canvas.width - obj.l;
        }
    }
    // cobra autocolide
    
     //limpa tela do canvas
    function apagarTela() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
    }
     // loop do jogo
    function desenharTela() {
        apagarTela();

        // Atualiza posição dos segmentos (do fim até o primeiro)
        for(var i = 0; i <40; i++){
            ctx.fillRect(tijolos[i].x,tijolos[i].y,tijolos[i].l,tijolos[i].a)
         }
        
        base.atualiza();
        if(inicioGame==false){
            bola.x=base.x+50;
        }//
        bola.atualiza();

        detectaLimite(base);
        //verificaAutoColisao();

        // Desenha todos os segmentos
        //for (let i = 0; i < snake.length; i++) {
        base.desenharObjeto();

        bola.desenharObjeto();

        /*
        if (gameOver) {
            apagarTela();
            ctx.fillStyle = "red";
            ctx.font = "40px Arial";
            ctx.fillText("GAME OVER", canvas.width / 2 - 120, canvas.height / 2);
            ctx.font = "20px Arial";
            ctx.fillText("Pontuação final: " + pontuacao, canvas.width / 2 - 90, canvas.height / 2 + 40);
            return;
        }
        */
        /*
        if (tempoAtual - ultimoTempoAtualizacao < intervaloAtualizacao) {
            // Ainda não chegou o momento de atualizar a lógica, só desenha
            apagarTela();

           // for (let i = 0; i < snake.length; i++) {
                base.desenharObjeto();
            //}
        */
          
        /*
            ctx.fillStyle = "black";
            ctx.font = "20px Arial";
            ctx.fillText("Pontuação: " + pontuacao, 10, 20);
            return;
        */


            requestAnimationFrame(desenharTela);
        }

       // ultimoTempoAtualizacao = tempoAtual;

        
        //}

  

        // Desenha pontuação
        //ctx.fillStyle = "black";
       // ctx.font = "20px Arial";
      //  ctx.fillText("Pontuação: " + pontuacao, 10, 20);
    //}
    // cria o primeiro seguimento 
    //snake.push(criaItemSnake());

  //  requestAnimationFrame(desenharTela);
    var xx=10;
    var yy=10;
    var ll=50;
    var aa=10;
     for(var i = 0; i <40; i++){
        if(xx+ll>=canvas.width){
            yy=yy+20;
            xx=10;
        }
        tijolos.push(tijolo(xx,yy,ll,aa));
        xx=xx+ll+10;
     }
    //chamando inicio do jogo
    desenharTela();


    $(window).keydown(function (event) {// detecta telcas precionadas
        // Evita inverter a direção instantaneamente
        if (event.which == 37) {  // esquerda
            
            base.vx = -5;
            //snake[0].vy = 0;
        }
        if (event.which == 39) { 
           
            base.vx = 5;
            //snake[0].vy = 0;
        }
    });
});
