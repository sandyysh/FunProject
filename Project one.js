// Make sure jQuery is loaded
// if (typeof jQuery == 'undefined') {
//   console.log('Oops! I still have to link my jQuery properly!');
// } else {
//   console.log('I did it! I linked jQuery and this js file!');
// }

$(() => {
//Select the walkingBall, button and grid element
//Query selector lets u choose the first html element
const walkingBall = document.querySelector('.walkingBall')
const jumpButton = document.querySelector('button');
const grid = document.querySelector('.grid')
const overlay = document.querySelector('.overlay')
let obstacleIntervalID;
let timerID;
let windowWidth = $(window).width();
console.log($("#score-container").width());

$("#score-container").css({left: ((windowWidth/2) - 0) + "px" })

$(document).ready(function() {
  $("#start-button").click(function() {
  });
});


//defines the function 'control' that listens for the spacebar key press and triggers the jump function when the spacebar is pressed
  function control(e) {
    if (e.keyCode === 32) {
      jump();
      $(".overlay").hide();
    }
  }
  //Event listeners are added to the jump button and the document for keyboard input
  //what is keyup and control? 
  jumpButton.addEventListener('click',jump);
  document.addEventListener('keydown', control);
  
  //Set a variable to track whether the ball is jumping
  let isJumping = false; 

  //this function moves the ball upwards when its jumping
  function jump() {
  //question: how does the code know to move the ball upwards? I didn't define move up anywhere. 

  //If the ball is already jumping, don't do anything.
    if (isJumping) return; 
    isJumping = true;
    let position = 150
    let timerId = setInterval(function() {
      //move the ball upwards by changing its bottom position
      //this looks like jump but i didnt add jump anywhere?
      position += 50;
      walkingBall.style.bottom = position + 'px';

// If the ball reaches a certain height, stop it from moving upwards
      if (position >= 900) {
        clearInterval(timerId);
        fall();
      } 
    }, 30);
  }     

  //This function moves the ball downwards when its falling
  function fall() {
    let position = 900;
    let timerId = setInterval(function() {
      //move the ball downwards by changing its bottom position 
      position -= 50;
      walkingBall.style.bottom = position + 'px';

    // If the ball reaches the ground, stop moving it and reset isJumping variable
      if (position <= 150) {
        clearInterval(timerId);
        isJumping = false; //reset isJumping to false
      } 
    }, 20);
  }

  //  function generateObstacles() creates new  obstacles and append it to the grid element in the html 
let score = 0;

function detectCollision(walkingBall, obstacle){
  const walkingBallBounding = walkingBall.getBoundingClientRect();
  const obstacleRect = obstacle.getBoundingClientRect();
  return (
    walkingBallBounding.left  < obstacleRect.right &&
    walkingBallBounding.right  > obstacleRect.left &&
    walkingBallBounding.top  < obstacleRect.bottom &&
    walkingBallBounding.bottom  > obstacleRect.top
  ); 
}
//Function to increment score and display
function obstacleAvoided() {
  score++;
  $("#score-count").text( score);
}

function generateObstacles() {
  
  //Array of obstacle images
  const obstacleImages = [
    "Images/Obstacle1.svg",
    "Images/Obstacle2.svg", 
    "Images/Obstacle3.svg",
    "Images/Obstacle4.svg", 
    "Images/Obstacle5.svg",
    "Images/Obstacle6.svg"
  ];
  // while(obstaclePosition >= -100){
  //using a while loop to generate multiple obstacles when certain conditions are met
  const obstacle = document.createElement('div');
  // set initial obstacle position
  let obstaclePosition = $(window).width() -100;
  obstacle.classList.add('obstacle');
  
  // Generate a random number between 0 and the length of the image array minus one. For example:
  const randomIndex = Math.floor(Math.random() * obstacleImages.length);  
  obstacle.style.backgroundImage = `url(${obstacleImages[randomIndex]})`;
  grid.appendChild(obstacle);
  
  obstacle.style.left = obstaclePosition + 'px';
  obstacle.style.backgroundSize = 'contain';

 
  //this moves to left by -10 per 2 secs making it seem like a motion 
  let timerID = setInterval(function() {
    obstaclePosition -= 20;
    obstacle.style.left = obstaclePosition + 'px'
    
    if (obstaclePosition < -100) { //remove obstacle
      clearInterval(timerID);
      obstacleAvoided();
      obstacle.remove();
      randomTime = Math.floor(Math.random() * 5000) + 1000;
      setTimeout(generateObstacles,randomTime);
    }else{ //if (obstaclePosition > 0 && obstaclePosition <60) {
      if (detectCollision(walkingBall, obstacle)) {          
        clearInterval(timerID);
        clearInterval(obstacleIntervalID);
        $("button").text("Game over").css({opacity: 0.5});
        //change background if you want
        isJumping = true;
        setTimeout(function() {
          $("button").text("Press any key to restart").css({opacity: 1}) 
          document.addEventListener("keydown", function(){
            setTimeout(function(){
              reloadGame();
            });
          });
        }, 1000); //add delay of 2 second before changing button
              
              
      } /* else if (obstaclePosition < 0 && obstaclePosition > -10 ) {
            obstacleAvoided();
            console.log(score)
          }*/
    }
  }, 20);
}

function startGame(){
  setTimeout(generateObstacles, 5000);
}

//the setInterval method repeatedly calls a function, function() with a delay of 20 miliseconds between each call 
//It moves the obstacle left by 10 pixel each time it ias called, giving the impression of motion. When the obstacle reaches the left edge of the grid, the interval is cleared and the obstacle is removed from HTML. 



  //This sets an interval of 4 seconds for generating a new obstacles
  //start obstacle generation every 4 secs 
  //random time not working yet - to do next time

  //To reduce the padding around the ball

function reloadGame(){
  location.reload()  //if any key is pressed
}
  startGame();
});
