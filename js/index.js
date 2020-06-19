window.onload = function () {
  let currentGame;
  let currentSurvivor;
  let currentDoor;
  let mySound;

  document.getElementById('game-board').style.display = 'none';
  const myCanvas = document.getElementById('the-canvas');
  const ctx = myCanvas.getContext('2d');

  //sound fx function
  class sound {
    constructor(src) {
      this.sound = document.createElement("audio");
      this.sound.src = src;
      this.sound.setAttribute("preload", "auto");
      this.sound.setAttribute("controls", "none");
      this.sound.style.display = "none";
      document.body.appendChild(this.sound);
      this.play = function () {
        this.sound.play();
      };
      this.stop = function () {
        this.sound.pause();
      };
    }
  }


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
      this.width = 50
      this.height = 50
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
          if (this.x > 0) {
            this.x -= 10
          }
          break
        case 39:
          if (this.x < 850) {
            this.x += 10
          }
          break
        case 38:
            if (this.y > 0) {
              this.y -= 10
            }
            break
        case 40:
            if (this.y < 550) {
                this.y += 10
            }
          break    
      }
    }
  }

  //Door Class
  class Door {
    constructor () {
      this.x = Math.random()*(myCanvas.width -100),
      this.y = Math.random()*(myCanvas.height -100),
      this.width = 70
      this.height = 70
      this.img = '/images/door.png';
    }

    drawDoor () {
      const doorImg = new Image()
      doorImg.src = this.img
      ctx.drawImage(doorImg, this.x, this.y, this.width, this.height)
    }

    
    }

  //Keydown function
  document.onkeydown = function (e) {
   
    let whereToGo = e.keyCode
    currentGame.survivor.moveSurvivor(whereToGo)
   
  }

  // Zombieeees
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

  // Colision with zombies
  function detectCollision (zombie) {
    return !((currentSurvivor.y > zombie.getBottom()) ||
      (currentSurvivor.x + currentSurvivor.width < zombie.getLeft()) ||
      (currentSurvivor.x - 5 > zombie.getRight()))
  }

  // Entering doors
  function enterDoor (door) {
    return !((currentSurvivor.y > door.getBottom()) ||
      (currentSurvivor.x + currentSurvivor.width < door.getLeft()) ||
      (currentSurvivor.x - 5 > door.getRight()))
  }

  // Start
  document.getElementById('start-button').onclick = function () {
    startGame()
  }

  function startGame () {
    // draw the board
    document.getElementById('game-board').style.display = 'block'
    currentGame = new Game()

    // draw the survivor
    currentSurvivor = new Survivor()
    currentGame.survivor = currentSurvivor
    // console.log(currentGame);
    currentSurvivor.drawSurvivor()

    // draw the door
    currentDoor = new Door()
    currentGame.door = currentDoor
    // console.log(currentGame);
    currentDoor.drawDoor()

    //sound
    mySound = new sound('/sounds/musica-the-walking-dead.mp3')

  

    update()
  }

  let frames = 0

  // update
  function update () {
    ctx.clearRect(0, 0, 900, 550)
    currentSurvivor.drawSurvivor()
    currentDoor.drawDoor()
    frames++

    if (enterDoor(door) === true){
      update();
      return escaped += 1;
    }

    if (frames % 100 === 1) {
      randomZombieX = Math.floor(Math.random() * 900)
      zombieY = 0;
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
        ctx.fillText("You died!", 350, 270); 

        frames = 0
        currentGame.escaped = 0
        document.getElementById('escaped').innerHTML = currentGame.escaped

        currentGame.zombies = []
        document.getElementById('game-board').style.display = 'none'
      }

      if (currentGame.zombies[i].y >= 600) {
        currentGame.zombies.splice(i, 1)
      }
      
    }

    requestAnimationFrame(update)
  }
}
