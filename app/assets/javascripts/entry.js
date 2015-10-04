import Ball from './ball'
import Trophies from './trophies'
import Nav from './nav'

$(function(){
  $('.score, .goal, .game-nav, .trophies-container').hide();
  Nav.init();
  Ball.init();
  Trophies.init();
})
