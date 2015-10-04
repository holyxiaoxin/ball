import ui from 'popmotion';

const baseY = 300;
let gameStarted = false;

class ball {
  constructor() {
    
    var ballActor = new ui.Actor({
      element: '#ball',
      values: {
        x: 0,
        y: 0
      },
      onUpdate: (ball)=>{
        if(ball.y === `${baseY}px` && gameStarted){
          this.gameOver();
        }
      }
    });

    var showBall = new ui.Tween({
      values: {
        y: baseY,
        opacity: 1
      },
      onComplete: function() {
        gameStarted = true;
      }
    });

    var ballPhysics = new ui.Simulate({
      values: {
        x: {
          friction: 0.05,
          min: -50,
          max: 50,
          velocity: function () {
            return ui.calc.random(-1, 1) * 500;
          },
          bounce: .7
        },
        y: {
          max: baseY,
          min: -300,
          acceleration: 2000,
          velocity: -1500,
          bounce: .7
        }
      }
    })


    ballActor
    .start(showBall.extend({
      duration: 500,
      ease: 'easeOut'
    }))
    .then(function () {
      $('#ball').on('mousedown touchstart', ballActor.element, function (event) {
        ballActor.start(ballPhysics);
      });
    });
  }

  gameOver() {
    console.log('gameover');
  }

}

export default ball
