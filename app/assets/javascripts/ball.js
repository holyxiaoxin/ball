import ui from 'popmotion';
import growl from '../../../bower_components/growl/javascripts/jquery.growl';

const viewportWidth = $(window).width();
const viewportHeight = $(window).height();
const baseY = 0.3 * viewportHeight;
let gameStarted = false;

class ball {
  constructor() {
    var ballActor = new ui.Actor({
      element: '#ball',
      values: {
        x: 0,
        y: 0
      },
      onUpdate: (ball) => {
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
      onComplete: this.gameStart
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
          min: -baseY,
          acceleration: 2000,
          velocity: -viewportHeight*1.5,
          bounce: .7
        }
      }
    })


    ballActor
    .start(showBall.extend({
      duration: 500,
      ease: 'easeOut'
    }))
    .then(() => {
      $('#ball').on('mousedown touchstart', ballActor.element, (event) => {
        let $instructions = $('.instructions');
        let $score = $('.score');
        let $scorePoints = $score.find('span');
        let $goal = $('.goal');
        let $goalPoints = $goal.find('span');

        if ($instructions.is(":visible")) {
          $instructions.hide();
        }
        if ($score.is(":hidden")) {
          $score.show();
        }
        if ($goal.is(":hidden")) {
          $goal.show();
        }
        let newPoints = parseFloat($scorePoints.html())+0.5;
        if (newPoints >= $goalPoints.html()) {
          this.goalReached();
        }
        $scorePoints.html(newPoints);
        ballActor.start(ballPhysics);
      });
    });
  }

  gameOver() {
    let $scorePoints = $('.score span');
    $scorePoints.html('0');
  }

  gameStart() {
    gameStarted = true;
  }

  goalReached() {
    let $goalPoints = $('.goal span');
    let newGoal = parseFloat($goalPoints.html())+1;
    let blinkOnce = (color, delay) => {
      setTimeout(()=>{$goalPoints.css('color', color)}, delay);
    }
    let blink = () => {
      blinkOnce('red', 0);
      blinkOnce('white', 50);
      blinkOnce('red', 100);
      blinkOnce('white', 150);
    }

    $goalPoints.html(newGoal);
    blink();
  }

}

export default ball
