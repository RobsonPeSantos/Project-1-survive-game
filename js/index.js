window.onload = () => {
const canvas = document.createElement("canvas");
const ctx = canvas.getContext("2d");
canvas.width = 600;
canvas.height = 600;
document.body.appendChild(canvas);

const survivor = {
    x: Math.random()*(canvas.width -100),
    y: Math.random()*(canvas.width -100),
    moveUp:    function() { this.y -= 25 },
    moveDown:  function() { this.y += 25 },
    moveLeft:  function() { this.x -= 25 },
    moveRight: function() { this.x += 25 },
  }
  
  function draw(survivor) {
    const img = new Image();
    img.onload = () => { 
       ctx.drawImage(img, survivor.x, survivor.y, 80, 80); 
    }
    img.src = "/images/survivor-move_knife_0.png";
  }
  
  
  
  
  document.addEventListener('keydown', e => {
    switch (e.keyCode) {
      case 38: 
        survivor.moveUp();    
        console.log('up: ', survivor); 
        break;
      case 40: 
        survivor.moveDown();  
        console.log('down: ',  survivor); 
        break;
      case 37: 
        survivor.moveLeft();  
        console.log('left: ',  survivor); 
        break;
      case 39: 
        survivor.moveRight(); 
        console.log('right: ', survivor); 
        break;
    }
    updateCanvas();
  })

  const zombie = {
    x: Math.random()*(canvas.width -200),
    y: Math.random()*(canvas.width -200),
    moveUp:    function() { this.y -= 25 },
    moveDown:  function() { this.y += 25 },
    moveLeft:  function() { this.x -= 25 },
    moveRight: function() { this.x += 25 },

    
  }
  
  function draw2(zombie) {
   
    const zombieImg = new Image();
    zombieImg.onload = () => { 
       ctx.drawImage(zombieImg, zombie.x, zombie.y, 90, 90); 
       
    }
    zombieImg.src = "/images/zombie-attack_0.png";
  }

  const door = {
    x: Math.random()*(canvas.width -500),
    y: Math.random()*(canvas.width -10),
    moveUp:    function() { this.y -= 25 },
    moveDown:  function() { this.y += 25 },
    moveLeft:  function() { this.x -= 25 },
    moveRight: function() { this.x += 25 },
  }
  
  function draw3(door) {
    const doorImg = new Image();
    doorImg.onload = () => { 
       ctx.drawImage(doorImg, door.x, door.y, 90, 90); 
    }
    doorImg.src = "/images/door.png";
  }


  
  
  function updateCanvas() {
    ctx.clearRect(0,0,1500,1700);
    
    
    draw(survivor);
    draw2(zombie) * 5;
    draw3(door);
 
  }
  
  
  updateCanvas()
}
