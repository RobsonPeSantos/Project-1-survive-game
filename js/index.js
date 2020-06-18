window.onload = () => {
    const canvas = document.createElement("canvas");
    const ctx = canvas.getContext("2d");
    canvas.width = 1520;
    canvas.height = 600;
    document.body.appendChild(canvas);
    
    function reset (){
        survivor.x = Math.random()*(canvas.width -100);
        survivor.y = Math.random()*(canvas.height -100);
        zombie.x = Math.random()*(canvas.width -200);
        zombie.y = Math.random()*(canvas.height -200);
        door.x = Math.random()*(canvas.width -500);
        door.y = Math.random()*(canvas.height -50);
        escaped += 1;
    };
    
    
    const survivor = {
        x: Math.random()*(canvas.width -100),
        y: Math.random()*(canvas.height -100),
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
        y: Math.random()*(canvas.height -200),
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
    
      document.addEventListener('keydown', e => {
        switch (e.keyCode) {
          case 87: 
            zombie.moveUp();    
            console.log('up: ', zombie); 
            break;
          case 83: 
            zombie.moveDown();  
            console.log('down: ',  zombie); 
            break;
          case 65: 
            zombie.moveLeft();  
            console.log('left: ',  zombie); 
            break;
          case 68: 
            zombie.moveRight(); 
            console.log('right: ', zombie); 
            break;
            
        }
        updateCanvas();
      })
    
      const door = {
        x: Math.random()*(canvas.width -500),
        y: Math.random()*(canvas.height -10),
        moveUp:    function() { this.y -= 25 },
        moveDown:  function() { this.y += 25 },
        moveLeft:  function() { this.x -= 25 },
        moveRight: function() { this.x += 25 },
      }
      
      function draw3(door) {
        const doorImg = new Image();
        doorImg.onload = () => { 
           ctx.drawImage(doorImg, door.x, door.y, 90, 90); 
           colision();
        }
        doorImg.src = "/images/door.png";
      }
      function colision(){ 
        const escaped = 0;   
          if(survivor.x <= (door.x + 25) 
          && door.x <= (survivor.x + 25) 
          && door.y <= (door.y + 25) 
          && door.y <= (survivor.y + 25)){
              reset();      
            } 
        }
    
        let escaped = 0;
    
        function score (){
            ctx.fillStyle = "rgb(250, 250, 250)";
            ctx.font = "24px Helvetica";
            ctx.textAlign = "left";
            ctx.textBaseline = "top";
            ctx.fillText("Rooms escaped: " + escaped, 32, 32);  
        }
    
        function coliderZombie(){  
            if(survivor.x <= (zombie.x + 32)
             && zombie.x <= (survivor.x + 32) 
             && survivor.y <= (zombie.y + 32)       
              && zombie.y <= (survivor.y + 32)){     
                  ctx.fillStyle = "rgba(0, 0, 0, 0.7)";   
                  ctx.fillRect(75, 105, 362, 245);       
                  ctx.fillStyle = "red";   
                  ctx.font = "24px Helvetica";   
                  ctx.fillText("You died!", 210, 220); 
                  escaped = 0;  
                 } 
                };
    
        
    
      
      
      function updateCanvas() {
        ctx.clearRect(0,0,1500,1700);
        
        draw(survivor);
        draw2(zombie);
        draw3(door);
        score();
        coliderZombie();
        
     
      }
      
      
      updateCanvas()
    }
    