class Trophies {
  constructor() {
    $(".card").flip({
      axis: 'y',
      trigger: 'hover'
    });
  }
}

export default {
  init: function() {
    new Trophies();
  }
}
