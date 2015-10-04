import ui from 'popmotion';
import growl from '../../../bower_components/growl/javascripts/jquery.growl';

const viewportWidth = $(window).width();
const viewportHeight = $(window).height();
const baseY = 0.3 * viewportHeight;
let gameStarted = false;

class Ball {
  constructor() {
    let ballActor = this.ballActor();
    let showBall = this.showBall();
    let ballPhysics = this.ballPhysics();

    ballActor
    .start(showBall.extend({
      duration: 500,
      ease: 'easeOut'
    }))
    .then(() => {
      $('#ball').on('mousedown touchstart', ballActor.element, (event) => {
        this.updateTopView();
        this.updatePoints();
        ballActor.start(ballPhysics);
        this.gameStart();
      });
    });
  }

  ballActor() {
    return new ui.Actor({
      element: '#ball',
      values: {
        x: 0,
        y: 0
      },
      onUpdate: (ball) => {
        if(ball.y === `${baseY}px` && gameStarted){
          this.gameOver();
          gameStarted = false;
        }
      }
    });
  }

  showBall() {
    return new ui.Tween({
      values: {
        y: baseY,
        opacity: 1
      }
    });
  }

  ballPhysics() {
    return new ui.Simulate({
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
  }

  updateTopView() {
    let $instructions = $('.instructions');
    let $score = $('.score');
    let $goal = $('.goal');

    if ($instructions.is(":visible")) {
      $instructions.hide();
    }
    if ($score.is(":hidden")) {
      $score.show();
    }
    if ($goal.is(":hidden")) {
      $goal.show();
    }
  }

  updatePoints() {
    let $scorePoints = $('.score span');
    let $goalPoints = $('.goal span');
    let newPoints = parseFloat($scorePoints.html())+1;
    if (newPoints >= $goalPoints.html()) {
      this.goalReached();
    }
    $scorePoints.html(newPoints);
  }

  gameOver() {
    let $scorePoints = $('.score span');
    $scorePoints.html('0');
    $.growl.error({title: "Game Over", message: ""});
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
    $.growl.notice({title: "New trophy unlocked", message: ""});
  }

}

export default {
  init: function() {
    new Ball();
  }
};
