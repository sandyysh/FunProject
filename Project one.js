// Make sure jQuery is loaded
// if (typeof jQuery == 'undefined') {
//   console.log('Oops! I still have to link my jQuery properly!');
// } else {
//   console.log('I did it! I linked jQuery and this js file!');
// }

$(() => {
  const svg = document.querySelector('.background img');
  svg.addEventListener('click', function(event) {
    event.preventDefault();
  });

  const walkingBall = document.querySelector('.walkingBall'); 
  const jumpButton = document.querySelector('button');
  const grid = document.querySelector('.grid')

  function control(e) {
    if (e.keyCode === 32) {
      jump();
    }
  }
  
  jumpButton.addEventListener('click',jump);
  document.addEventListener('keyup', control);
  
  let isJumping = false; 

  function jump() {
    if (isJumping) return; 
    isJumping = true;
    
    let position = 400;
    let timerId = setInterval(function() {
      //move up 
      console.log('up');
      position += 30;
      walkingBall.style.bottom = position + 'px';

      if (position >= 600) {
        clearInterval(timerId);
        fall();
      }
    }, 20);
  }     

  function fall() {
    let position = 600;
    let timerId = setInterval(function() {
      //move down 
      console.log('down');
      position -= 30;
      walkingBall.style.bottom = position + 'px';

      if (position <= 400) {
        clearInterval(timerId);
        isJumping = false; //reset isJumping to false
      } 
    }, 20);
  }
  let obstaclePosition = 0;
  
  function generateObstacles(){
    let randomTime = Math.random() * 4000; 
   
 
    obstacle = document.createElement('div');
    obstacle.classList.add('obstacle');
    grid.appendChild(obstacle)
    obstacle.style.right = obstaclePosition + 'px';
    
  }

  // let timerID = setInterval(function() {
  //   if (obstaclePosition <= 0) {
  //     clearInterval(timerID);
  //     alert('Game Over')
  //   }

  //   obstaclePosition -= 10;
  //   obstacle.style.left = obstaclePosition + 'px'
  // }, 20)
  
  setInterval(generateObstacles, 2000)
  //setTimeout(generateObstacles, randomTime)

    const obstacles = document.querySelectorAll('.obstacle');
    obstacles.forEach(function(obstacle) {
      alert(obstacle.style.right);
      obstacle.style.right += obstacle.style.right + 'px';
      if (obstacle.getBoundingClientRect().left < walkingBall.getBoundingClientRect().right) {
        clearInterval(timerID);
      }

    //Check for collision 
    const obstacleRect = obstacle.getBoundingClientRect();
    const ballRect = walkingBall.getBoundingClientRect();
    if (
      obstacleRect.left < ballRect.right &&
      obstacleRect.right > ballRect.left &&
      obstacleRect.top < ballRect.bottom &&
      obstacleRect.bottom > ballRect.top
    ) {
      clearInterval(timerID);
      clearInterval(obstacleIntervalID);
      alert('Game Over');
    }

  //   if (obstaclePosition <= 0) {
  //     clearInterval(timerID);
  //     obstacle.remove();
  //   }
  // }, 20);



});
})
