import Ball from './ball'
import Nav from './nav'

$(function(){
  $('.score, .goal, .game-nav').hide();
  Nav.init();
  Ball.init();
})
