import Nav from './nav'
import Ball from './ball'
import Trophies from './trophies'

$(() => {

  initHide();
  Nav.init();
  Ball.init();
  Trophies.init();

  function initHide () {
    $('.score, .goal, .game-nav, .trophies-container, .card, .all-trophies-unlocked').hide();
  }

})
