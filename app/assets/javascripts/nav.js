class Nav {
  constructor () {
    this.initTrophiesNav();
    this.initGameNav();
  }

  initTrophiesNav() {
    $('.trophies-nav').click(()=>{
      console.log('click')
    })
  }

  initGameNav() {

  }
}

export default {
  init: function() {
    new Nav();
  }
};
