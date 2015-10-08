export default class Trophies {
  static init () {
    $(".card").flip({
      axis: 'y',
      trigger: 'hover'
    });
  }

  static count () {
    return $('.trophies-container .card').length;
  }

  static currentGoal () {
    let $goalPoints = $('.goal span');
    return parseInt($goalPoints.html());
  }

  static getNextTrophy$ () {
    const $goalPoints = $('.goal span');
    const newGoal = parseInt($goalPoints.html());
    // Skips first 2 non .card child
    return $(`.trophies-container .card:nth-child(${newGoal+1})`);
  }
}
