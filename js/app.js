
// Classe dos inimigos
const Enemy = function(x, y) {
    this.x = x;
    this.y = y;
    this.maxSpeed = 25;
    this.minSpeed = 75;
    this.speed = Math.floor(Math.random() * this.maxSpeed) + this.minSpeed;
    this.sprite = "images/enemy-bug.png";
};

// Classe extra criada para exibir o Score
const Score = function(x, y) {
  this.x = x;
  this.y = y;
  this.scorePoints = 0;
}
// Responsável pela movimentação dos inimigos
Enemy.prototype.update = function(dt) {

  // Para que os inimigos andem, é necessário multiplicar um posicionamento pelo parâmetro 'dt'
  // 'dt' é definido no arquivo engine.js

  this.x += this.speed * dt;

  // Responsável por resetar a posição dos inimigos
  const fieldWidth = 505; // Tamanho do campo
  const positionEnemyStart = -50; // Posição inicial
  if (this.x > fieldWidth) {
    this.x = positionEnemyStart;
    this.maxSpeed += 10;
    this.minSpeed += 5;
    this.speed = Math.floor(Math.random() * this.maxSpeed) + this.minSpeed; // Randomiza velocidade
  };

  // Reponsável por calcular as colisões com os insentos
  if (player.x < this.x + 80 &&
    player.x + 80 > this.x &&
    player.y < this.y + 65 &&
    65 + player.y > this.y) {

    score.scorePoints -= 250;
    player.reset();

  };

};

// Responsável por renderizar a imagem de sprite dos inimigos
// A imagem tem que estar listada em Resources do engine.js
Enemy.prototype.render = function () {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

// Classe do jogador
const Player = function(x, y) {
    this.x = x; // Posição X
    this.y = y; // Posição Y
    this.sprite = "images/char-pink-girl.png"; // Sprite
};

// Renderiza sprite do jogador
// A imagem tem que estar listada em Resources do engine.js
Player.prototype.render = function () {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

// Renderiza o score
Score.prototype.render = function () {
      ctx.font = "bold 50px Impact";
      ctx.fillStyle = "#3e3e3e";
      ctx.fillText("SCORE: " + this.scorePoints, this.x, this.y);
};


// Calcula chegada do player na água
Player.prototype.update = function (dt) {

  // Adiciona 1000 pontos e chama o método reset
  if ( this.y == -50) {
    score.scorePoints += 1000;
    this.reset();
  };

};

// Reseta a posição do sprite do jogador.
Player.prototype.reset = function() {
    this.x = 200;
    this.y = 375;
};


// Responsável pelo movimento do jogador baseado nas teclas
// Define quanto o jogador se desloca e limita para que não exceda o limite do canvas.
Player.prototype.handleInput = function(key) {

    if ( key ==='right' && this.x < 400) {
        this.x += 100;
    }

    if (key ==='left'&& this.x > 0) {
        this.x -= 100;
    }

    if ( key === 'up' && this.y > 0) {
        this.y -= 85;
    }

    if ( key === 'down' && this.y < 375) {
        this.y += 85;
    }


};

// Objeto do jogador
const player = new Player(200, 375);

// Objeto do Score
const score = new Score(0, 650);

// Array de objetos dos inimigos
const allEnemies = [];
let enemy1 = new Enemy(-50, 45);
let enemy2  = new Enemy(-50, 130);
let enemy3  = new Enemy(-50, 215);
let enemy4 = new Enemy(-50, 300);

// O método push() adiciona todos os objetos criados na array AllEnemies
allEnemies.push(enemy1, enemy2, enemy3, enemy4);

// This listens for key presses and sends the keys to your
// Player.handleInput() method. You don't need to modify this.
document.addEventListener('keyup', function(e) {
    var allowedKeys = {
        37: 'left',
        38: 'up',
        39: 'right',
        40: 'down'
    };
    player.handleInput(allowedKeys[e.keyCode]);
});
