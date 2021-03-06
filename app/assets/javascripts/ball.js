import ui from 'popmotion';
import growl from '../../../bower_components/growl/javascripts/jquery.growl';
import Trophies from './trophies';

const viewportWidth = $(window).width();
const viewportHeight = $(window).height();
const baseY = 0.3 * viewportHeight;
const growlLocation = 'tl';
const defaultGrowSize = 'small';
let gameStarted = false;
let gameCompleted = false;

export default class Ball {

  static init() {
    const ballActor = this.ballActor();
    const showBall = this.showBall();
    const ballPhysics = this.ballPhysics();

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

  static ballActor() {
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

  static showBall() {
    return new ui.Tween({
      values: {
        y: baseY,
        opacity: 1
      }
    });
  }

  static ballPhysics() {
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

  static updateTopView() {
    const $instructions = $('.instructions');
    const $score = $('.score');
    const $goal = $('.goal');

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

  static updatePoints() {
    const $scorePoints = $('.score span');
    const $goalPoints = $('.goal span');
    const newPoints = parseFloat($scorePoints.html())+1;

    if (newPoints >= $goalPoints.html()) {
      this.goalReached();
    }
    $scorePoints.html(newPoints);
  }

  static gameOver() {
    const $scorePoints = $('.score span');
    $scorePoints.html('0');
    if (!gameCompleted) {
      $.growl.error({title: "Game Over", message: "", location: growlLocation, size: defaultGrowSize});
    }
  }

  static gameStart() {
    gameStarted = true;
  }

  static goalReached() {
    const $goalPoints = $('.goal span');
    const blinkOnce = (color, delay) => {
      setTimeout(()=>{$goalPoints.css('color', color)}, delay);
    }
    const blink = () => {
      blinkOnce('red', 0);
      blinkOnce('white', 50);
      blinkOnce('red', 100);
      blinkOnce('white', 150);
    }
    const unlockTrophy = () => {
      $('.empty-trophies').hide();
      const card = Trophies.getNextTrophy$();
      card.show();
      if(Trophies.currentGoal() > Trophies.count()) {
        gameComplete();
      }
    }
    const gameComplete = () => {
      $.growl.notice({title: "You have unlocked all trophies", message: "", location: growlLocation, size: defaultGrowSize});
      $('#game-wrapper').removeClass('game-body').addClass('trophies-body');
      $('.trophies-nav').fadeOut("slow");
      $('.trophies-container').fadeIn("slow");
      $('.all-trophies-unlocked').fadeIn("slow");
      $('.game-container').fadeOut("slow");
      gameCompleted = true;
    }

    $.growl.notice({title: "New trophy unlocked", message: "", location: growlLocation, size: defaultGrowSize});
    $goalPoints.html(Trophies.currentGoal()+1);
    blink();
    unlockTrophy();
  }

}
