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
    
    let position = 300;
    let timerId = setInterval(function() {
      //move up 
      console.log('up');
      position += 30;
      walkingBall.style.bottom = position + 'px';

      if (position >= 500) {
        clearInterval(timerId);
        fall();
      }
    }, 20);
  }     

  function fall() {
    let position = 500;
    let timerId = setInterval(function() {
      //move down 
      console.log('down');
      position -= 30;
      walkingBall.style.bottom = position + 'px';

      if (position <= 300) {
        clearInterval(timerId);
        isJumping = false; //reset isJumping to false
      } 
    }, 20);
  }
});
