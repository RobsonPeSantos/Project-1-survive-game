window.onload = () => {
const canvas = document.createElement("canvas");
const ctx = canvas.getContext("2d");
canvas.width = 600;
canvas.height = 600;
document.body.appendChild(canvas);

const survivor = {
    x: 25,
    y: 25,
    moveUp:    function() { this.y -= 25 },
    moveDown:  function() { this.y += 25 },
    moveLeft:  function() { this.x -= 25 },
    moveRight: function() { this.x += 25 },
  }
  
  function draw(survivor) {
    const img = new Image();
    img.onload = () => { 
       ctx.drawImage(img, survivor.x, survivor.y, 50, 50); 
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
  
  function updateCanvas() {
    ctx.clearRect(0,0,1500,1700);
    
    
    draw(survivor);
  }
  
  updateCanvas()
}
