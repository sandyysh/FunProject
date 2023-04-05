// Make sure jQuery is loaded
// if (typeof jQuery == 'undefined') {
//   console.log('Oops! I still have to link my jQuery properly!');
// } else {
//   console.log('I did it! I linked jQuery and this js file!');
// }

$(() => {
//Select the walkingBall, button and grid element
//Query selector lets u choose the first html element
const walkingBall = document.querySelector('.walkingBall'); 
  const jumpButton = document.querySelector('button');
  const grid = document.querySelector('.grid')

//defines the function 'control' that listens for the spacebar key press and triggers the jump function when the spacebar is pressed
  function control(e) {
    if (e.keyCode === 32) {
      jump();
    }
  }
  //Event listeners are added to the jump button and the document for keyboard input
  //what is keyup and control? 
  jumpButton.addEventListener('click',jump);
  document.addEventListener('keyup', control);
  
  //Set a variable to track whether the ball is jumping
  let isJumping = false; 

  //this function moves the ball upwards when its jumping
  function jump() {
  //question: how does the code know to move the ball upwards? I didn't define move up anywhere. 

  //If the ball is already jumping, don't do anything.
    if (isJumping) return; 
    isJumping = true;
    
    let position = 400;
    let timerId = setInterval(function() {
      //move the ball upwards by changing its bottom position
      //this looks like jump but i didnt add jump anywhere?
      console.log('up');
      position += 30;
      walkingBall.style.bottom = position + 'px';

// If the ball reaches a certain height, stop it from moving upwards
      if (position >= 600) {
        clearInterval(timerId);
        fall();
      }
    }, 20);
  }     

  //This function moves the ball downwards when its falling
  function fall() {
    let position = 600;
    let timerId = setInterval(function() {
      //move the ball downwards by changing its bottom position 
      console.log('down');
      position -= 30;
      walkingBall.style.bottom = position + 'px';

    // If the ball reaches the ground, stop moving it and reset isJumping variable
      if (position <= 400) {
        clearInterval(timerId);
        isJumping = false; //reset isJumping to false
      } 
    }, 20);
  }
  //array random image
  //  function generateObstacles() creates new  obstacles and append it to the grid element in the html 
//the position is 100 pixels from the left of the grid. 
  function generateObstacles(){
    let obstaclePosition = 1400; // set initial obstacle position
    let randomTime = Math.random() * 4000; 
   
 
    const obstacle = document.createElement('div');
    obstacle.classList.add('obstacle');
    grid.appendChild(obstacle)
    obstacle.style.left = obstaclePosition + 'px';
    //this moves to left by -10 per 2 secs making it seem like a motion 
    let timerID = setInterval(function() {
      obstaclePosition -= 10;
      obstacle.style.left = obstaclePosition + 'px'
      if (obstaclePosition <= 0) { //remove obstacle
        clearInterval(timerID);
        obstacle.remove();
      }      
      if (detectCollision(walkingBall, obstacle)) {
        clearInterval(timerID);
        clearInterval(obstacleIntervalID);
        alert("Game over");
      }
    }, 20)
    
    }

  //call on function 
//generateObstacles();
//the setInterval method repeatedly calls a function, function() with a delay of 20 miliseconds between each call 
//It moves the obstacle left by 10 pixel each time it ias called, giving the impression of motion. When the obstacle reaches the left edge of the grid, the interval is cleared and the obstacle is removed from HTML. 

   

  //This sets an interval of 4 seconds for generating a new obstacles
  obstacleIntervalID = setInterval(generateObstacles, 4000); 
  //start obstacle generation every 4 secs 
  //random time not working yet - to do next time

function detectCollision(walkingBall, obstacle) {
  const walkingBallBounding = walkingBall.getBoundingClientRect();
  const obstacleRect = obstacle.getBoundingClientRect();
  return (
    walkingBallBounding.left < obstacleRect.right &&
    walkingBallBounding.right > obstacleRect.left &&
    walkingBallBounding.top < obstacleRect.bottom &&
    walkingBallBounding.bottom > obstacleRect.top
  ); 
}

});



    //Check for collision of walking ball with obstacle
//   function checkForCollision(){
//     // Get all obstacles in HTML using jquery selector 
//     const obstacles = $('.obstacle');

//   //Loop over each obstacle 
//   obstacles.each(function(){
//     //Move the obstacle to the left 
//     const obstacle = $(this);
//     obstacle.css('right', '+=10px');

//     //check if obstacle and walking ball overlap
//     const obstacleRect = obstacle.get(0).getBoundingClientRect();
//     const ballRect = walkingBall.get(0).getBoundingClientRect();
//     if (obstacleRect.top <= ballRect.bottom &&
//       obstacleRect.right >= ballRect.left &&
//       obstacleRect.left <= ballRect.right) {
//     alert('game');
//   setInterval(checkForCollision, 20);
//   }
// }
// //check for collision every 20 miliseconds
//   )}})
