class Nav {
  constructor () {
    this.initTrophiesNav();
    this.initGameNav();
  }

  initTrophiesNav() {
    $('.trophies-nav').click(function () {
      $('#game-wrapper').removeClass('game-body').addClass('trophies-body');
      $('.game-nav').fadeIn("slow");
      $(this).fadeOut("slow");
      $('.trophies-container').fadeIn("slow");
      $('.game-container').fadeOut("slow");
    });
  }

  initGameNav() {
    $('.game-nav').click(function () {
      $('#game-wrapper').removeClass('trophies-body').addClass('game-body');
      $('.trophies-nav').fadeIn("slow");
      $(this).fadeOut("slow");
      $('.game-container').fadeIn("slow");
      $('.trophies-container').fadeOut("slow");
    });
  }
}

export default {
  init: function() {
    new Nav();
  }
};
