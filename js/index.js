window.onload = function () {
  let currentGame;
  let currentSurvivor;

  document.getElementById('game-board').style.display = 'none';
  const myCanvas = document.getElementById('the-canvas');
  const ctx = myCanvas.getContext('2d');

  //Game Class
  class Game {
    constructor () {
      this.survivor = {} // survivor => object
      this.zombies = [] // zombies => array
      this.door = {}
      this.escaped = 0
    }
  }

  //Survivor Class
  class Survivor {
    constructor () {
      this.x = 220
      this.y = 520
      this.width = 70
      this.height = 70
      this.img = '/images/survivor-move_knife_0.png'
    }

    drawSurvivor () {
      const survivorImg = new Image()
      survivorImg.src = this.img
      ctx.drawImage(survivorImg, this.x, this.y, this.width, this.height)
    }

    moveSurvivor (num) {
      ctx.clearRect(this.x, this.y, this.width, this.height)
      switch (num) {
        case 37:
          if (this.x > 20) {
            this.x -= 10
          }
          break
        case 39:
          if (this.x < 600) {
            this.x += 10
          }
          break
        case 38:
            if (this.y > 20) {
              this.y -= 10
            }
            break
        case 40:
            if (this.y < 900) {
                this.y += 10
            }
          break    
      }
    }
  }

  //Door Class
  class Door {
    constructor () {
      this.x = 100
      this.y = 100
      this.width = 70
      this.height = 70
      this.img = '/images/door.png';
    }

    drawSurvivor () {
      const doorImg = new Image()
      doorImg.src = this.img
      ctx.drawImage(doorImg, this.x, this.y, this.width, this.height)
    }

    
    }

  // KEYDOWN EVENT LISTENER ===============
  document.onkeydown = function (e) {
    // console.log('what is e: ', e);
    let whereToGo = e.keyCode
    currentGame.survivor.moveSurvivor(whereToGo)
    // currentCar.moveCar(whereToGo);
  }

  // OBSTACLE ============================
  class Zombie {
    constructor (x, y, width, height) {
      this.x = x
      this.y = y
      this.width = 70
      this.height = 70
      this.img = '/images/zombie-attack_0.png';
    }

    drawZombie () {
      const zombieImg = new Image()
      zombieImg.src = this.img
      ctx.drawImage(zombieImg, this.x, this.y, this.width, this.height)
    }
    getLeft () {
      return this.x
    }
    getRight () {
      return this.x + this.width
    }
    getBottom () {
      return this.y + this.height
    }
  }

  // COLLISION DETECTION ====================
  function detectCollision (zombie) {
    return !((currentSurvivor.y > zombie.getBottom()) ||
      (currentSurvivor.x + currentSurvivor.width < zombie.getLeft()) ||
      (currentSurvivor.x - 5 > zombie.getRight()))
  }

  // START GAME ============================
  document.getElementById('start-button').onclick = function () {
    startGame()
  }

  function startGame () {
    // draw the board -----------------------
    document.getElementById('game-board').style.display = 'block'
    currentGame = new Game()

    // draw the car -----------------------
    currentSurvivor = new Survivor()
    currentGame.survivor = currentSurvivor
    // console.log(currentGame);
    currentSurvivor.drawSurvivor()

    // example with one obstacle;
    // let obstacle1 = new Obstacle(30, 40, 50, 50);
    // let obstacle2 = new Obstacle(60, 90, 50, 100);
    // let obstacle3 = new Obstacle(120, 190, 50, 100);
    // before we push obstacles in the array:
    // // obstacle2.drawObstacle();
    // // obstacle1.drawObstacle();

    // if we push obstacles in the array:
    // currentGame.obstacles.push(obstacle1, obstacle2, obstacle3);
    // for(let i=0; i < currentGame.obstacles.length; i++){
    //   currentGame.obstacles[i].drawObstacle();
    // }

    // update the board -----------------------
    update()
  }

  let frames = 0

  // UPDATE BOARD ============================
  function update () {
    ctx.clearRect(0, 0, 900, 600)
    currentSurvivor.drawSurvivor()
    frames++

    if (frames % 100 === 1) {
      randomZombieX = Math.floor(Math.random() * 450)
      zombieY = 0 // always starts on the top
      let zombie = new Zombie(randomZombieX, zombieY)
      currentGame.zombies.push(zombie)
    }

    for (let i = 0; i < currentGame.zombies.length; i++) {
      currentGame.zombies[i].y += 2
      currentGame.zombies[i].drawZombie()

      if (detectCollision(currentGame.zombies[i])) {
        ctx.fillStyle = "rgba(0, 0, 0, 0.7)";   
        ctx.fillRect(50, 20, 800, 800);       
        ctx.fillStyle = "red";   
        ctx.font = "44px Helvetica";   
        ctx.fillText("You died!", 400, 270); 

        frames = 0
        currentGame.escaped = 0
        document.getElementById('escaped').innerHTML = currentGame.escaped

        currentGame.zombies = []
        document.getElementById('game-board').style.display = 'none'
      }

      if (currentGame.zombies[i].y >= 600) {
        currentGame.zombies.splice(i, 1)
        currentGame.escaped++
        document.getElementById('escaped').innerHTML = currentGame.escaped
      }
    }

    requestAnimationFrame(update)
  }
}
