/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};

/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {

/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;

/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};

/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);

/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;

/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}


/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;

/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;

/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "/assets";

/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

	var _ball = __webpack_require__(1);

	var _ball2 = _interopRequireDefault(_ball);

	var _trophies = __webpack_require__(67);

	var _trophies2 = _interopRequireDefault(_trophies);

	var _nav = __webpack_require__(68);

	var _nav2 = _interopRequireDefault(_nav);

	$(function () {
	  $('.score, .goal, .game-nav, .trophies-container, .card, .all-trophies-unlocked').hide();
	  _nav2['default'].init();
	  _ball2['default'].init();
	  _trophies2['default'].init();
	});

/***/ },
/* 1 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, '__esModule', {
	  value: true
	});

	var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

	var _popmotion = __webpack_require__(2);

	var _popmotion2 = _interopRequireDefault(_popmotion);

	var _bower_componentsGrowlJavascriptsJqueryGrowl = __webpack_require__(66);

	var _bower_componentsGrowlJavascriptsJqueryGrowl2 = _interopRequireDefault(_bower_componentsGrowlJavascriptsJqueryGrowl);

	var viewportWidth = $(window).width();
	var viewportHeight = $(window).height();
	var baseY = 0.3 * viewportHeight;
	var growlLocation = 'tl';
	var defaultGrowSize = 'small';
	var gameStarted = false;
	var gameCompleted = false;

	var Ball = (function () {
	  function Ball() {
	    var _this = this;

	    _classCallCheck(this, Ball);

	    var ballActor = this.ballActor();
	    var showBall = this.showBall();
	    var ballPhysics = this.ballPhysics();

	    ballActor.start(showBall.extend({
	      duration: 500,
	      ease: 'easeOut'
	    })).then(function () {
	      $('#ball').on('mousedown touchstart', ballActor.element, function (event) {
	        _this.updateTopView();
	        _this.updatePoints();
	        ballActor.start(ballPhysics);
	        _this.gameStart();
	      });
	    });
	  }

	  _createClass(Ball, [{
	    key: 'ballActor',
	    value: function ballActor() {
	      var _this2 = this;

	      return new _popmotion2['default'].Actor({
	        element: '#ball',
	        values: {
	          x: 0,
	          y: 0
	        },
	        onUpdate: function onUpdate(ball) {
	          if (ball.y === baseY + 'px' && gameStarted) {
	            _this2.gameOver();
	            gameStarted = false;
	          }
	        }
	      });
	    }
	  }, {
	    key: 'showBall',
	    value: function showBall() {
	      return new _popmotion2['default'].Tween({
	        values: {
	          y: baseY,
	          opacity: 1
	        }
	      });
	    }
	  }, {
	    key: 'ballPhysics',
	    value: function ballPhysics() {
	      return new _popmotion2['default'].Simulate({
	        values: {
	          x: {
	            friction: 0.05,
	            min: -50,
	            max: 50,
	            velocity: function velocity() {
	              return _popmotion2['default'].calc.random(-1, 1) * 500;
	            },
	            bounce: .7
	          },
	          y: {
	            max: baseY,
	            min: -baseY,
	            acceleration: 2000,
	            velocity: -viewportHeight * 1.5,
	            bounce: .7
	          }
	        }
	      });
	    }
	  }, {
	    key: 'updateTopView',
	    value: function updateTopView() {
	      var $instructions = $('.instructions');
	      var $score = $('.score');
	      var $goal = $('.goal');

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
	  }, {
	    key: 'updatePoints',
	    value: function updatePoints() {
	      var $scorePoints = $('.score span');
	      var $goalPoints = $('.goal span');
	      var newPoints = parseFloat($scorePoints.html()) + 1;
	      if (newPoints >= $goalPoints.html()) {
	        this.goalReached();
	      }
	      $scorePoints.html(newPoints);
	    }
	  }, {
	    key: 'gameOver',
	    value: function gameOver() {
	      var $scorePoints = $('.score span');
	      $scorePoints.html('0');
	      if (!gameCompleted) {
	        $.growl.error({ title: "Game Over", message: "", location: growlLocation, size: defaultGrowSize });
	      }
	    }
	  }, {
	    key: 'gameStart',
	    value: function gameStart() {
	      gameStarted = true;
	    }
	  }, {
	    key: 'goalReached',
	    value: function goalReached() {
	      var $goalPoints = $('.goal span');
	      var newGoal = parseInt($goalPoints.html()) + 1;
	      var blinkOnce = function blinkOnce(color, delay) {
	        setTimeout(function () {
	          $goalPoints.css('color', color);
	        }, delay);
	      };
	      var blink = function blink() {
	        blinkOnce('red', 0);
	        blinkOnce('white', 50);
	        blinkOnce('red', 100);
	        blinkOnce('white', 150);
	      };
	      var unlockTrophy = function unlockTrophy() {
	        $('.empty-trophies').hide();
	        var $trophiesContainer = $('.trophies-container');
	        var card = $trophiesContainer.find('.card:nth-child(' + (newGoal + 1) + ')');
	        var trophiesCount = $trophiesContainer.find('.card').length;
	        if (parseInt(newGoal - 1) < trophiesCount) {
	          card.show();
	        } else {
	          gameComplete();
	        }
	      };
	      var gameComplete = function gameComplete() {
	        $.growl.notice({ title: "You have unlocked all trophies", message: "", location: growlLocation, size: defaultGrowSize });
	        $('#game-wrapper').removeClass('game-body').addClass('trophies-body');
	        $('.trophies-nav').fadeOut("slow");
	        $('.trophies-container').fadeIn("slow");
	        $('.all-trophies-unlocked').fadeIn("slow");
	        $('.game-container').fadeOut("slow");
	        gameCompleted = true;
	      };

	      $.growl.notice({ title: "New trophy unlocked", message: "", location: growlLocation, size: defaultGrowSize });
	      $goalPoints.html(newGoal);
	      blink();
	      unlockTrophy();
	    }
	  }]);

	  return Ball;
	})();

	exports['default'] = {
	  init: function init() {
	    new Ball();
	  }
	};
	module.exports = exports['default'];

/***/ },
/* 2 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";

	var popmotion = __webpack_require__(3);

	/*
	    Add optional custom value type support
	*/
	popmotion.addValueType({
	    alpha: __webpack_require__(47),
	    angle: __webpack_require__(48),
	    px: __webpack_require__(49),
	    hsl: __webpack_require__(50),
	    rgb: __webpack_require__(57),
	    hex: __webpack_require__(58),
	    color: __webpack_require__(59),
	    positions: __webpack_require__(60),
	    dimensions: __webpack_require__(62),
	    scale: __webpack_require__(63),
	    shadow: __webpack_require__(64),
	    complex: __webpack_require__(65)
	});

	/*
	    Predefined roles
	*/

	popmotion.attr = __webpack_require__(30);
	popmotion.css = __webpack_require__(23);
	popmotion.svg = __webpack_require__(29);
	popmotion.drawPath = __webpack_require__(33);

	module.exports = popmotion;

/***/ },
/* 3 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";

	var valueTypeManager = __webpack_require__(4),
	    _select = __webpack_require__(6),
	    Popmotion = {

	    Actor: __webpack_require__(7),

	    Input: __webpack_require__(35),

	    Iterator: __webpack_require__(37),

	    Process: __webpack_require__(8),

	    Easing: __webpack_require__(40),

	    Role: __webpack_require__(22),

	    Action: __webpack_require__(17),
	    Tween: __webpack_require__(38),
	    Simulate: __webpack_require__(43),
	    Track: __webpack_require__(45),

	    /*
	        Create an Iterator of Actors with selected dom elements
	    */
	    select: function select(selector) {
	        var _this = this;

	        var opts = arguments.length <= 1 || arguments[1] === undefined ? {} : arguments[1];

	        var selection = _select(selector),
	            actors = [];

	        selection.forEach(function (element) {
	            opts.element = element;
	            actors.push(new _this.Actor(opts));
	        });

	        return new this.Iterator(actors);
	    },

	    addValueType: function addValueType() {
	        valueTypeManager.extend.apply(valueTypeManager, arguments);
	        return this;
	    },

	    calc: __webpack_require__(16)
	};

	module.exports = Popmotion;

/***/ },
/* 4 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";

	var ModManager = __webpack_require__(5),
	    valueTypeManager = new ModManager();

	valueTypeManager.defaultProps = function (type, key) {
	    var valueType = this[type],
	        defaultProps = valueType.defaultProps ? valueType.defaultProps[key] || valueType.defaultProps : {};

	    return defaultProps;
	};

	valueTypeManager.test = function (value) {
	    var type = false;

	    this.each(function (key, mod) {
	        if (mod.test && mod.test(value)) {
	            type = key;
	        }
	    });

	    return type;
	};

	module.exports = valueTypeManager;

/***/ },
/* 5 */
/***/ function(module, exports) {

	"use strict";

	var ModManager = function ModManager() {
	    this._keys = [];
	    this._numKeys = 0;
	};

	ModManager.prototype = {

	    /*
	        Add module key to keys list
	         @param [string]: Key to add
	    */
	    _addKey: function _addKey(name) {
	        this._keys.push(name);
	        this._numKeys++;
	    },

	    /*
	        Add a new module
	         @param [string || object]: Name of new module or multiple modules
	        @param [object] (optional): Module to add
	    */
	    extend: function extend(name, mod) {
	        var multiMods = typeof name == 'object',
	            mods = multiMods ? name : {},
	            key = '';

	        // If we just have one module, coerce
	        if (!multiMods) {
	            mods[name] = mod;
	        }

	        for (key in mods) {
	            if (mods.hasOwnProperty(key)) {
	                this._addKey(key);
	                this[key] = mods[key];
	            }
	        }

	        return this;
	    },

	    each: function each(callback) {
	        var key = '';

	        for (var i = 0; i < this._numKeys; i++) {
	            key = this._keys[i];
	            callback(key, this[key]);
	        }
	    }
	};

	module.exports = ModManager;

/***/ },
/* 6 */
/***/ function(module, exports) {

	/*
	    Create an ActorCollection based on a selection of DOM nodes

	    @param [string || NodeList || jQuery object]:
	        If string, treated as selector.
	        If not, treated as preexisting NodeList || jQuery object.
	*/
	'use strict';

	module.exports = function (selector) {
	    var nodes = typeof selector === 'string' ? document.querySelectorAll(selector) : selector,
	        elements = [];

	    // If jQuery selection, get array of Elements
	    if (nodes.get) {
	        elements = nodes.get();

	        // Or convert NodeList to array
	    } else if (nodes.length) {
	            elements = [].slice.call(nodes);

	            // Or if it's just an Element, put into array
	        } else {
	                elements.push(nodes);
	            }

	    return elements;
	};

/***/ },
/* 7 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

	var Process = __webpack_require__(8),
	    Queue = __webpack_require__(14),
	    utils = __webpack_require__(12),
	    update = __webpack_require__(15),
	    valueOps = __webpack_require__(20),
	    select = __webpack_require__(6),

	/*
	    Role imports
	*/
	defaultRole = __webpack_require__(21),
	    cssRole = __webpack_require__(23),
	    svgRole = __webpack_require__(29),
	    drawPathRole = __webpack_require__(33),
	    Action = __webpack_require__(17),
	    each = utils.each;

	var Actor = (function () {

	    /*
	        @param [object]
	    */

	    function Actor() {
	        var opts = arguments.length <= 0 || arguments[0] === undefined ? {} : arguments[0];

	        _classCallCheck(this, Actor);

	        var props = utils.isString(opts) ? { element: opts } : opts;

	        this.values = {};
	        this.state = { values: {} };
	        this.queue = new Queue();
	        this.process = new Process(this, update);
	        this.activeActions = {};
	        this.numActive = 0;
	        this.actionCounter = 0;
	        this.activeValues = [];
	        this.activeParents = [];

	        // Get actual elements if this is a selector
	        if (utils.isString(props.element)) {
	            props.element = select(props.element)[0];
	        }

	        this.assignRoles(props.element, props.as, true);
	        this.set(props);
	        this.initRoles();
	    }

	    /*
	        Set Actor properties and values
	         @param [object]
	        @returns [Actor]
	    */

	    _createClass(Actor, [{
	        key: 'set',
	        value: function set(opts) {
	            var _this = this;

	            each(opts, function (key, value) {
	                if (key !== 'values' && key !== 'action') {
	                    _this[key] = value;
	                }
	            });

	            if (opts && opts.values) {
	                this.values = valueOps.process(this.values, opts.values, opts, 'current', this);
	            }

	            // Check all active actions for any that can be removed
	            each(this.activeActions, function (id, action) {
	                var actionIsActive = false;

	                each(_this.values, function (key, value) {
	                    actionIsActive = value.action === action ? true : actionIsActive;
	                });

	                if (!actionIsActive) {
	                    _this.unbindAction(id);
	                }
	            });

	            return this;
	        }

	        /*
	            Bind Action-specific controls to Actor
	             @returns [Controls]
	        */
	    }, {
	        key: 'controls',
	        value: function controls(action) {
	            var Controls = action.getControls();
	            return new Controls(this, action.getPlayable());
	        }

	        /*
	            Start a new Action
	             @param [Action || number]
	            @param [Input || event] (optional)
	            @returns [Controls]
	        */
	    }, {
	        key: 'start',
	        value: function start(toSet, input) {
	            var actionExists = utils.isNum(toSet),
	                action = actionExists ? this.getAction(toSet) : toSet.getPlayable(),
	                opts = action.getSet();

	            opts.action = action;

	            this.set(opts);

	            if (input) {
	                action.bindInput(input);
	            }

	            // Fire all Role onStarts if not already active
	            if (!this.isActive) {
	                var numRoles = this.roles.length;
	                for (var i = 0; i < numRoles; i++) {
	                    var role = this.roles[i];
	                    if (role.start) {
	                        role.start.call(this);
	                    }
	                }
	            }

	            // Fire new action onStart
	            if (!action.isActive && action.onStart) {
	                action.onStart.call(this);
	            }

	            this.activate();

	            if (!actionExists) {
	                var Controls = action.getControls();
	                return new Controls(this, action, true);
	            }
	        }

	        /*
	            Pause all active Actions
	             @param [int] (optional)
	            @returns [Actor]
	        */
	    }, {
	        key: 'pause',
	        value: function pause() {
	            this.isActive = false;
	            each(this.activeActions, function (id, action) {
	                return action.deactivate();
	            });
	            this.process.stop();
	            return this;
	        }

	        /*
	            Resume all active Actions
	             @param [int] (optional)
	            @returns [Actor];
	        */
	    }, {
	        key: 'resume',
	        value: function resume() {
	            this.isActive = true;
	            each(this.activeActions, function (id, action) {
	                return action.activate();
	            });
	            this.process.start();
	            return this;
	        }

	        /*
	            Stop all active Actions
	             @param [int] (optional)
	            @returns [Actor]
	        */
	    }, {
	        key: 'stop',
	        value: function stop() {
	            this.activeActions = {};
	            this.pause();
	            return this;
	        }

	        /*
	            Toggle all active Actions
	             @param [int] (optional)
	            @returns [Actor]
	        */
	    }, {
	        key: 'toggle',
	        value: function toggle() {
	            return this.isActive ? this.pause() : this.resume();
	        }

	        /*
	            Syncs `element` with current properties
	             @returns [Actor]
	        */
	    }, {
	        key: 'sync',
	        value: function sync() {
	            return this.start(new Action({ values: this.values }));
	        }

	        /*
	            Add a new Action to the queue
	        */
	    }, {
	        key: 'then',
	        value: function then() {
	            this.queue.add.apply(this.queue, arguments);
	            return this;
	        }

	        /*
	            Execute next in queue
	        */
	    }, {
	        key: 'next',
	        value: function next() {
	            var next = this.queue.next();

	            if (next) {
	                if (utils.isFunc(next)) {
	                    next();
	                    this.next();
	                } else {
	                    this.start(next);
	                }
	            } else {
	                this.stop();
	            }

	            return this;
	        }

	        /*
	            Assign Roles based on element and manually provided props
	             @param [object]: Element
	            @param [Role || array]
	            @param [boolean] (optional)
	        */
	    }, {
	        key: 'assignRoles',
	        value: function assignRoles(element, manualRoles, surpressInit) {
	            // All Actors get a default Role that handles user callbacks
	            this.roles = [defaultRole];

	            // Auto-assign if no manually-set Roles
	            if (!manualRoles && element) {
	                this.autoAssignRoles(element);

	                // Or manually set if provided
	            } else if (manualRoles) {
	                    if (utils.isArray(manualRoles)) {
	                        this.roles.push.apply(this.roles, manualRoles);
	                    } else {
	                        this.roles.push(manualRoles);
	                    }
	                }

	            if (!surpressInit) {
	                this.initRoles();
	            }
	        }

	        /*
	            Automatically assign Roles based on element, designed
	            to be extended
	             @param [object]: Element
	        */
	    }, {
	        key: 'autoAssignRoles',
	        value: function autoAssignRoles(element) {
	            // Add CSS role if HTMLElement
	            if (element instanceof HTMLElement) {
	                this.roles.push(cssRole);

	                // Add SVG role if SVG element
	            } else if (element instanceof SVGElement) {
	                    this.roles.push(svgRole);

	                    // Add Draw Path role if path element
	                    if (element.tagName === 'path') {
	                        this.roles.push(drawPathRole);
	                    }
	                }
	        }

	        /*
	            Fire init callbacks
	        */
	    }, {
	        key: 'initRoles',
	        value: function initRoles() {
	            var _this2 = this;

	            // Fire init callback
	            this.roles.forEach(function (role) {
	                if (role.init) {
	                    role.init.call(_this2);
	                }
	            });
	        }
	    }, {
	        key: 'activate',
	        value: function activate() {
	            if (!this.isActive) {
	                this.isActive = true;
	                this.firstFrame = true;
	                this.process.start();
	            }
	        }

	        /*
	            Bind Action and return its table id
	             @param [Action]
	            @returns [int]
	        */
	    }, {
	        key: 'bindAction',
	        value: function bindAction(action, id) {
	            if (id === undefined) {
	                id = this.actionCounter++;
	            }

	            if (!this.hasAction(id)) {
	                this.activeActions[id] = action;
	                this.numActive++;
	            }

	            return id;
	        }
	    }, {
	        key: 'unbindAction',
	        value: function unbindAction(id) {
	            this.numActive--;
	            delete this.activeActions[id];

	            if (!this.numActive) {
	                this.stop();
	            }
	        }
	    }, {
	        key: 'getAction',
	        value: function getAction(id) {
	            return this.activeActions[id];
	        }
	    }, {
	        key: 'hasAction',
	        value: function hasAction(id) {
	            return this.getAction(id) !== undefined;
	        }

	        /*
	            Update processing order
	            
	            @param [string]
	            @param [boolean]
	            @param [boolean]
	        */
	    }, {
	        key: 'updateOrder',
	        value: function updateOrder(key, moveToBack, hasChildren) {
	            var order = !hasChildren ? this.activeValues : this.activeParents,
	                position = order.indexOf(key);

	            // If key isn't list or moveToBack is set to true, add key
	            if (position === -1 || moveToBack) {
	                order.push(key);

	                // If key already exists, remove
	                if (position > -1) {
	                    order.splice(position, 1);
	                }
	            }
	        }

	        // [boolean]: Is this Actor active?
	    }, {
	        key: 'isActive',
	        get: function get() {
	            return this._isActive;
	        },

	        // Set hasChanged to true is this is now active
	        set: function set(status) {
	            if (status === true) {
	                this.hasChanged = status;
	            }

	            this._isActive = status;
	        }
	    }]);

	    return Actor;
	})();

	module.exports = Actor;

/***/ },
/* 8 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";

	var manager = __webpack_require__(9),

	/*
	    Process constructor
	    
	    Syntax
	        var process = new Process(scope, callback);
	        var process = new Process(callback);
	*/
	Process = function Process(scope, callback) {
	    var hasScope = callback !== undefined;

	    this.callback = hasScope ? callback : scope;
	    this.scope = hasScope ? scope : this;
	    this.id = manager.register();

	    // [boolean]: Is this process currently active?
	    this.isActive = false;
	};

	Process.prototype = {
	    /*
	        Fire callback
	        
	        @param [timestamp]: Timestamp of currently-executed frame
	        @param [number]: Time since last frame
	    */
	    fire: function fire(timestamp, elapsed) {
	        this.callback.call(this.scope, timestamp, elapsed);

	        // If we're running at an interval, deactivate again
	        if (this.isInterval) {
	            this.deactivate();
	        }

	        return this;
	    },

	    /*
	        Start process
	        
	        @param [int]: Duration of process in ms, 0 if indefinite
	        @return [this]
	    */
	    start: function start(duration) {
	        var self = this;

	        this.reset();
	        this.activate();

	        if (duration) {
	            this.stopTimer = setTimeout(function () {
	                self.stop();
	            }, duration);

	            this.isStopTimerActive = true;
	        }

	        return this;
	    },

	    /*
	        Stop process
	        
	        @return [this]
	    */
	    stop: function stop() {
	        this.reset();
	        this.deactivate();

	        return this;
	    },

	    /*
	        Activate process
	        
	        @return [this]
	    */
	    activate: function activate() {
	        this.isActive = true;
	        manager.activate(this, this.id);

	        return this;
	    },

	    /*
	        Deactivate process
	        
	        @return [this]
	    */
	    deactivate: function deactivate() {
	        this.isActive = false;
	        manager.deactivate(this.id);

	        return this;
	    },

	    /*
	        Fire process every x ms
	        
	        @param [int]: Number of ms to wait between refiring process.
	        @return [this]
	    */
	    every: function every(interval) {
	        var self = this;

	        this.reset();

	        this.isInterval = true;

	        this.intervalTimer = setInterval(function () {
	            self.activate();
	        }, interval);

	        this.isIntervalTimeActive = true;

	        return this;
	    },

	    /*
	        Clear all timers
	        
	        @param 
	    */
	    reset: function reset() {
	        this.isInterval = false;

	        if (this.isStopTimerActive) {
	            clearTimeout(this.stopTimer);
	        }

	        if (this.isIntervalTimeActive) {
	            clearInterval(this.intervalTimer);
	        }

	        return this;
	    }
	};

	module.exports = Process;

/***/ },
/* 9 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";

	var theLoop = __webpack_require__(10),
	    ProcessManager = function ProcessManager() {
	    this.activeIds = [];
	    this.activeProcesses = {};
	    this.deactivateQueue = [];
	    theLoop.setCallback(this, this.fireActive);
	};

	ProcessManager.prototype = {

	    /*
	        [int]: Used for process ID
	    */
	    processCounter: 0,

	    /*
	        [int]: Number of active processes
	    */
	    activeCount: 0,

	    /*
	        Get the process with a given index
	        
	        @param [int]: Index of process
	        @return [Process]
	    */
	    getProcess: function getProcess(i) {
	        return this.activeProcesses[i];
	    },

	    /*
	        Get number of active processes
	        
	        @return [int]: Number of active processes
	    */
	    getActiveCount: function getActiveCount() {
	        return this.activeCount;
	    },

	    /*
	        Get active tokens
	         @return [array]: Active tokens
	    */
	    getActive: function getActive() {
	        return this.activeIds;
	    },

	    /*
	        Get the length of the deactivate queue
	        
	        @return [int]: Length of queue
	    */
	    getQueueLength: function getQueueLength() {
	        return this.deactivateQueue.length;
	    },

	    /*
	        Fire all active processes
	        
	        @param [int]: Timestamp of executing frames
	        @param [int]: Time since previous frame
	        @return [boolean]: True if active processes found
	    */
	    fireActive: function fireActive(framestamp, elapsed) {
	        var process,
	            activeCount = 0,
	            activeIds = [],
	            i = 0;

	        // Purge and check active count before execution
	        this.purge();
	        activeCount = this.getActiveCount();
	        activeIds = this.getActive();

	        // Loop through active processes and fire callback
	        for (; i < activeCount; i++) {
	            process = this.getProcess(activeIds[i]);

	            if (process) {
	                process.fire(framestamp, elapsed);
	            }
	        }

	        // Repurge and recheck active count after execution
	        this.purge();
	        activeCount = this.getActiveCount();

	        // Return true if we still have active processes, or false if none
	        return activeCount ? true : false;
	    },

	    /*
	        Register a new process
	        
	        @param [Process]
	        @return [int]: Index of process to be used as ID
	    */
	    register: function register() {
	        return this.processCounter++;
	    },

	    /*
	        Activate a process
	        
	        @param [int]: Index of active process
	    */
	    activate: function activate(process, i) {
	        var queueIndex = this.deactivateQueue.indexOf(i),
	            isQueued = queueIndex > -1,
	            isActive = this.activeIds.indexOf(i) > -1;

	        // Remove from deactivateQueue if in there
	        if (isQueued) {
	            this.deactivateQueue.splice(queueIndex, 1);
	        }

	        // Add to active processes array if not already in there
	        if (!isActive) {
	            this.activeIds.push(i);
	            this.activeProcesses[i] = process;
	            this.activeCount++;
	            theLoop.start();
	        }
	    },

	    /*
	        Deactivate a process
	        
	        @param [int]: Index of process to add to deactivate queue
	    */
	    deactivate: function deactivate(i) {
	        this.deactivateQueue.push(i);
	    },

	    /*
	        Purge the deactivate queue
	    */
	    purge: function purge() {
	        var queueLength = this.getQueueLength(),
	            activeIdIndex = 0,
	            idToDelete = 0;

	        while (queueLength--) {
	            idToDelete = this.deactivateQueue[queueLength];
	            activeIdIndex = this.activeIds.indexOf(idToDelete);

	            // If process in active list deactivate
	            if (activeIdIndex > -1) {
	                this.activeIds.splice(activeIdIndex, 1);
	                this.activeCount--;
	                delete this.activeProcesses[idToDelete];
	            }
	        }

	        this.deactivateQueue = [];
	    }

	};

	module.exports = new ProcessManager();

/***/ },
/* 10 */
/***/ function(module, exports, __webpack_require__) {

	/*
	    The loop
	*/
	"use strict";

	var Timer = __webpack_require__(11),
	    tick = __webpack_require__(13),
	    Loop = function Loop() {
	    this.timer = new Timer();
	};

	Loop.prototype = {

	    /*
	        [boolean]: Current status of animation loop
	    */
	    isRunning: false,

	    /*
	        Fire all active processes once per frame
	    */
	    frame: function frame() {
	        var self = this;

	        tick(function () {
	            var framestamp = self.timer.update(),
	                // Currently just measuring in ms - will look into hi-res timestamps
	            isActive = self.callback.call(self.scope, framestamp, self.timer.getElapsed());

	            if (isActive) {
	                self.frame();
	            } else {
	                self.stop();
	            }
	        });
	    },

	    /*
	        Start loop
	    */
	    start: function start() {
	        // Make sure we're not already running a loop
	        if (!this.isRunning) {
	            this.timer.clock();
	            this.isRunning = true;
	            this.frame();
	        }
	    },

	    /*
	        Stop the loop
	    */
	    stop: function stop() {
	        this.isRunning = false;
	    },

	    /*
	        Set the callback to run every frame
	        
	        @param [Object]: Execution context
	        @param [function]: Callback to fire
	    */
	    setCallback: function setCallback(scope, callback) {
	        this.scope = scope;
	        this.callback = callback;
	    }

	};

	module.exports = new Loop();

/***/ },
/* 11 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";

	var utils = __webpack_require__(12),
	    maxElapsed = 33,
	    Timer = function Timer() {
	    this.elapsed = 16.7;
	    this.current = utils.currentTime();
	    this.update();
	};

	Timer.prototype = {
	    update: function update() {
	        this.prev = this.current;
	        this.current = utils.currentTime();
	        this.elapsed = Math.min(this.current - this.prev, maxElapsed);

	        return this.current;
	    },

	    getElapsed: function getElapsed() {
	        return this.elapsed;
	    },

	    clock: function clock() {
	        this.current = utils.currentTime();
	    }
	};

	module.exports = Timer;

/***/ },
/* 12 */
/***/ function(module, exports) {

	/*
	    Utility functions
	*/
	"use strict";

	var protectedProperties = ['scope', 'dom'],
	    isProtected = function isProtected(key) {
	    return protectedProperties.indexOf(key) !== -1;
	},

	/*
	    Get var type as string
	    
	    @param: Variable to test
	    @return [string]: Returns, for instance 'Object' if [object Object]
	*/
	varType = function varType(variable) {
	    return Object.prototype.toString.call(variable).slice(8, -1);
	};

	module.exports = {

	    /*
	        Iterate over an object and fire a callback for every item in it
	         @param [object]: Properties
	        @param [function]: Callback to fire
	    */
	    each: function each(props, callback) {
	        var keys = Object.keys(props),
	            numKeys = keys.length;

	        for (var i = 0; i < numKeys; i++) {
	            var key = keys[i],
	                prop = props[key];

	            if (callback(key, prop) === false) {
	                break;
	            }
	        }
	    },

	    /*
	        Has one object changed from the other
	        
	        Compares the two provided inputs and returns true if they are different
	        
	        @param [object]: Input A
	        @param [object]: Input B
	        @return [boolean]: True if different
	    */
	    hasChanged: function hasChanged(a, b) {
	        var hasChanged = false,
	            key = '';

	        for (key in b) {
	            if (a.hasOwnProperty(key) && b.hasOwnProperty(key)) {
	                if (a[key] !== b[key]) {
	                    hasChanged = true;
	                }
	            } else {
	                hasChanged = true;
	            }
	        }

	        return hasChanged;
	    },

	    /*
	        Is this var a number?
	        
	        @param: Variable to test
	        @return [boolean]: Returns true if typeof === 'number'
	    */
	    isNum: function isNum(num) {
	        return typeof num === 'number';
	    },

	    /*
	        Is this var an object?
	        
	        @param: Variable to test
	        @return [boolean]: Returns true if typeof === 'object'
	    */
	    isObj: function isObj(obj) {
	        return typeof obj === 'object';
	    },

	    /*
	        Is this var a function ? 
	        
	        @param: Variable to test
	        @return [boolean]: Returns true if this.varType === 'Function'
	    */
	    isFunc: function isFunc(obj) {
	        return varType(obj) === 'Function';
	    },

	    /*
	        Is this var a string ? 
	        
	        @param: Variable to test
	        @return [boolean]: Returns true if typeof str === 'string'
	    */
	    isString: function isString(str) {
	        return typeof str === 'string';
	    },

	    /*
	        Is this a relative value assignment?
	        
	        @param [string]: Variable to test
	        @return [boolean]: If this looks like a relative value assignment
	    */
	    isRelativeValue: function isRelativeValue(value) {
	        return value && value.indexOf && value.indexOf('=') > 0;
	    },

	    /*
	        Is this var an array ? 
	        
	        @param: Variable to test
	        @return [boolean]: Returns true if this.varType === 'Array'
	    */
	    isArray: function isArray(arr) {
	        return varType(arr) === 'Array';
	    },

	    /*
	        Copy object or array
	        
	        Checks whether base is an array or object and makes
	        appropriate copy
	        
	        @param [array || object]: Array or object to copy
	        @param [array || object]: New copy of array or object
	    */
	    copy: function copy(base) {
	        return this.isArray(base) ? this.copyArray(base) : this.copyObject(base);
	    },

	    /*
	        Deep copy an object
	        
	        Iterates over an object and creates a new copy of every item,
	        deep copying if it finds any objects/arrays
	        
	        @param [object]: Object to copy
	        @param [object]: New copy of object
	    */
	    copyObject: function copyObject(base) {
	        var newObject = {};

	        for (var key in base) {
	            if (base.hasOwnProperty(key)) {
	                newObject[key] = this.isObj(base[key]) && !isProtected(key) ? this.copy(base[key]) : base[key];
	            }
	        }

	        return newObject;
	    },

	    /*
	        Deep copy an array
	        
	        Loops through an array and creates a new copy of every item,
	        deep copying if it finds any objects/arrays
	        
	        @param [array]: Array to copy
	        @return [array]: New copy of array
	    */
	    copyArray: function copyArray(base) {
	        var newArray = [],
	            length = base.length,
	            i = 0;

	        for (; i < length; i++) {
	            newArray[i] = this.isObj(base[i]) ? this.copy(base[i]) : base[i];
	        }

	        return newArray;
	    },

	    /*
	        Non-destructive merge of object or array
	        
	        @param [array || object]: Array or object to use as base
	        @param [array || object]: Array or object to overwrite base with
	        @return [array || object]: New array or object
	    */
	    merge: function merge(base, overwrite) {
	        return this.isArray(base) ? this.copyArray(overwrite) : this.mergeObject(base, overwrite);
	    },

	    /*
	        Non-destructive merge of object
	        
	        @param [object]: Object to use as base
	        @param [object]: Object to overwrite base with
	        @return [object]: New object
	    */
	    mergeObject: function mergeObject(base, overwrite) {
	        var hasBase = this.isObj(base),
	            newObject = hasBase ? this.copy(base) : this.copy(overwrite),
	            key = '';

	        if (hasBase) {
	            for (key in overwrite) {
	                if (overwrite.hasOwnProperty(key)) {
	                    newObject[key] = this.isObj(overwrite[key]) && !isProtected(key) ? this.merge(base[key], overwrite[key]) : overwrite[key];
	                }
	            }
	        }
	        return newObject;
	    },

	    /*
	        Split a value into a value/unit object
	        
	            "200px" -> { value: 200, unit: "px" }
	            
	        @param [string]: Value to split
	        @return [object]: Object with value and unit props
	    */
	    splitValUnit: function splitValUnit(value) {
	        var splitVal = value.match(/(-?\d*\.?\d*)(.*)/);

	        return {
	            value: splitVal[1],
	            unit: splitVal[2]
	        };
	    },

	    /*
	        Create stepped version of 0-1 progress
	        
	        @param [number]: Current value
	        @param [int]: Number of steps
	        @return [number]: Stepped value
	    */
	    stepProgress: function stepProgress(progress, steps) {
	        var segment = 1 / (steps - 1),
	            target = 1 - 1 / steps,
	            progressOfTarget = Math.min(progress / target, 1);

	        return Math.floor(progressOfTarget / segment) * segment;
	    },

	    /*
	        Generate current timestamp
	        
	        @return [timestamp]: Current UNIX timestamp
	    */
	    currentTime: function currentTime() {
	        return typeof performance !== "undefined" ? performance.now() : new Date().getTime();
	    }

	};

/***/ },
/* 13 */
/***/ function(module, exports) {

	"use strict";
	/*
	    requestAnimationFrame polyfill
	    
	    For IE8/9 Flinstones

	    Taken from Paul Irish. We've stripped out cancelAnimationFrame checks because we don't fox with that
	    
	    http://paulirish.com/2011/requestanimationframe-for-smart-animating/
	    http://my.opera.com/emoller/blog/2011/12/20/requestanimationframe-for-smart-er-animating
	     
	    requestAnimationFrame polyfill by Erik Möller. fixes from Paul Irish and Tino Zijdel
	     
	    MIT license
	*/
	var tick,
	    lastTime = 0,
	    hasWindow = typeof window !== 'undefined';

	if (!hasWindow) {
	    // Load rAF shim
	    tick = function (callback) {
	        var currTime = new Date().getTime(),
	            timeToCall = Math.max(0, 16 - (currTime - lastTime)),
	            id = setTimeout(function () {
	            callback(currTime + timeToCall);
	        }, timeToCall);

	        lastTime = currTime + timeToCall;

	        return id;
	    };
	} else {
	    tick = window.requestAnimationFrame;
	}

	module.exports = tick;

/***/ },
/* 14 */
/***/ function(module, exports) {

	"use strict";

	var Queue = function Queue() {
	    this.clear();
	};

	Queue.prototype = {

	    /*
	        Add a set of arguments to queue
	    */
	    add: function add() {
	        this.queue.push(arguments[0]);
	    },

	    /*
	        Get next set of arguments from queue
	    */
	    next: function next(direction) {
	        var queue = this.queue,
	            returnVal = false,
	            index = this.index;

	        direction = arguments.length ? direction : 1;

	        // If our index is between 0 and the queue length, return that item
	        if (index >= 0 && index < queue.length) {
	            returnVal = queue[index];
	            this.index = index + direction;

	            // Or clear
	        } else {
	                this.clear();
	            }

	        return returnVal;
	    },

	    /*
	        Replace queue with empty array
	    */
	    clear: function clear() {
	        this.queue = [];
	        this.index = 0;
	    }
	};

	module.exports = Queue;

/***/ },
/* 15 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";

	var valueTypeManager = __webpack_require__(4),
	    calc = __webpack_require__(16),
	    utils = __webpack_require__(12),
	    each = utils.each,
	    Action = __webpack_require__(17),
	    defaultAction = new Action(),
	    Watch = __webpack_require__(19),
	    watcher = new Watch(),
	    createMapper = function createMapper(role, mappedValues) {
	    return function (name, val) {
	        mappedValues[role.map(name)] = val;
	    };
	},

	/*
	    Check all Actions for `onEnd`, return true if all are true
	     @param [Actor]
	    @param [boolean]
	    @returns [boolean]
	*/
	checkAndFireHasEnded = function checkAndFireHasEnded(actor, hasChanged) {
	    var hasEnded = true,
	        values = actor.state.values;

	    each(actor.activeActions, function (key, action) {
	        // Return if action has been deleted elsewhere
	        if (!action) {
	            return;
	        }

	        if (action.onFrame) {
	            action.onFrame.call(actor, values);
	        }

	        if (action.onUpdate && hasChanged) {
	            action.onUpdate.call(actor, values);
	        }

	        if (action.hasEnded && action.hasEnded(actor, hasChanged) === false) {
	            hasEnded = false;
	        } else {
	            if (action.onComplete) {
	                action.onComplete.call(actor);
	            }
	            actor.unbindAction(key);
	        }
	    });

	    return hasEnded;
	},

	/*
	    Update the Actor and its values
	     @param [int]: Timestamp of rAF call
	    @param [int]: Time since last frame
	*/
	update = function update(framestamp, frameDuration) {
	    var numActiveValues = this.activeValues.length,
	        numActiveParents = this.activeParents.length,
	        numRoles = this.roles.length,
	        state = this.state,
	        hasChanged = this.hasChanged;

	    // Update values
	    for (var i = 0; i < numActiveValues; i++) {
	        // Get value and key
	        var key = this.activeValues[i];
	        var value = this.values[key];
	        var action = !value.action || value.action && !value.action.isActive ? defaultAction : value.action;

	        // Fire action onFrameStart if not already fired
	        if (action.onFrameStart && action.lastUpdate !== framestamp) {
	            action.onFrameStart(this, frameDuration, framestamp);
	            action.lastUpdate = framestamp;
	        }

	        // Calculate new value
	        var updatedValue = value.watch ? watcher.process(this, value) : action.process(this, value, key, frameDuration);

	        // Limit if this action does that kind of thing
	        if (action.limit && value.hasRange) {
	            updatedValue = action.limit(updatedValue, value);
	        }

	        // Round value if round is true
	        if (value.round) {
	            updatedValue = Math.round(updatedValue);
	        }

	        // Update frameChange
	        value.frameChange = updatedValue - value.current;

	        // Calculate velocity if Action hasn't
	        if (!action.calculatesVelocity) {
	            value.velocity = calc.speedPerSecond(value.frameChange, frameDuration);
	        }

	        // Update current speed
	        value.speed = Math.abs(value.velocity);

	        // Check if value's changed
	        if (value.current !== updatedValue) {
	            hasChanged = true;
	        }

	        // Set new current
	        value.current = updatedValue;
	        var valueState = value.unit ? updatedValue + value.unit : updatedValue;

	        // Put value in state if no parent
	        if (!value.parent) {
	            state.values[key] = valueState;

	            // Or, add to parent state to be combined later
	        } else {
	                state[value.parent] = state[value.parent] || {};
	                state[value.parent][value.propName] = valueState;
	            }
	    }

	    // Update parent values from calculated children
	    for (var i = 0; i < numActiveParents; i++) {
	        var key = this.activeParents[i];
	        var value = this.values[key];

	        // Update parent value current property
	        value.current = valueTypeManager[value.type].combine(state[key], value.template);

	        // Update state
	        state.values[key] = value.current;
	    }

	    // Fire `frame` and `update` callbacks on all Roles
	    for (var i = 0; i < numRoles; i++) {
	        var role = this.roles[i];
	        var mappedValues = {};

	        each(state.values, createMapper(role, mappedValues));

	        if (role.frame) {
	            role.frame.call(this, mappedValues);
	        }

	        if (role.update && (hasChanged || this.firstFrame)) {
	            role.update.call(this, mappedValues);
	        }
	    }

	    // Reset hasChanged before further Actions might affect this
	    this.hasChanged = false;

	    // Check all Actions and fire onEnd if they've ended
	    if (this.isActive && checkAndFireHasEnded(this, hasChanged)) {
	        this.isActive = false;

	        // Fire `complete` callback
	        for (var i = 0; i < numRoles; i++) {
	            var role = this.roles[i];
	            if (role.complete) {
	                role.complete.call(this);
	            }
	        }

	        // If Actor is still inactive, fire next step
	        if (!this.isActive) {
	            this.next();
	        }
	    }

	    this.firstFrame = false;
	    this.framestamp = framestamp;
	};

	module.exports = update;

/***/ },
/* 16 */
/***/ function(module, exports, __webpack_require__) {

	/*
	    Calculators
	    ----------------------------------------
	    
	    Simple I/O snippets
	*/
	"use strict";

	var utils = __webpack_require__(12),
	    calc = {

	    /*
	        Angle between points
	        
	        Translates the hypothetical line so that the 'from' coordinates
	        are at 0,0, then return the angle using .angleFromCenter()
	        
	        @param [object]: X and Y coordinates of from point
	        @param [object]: X and Y cordinates of to point
	        @return [radian]: Angle between the two points in radians
	    */
	    angle: function angle(pointA, pointB) {
	        var from = pointB ? pointA : { x: 0, y: 0 },
	            to = pointB || pointA,
	            point = {
	            x: to.x - from.x,
	            y: to.y - from.y
	        };

	        return this.angleFromCenter(point.x, point.y);
	    },

	    /*
	        Angle from center
	        
	        Returns the current angle, in radians, of a defined point
	        from a center (assumed 0,0)
	        
	        @param [number]: X coordinate of second point
	        @param [number]: Y coordinate of second point
	        @return [radian]: Angle between 0, 0 and point in radians
	    */
	    angleFromCenter: function angleFromCenter(x, y) {
	        return this.radiansToDegrees(Math.atan2(y, x));
	    },

	    /*
	        Convert degrees to radians
	        
	        @param [number]: Value in degrees
	        @return [number]: Value in radians
	    */
	    degreesToRadians: function degreesToRadians(degrees) {
	        return degrees * Math.PI / 180;
	    },

	    /*
	        Dilate
	        
	        Change the progression between a and b according to dilation.
	        
	        So dilation = 0.5 would change
	        
	        a --------- b
	        
	        to
	        
	        a ---- b
	        
	        @param [number]: Previous value
	        @param [number]: Current value
	        @param [number]: Dilate progress by x
	        @return [number]: Previous value plus the dilated difference
	    */
	    dilate: function dilate(a, b, dilation) {
	        return a + (b - a) * dilation;
	    },

	    /*
	        Distance
	        
	        Returns the distance between (0,0) and pointA, unless pointB
	        is provided, then we return the difference between the two.
	        
	        @param [object/number]: x and y or just x of point A
	        @param [object/number]: (optional): x and y or just x of point B
	        @return [number]: The distance between the two points
	    */
	    distance: function distance(pointA, pointB) {
	        return typeof pointA === "number" ? this.distance1D(pointA, pointB) : this.distance2D(pointA, pointB);
	    },

	    /*
	        Distance 1D
	        
	        Returns the distance between point A and point B
	        
	        @param [number]: Point A
	        @param [number]: (optional): Point B
	        @return [number]: The distance between the two points
	    */
	    distance1D: function distance1D(pointA, pointB) {
	        var bIsNum = typeof pointB === 'number',
	            from = bIsNum ? pointA : 0,
	            to = bIsNum ? pointB : pointA;

	        return absolute(to - from);
	    },

	    /*
	        Distance 2D
	        
	        Returns the distance between (0,0) and point A, unless point B
	        is provided, then we return the difference between the two.
	        
	        @param [object]: x and y of point A
	        @param [object]: (optional): x and y of point B
	        @return [number]: The distance between the two points
	    */
	    distance2D: function distance2D(pointA, pointB) {
	        var bIsObj = typeof pointB === "object",
	            from = bIsObj ? pointA : { x: 0, y: 0 },
	            to = bIsObj ? pointB : pointA,
	            point = {
	            x: absolute(to.x - from.x),
	            y: absolute(to.y - from.y)
	        };

	        return this.hypotenuse(point.x, point.y);
	    },

	    /*
	        Hypotenuse
	        
	        Returns the hypotenuse, side C, given the lengths of sides A and B.
	        
	        @param [number]: Length of A
	        @param [number]: Length of B
	        @return [number]: Length of C
	    */
	    hypotenuse: function hypotenuse(a, b) {
	        var a2 = a * a,
	            b2 = b * b,
	            c2 = a2 + b2;

	        return Math.sqrt(c2);
	    },

	    /*
	        Offset between two inputs
	        
	        Calculate the difference between two different inputs
	        
	        @param [Point]: First input
	        @param [Point]: Second input
	        @return [Offset]: Distance metrics between two points
	    */
	    offset: function offset(a, b) {
	        var offset = {};

	        for (var key in b) {
	            if (b.hasOwnProperty(key)) {
	                if (a.hasOwnProperty(key)) {
	                    offset[key] = b[key] - a[key];
	                } else {
	                    offset[key] = 0;
	                }
	            }
	        }

	        if (isNum(offset.x) && isNum(offset.y)) {
	            offset.angle = this.angle(a, b);
	            offset.distance = this.distance2D(a, b);
	        }

	        return offset;
	    },

	    /*
	        Point from angle and distance
	        
	        @param [object]: 2D point of origin
	        @param [number]: Angle from origin
	        @param [number]: Distance from origin
	        @return [object]: Calculated 2D point
	    */
	    pointFromAngleAndDistance: function pointFromAngleAndDistance(origin, angle, distance) {
	        var point = {};

	        point.x = distance * Math.cos(angle) + origin.x;
	        point.y = distance * Math.sin(angle) + origin.y;

	        return point;
	    },

	    /*
	        Progress within given range
	        
	        Given a lower limit and an upper limit, we return the progress
	        (expressed as a number 0-1) represented by the given value, and
	        limit that progress to within 0-1.
	        
	        @param [number]: Value to find progress within given range
	        @param [number]: Lower limit if full range given, upper if not
	        @param [number] (optional): Upper limit of range
	        @return [number]: Progress of value within range as expressed 0-1
	    */
	    progress: function progress(value, limitA, limitB) {
	        var bIsNum = typeof limitB === 'number',
	            from = bIsNum ? limitA : 0,
	            to = bIsNum ? limitB : limitA,
	            range = to - from,
	            progress = (value - from) / range;

	        return progress;
	    },

	    /*
	        Convert radians to degrees
	        
	        @param [number]: Value in radians
	        @return [number]: Value in degrees
	    */
	    radiansToDegrees: function radiansToDegrees(radians) {
	        return radians * 180 / Math.PI;
	    },

	    /*
	        Return random number between range
	        
	        @param [number] (optional): Output minimum
	        @param [number] (optional): Output maximum
	        @return [number]: Random number within range, or 0 and 1 if none provided
	    */
	    random: function random(min, max) {
	        min = isNum(min) ? min : 0;
	        max = isNum(max) ? max : 1;
	        return Math.random() * (max - min) + min;
	    },

	    /*
	        Calculate relative value
	        
	        Takes the operator and value from a string, ie "+=5", and applies
	        to the current value to resolve a new target.
	        
	        @param [number]: Current value
	        @param [string]: Relative value
	        @return [number]: New value
	    */
	    relativeValue: function relativeValue(current, rel) {
	        var newValue = current,
	            equation = rel.split('='),
	            operator = equation[0],
	            splitVal = utils.splitValUnit(equation[1]);

	        switch (operator) {
	            case '+':
	                newValue += splitVal.value;
	                break;
	            case '-':
	                newValue -= splitVal.value;
	                break;
	            case '*':
	                newValue *= splitVal.value;
	                break;
	            case '/':
	                newValue /= splitVal.value;
	                break;
	        }

	        if (splitVal.unit) {
	            newValue += splitVal.unit;
	        }

	        return newValue;
	    },

	    /*
	        Restrict value to range
	        
	        Return value within the range of lowerLimit and upperLimit
	        
	        @param [number]: Value to keep within range
	        @param [number]: Lower limit of range
	        @param [number]: Upper limit of range
	        @return [number]: Value as limited within given range
	    */
	    restricted: function restricted(value, min, max) {
	        var restricted = min !== undefined ? Math.max(value, min) : value;
	        restricted = max !== undefined ? Math.min(restricted, max) : restricted;

	        return restricted;
	    },

	    /*
	        Convert x per second to per frame velocity based on fps
	        
	        @param [number]: Unit per second
	        @param [number]: Frame duration in ms
	    */
	    speedPerFrame: function speedPerFrame(xps, frameDuration) {
	        return isNum(xps) ? xps / (1000 / frameDuration) : 0;
	    },

	    /*
	        Convert velocity into velicity per second
	        
	        @param [number]: Unit per frame
	        @param [number]: Frame duration in ms
	    */
	    speedPerSecond: function speedPerSecond(velocity, frameDuration) {
	        return velocity * (1000 / frameDuration);
	    },

	    /*
	        Value in range from progress
	        
	        Given a lower limit and an upper limit, we return the value within
	        that range as expressed by progress (a number from 0-1)
	        
	        @param [number]: The progress between lower and upper limits expressed 0-1
	        @param [number]: Lower limit of range, or upper if limit2 not provided
	        @param [number] (optional): Upper limit of range
	        @return [number]: Value as calculated from progress within range (not limited within range)
	    */
	    value: function value(progress, limitA, limitB) {
	        var bIsNum = typeof limitB === 'number',
	            from = bIsNum ? limitA : 0,
	            to = bIsNum ? limitB : limitA;

	        return -progress * from + progress * to + from;
	    },

	    /*
	        Eased value in range from progress
	        
	        Given a lower limit and an upper limit, we return the value within
	        that range as expressed by progress (a number from 0-1)
	        
	        @param [number]: The progress between lower and upper limits expressed 0-1
	        @param [number]: Lower limit of range, or upper if limit2 not provided
	        @param [number]: Upper limit of range
	        @param [function]: Easing to apply to value
	        @return [number]: Value as calculated from progress within range (not limited within range)
	    */
	    valueEased: function valueEased(progress, from, to, easing) {
	        var easedProgress = easing(progress);

	        return this.value(easedProgress, from, to);
	    }
	},

	/*
	    Caching functions used multiple times to reduce filesize and increase performance
	*/
	isNum = utils.isNum,
	    absolute = Math.abs;

	module.exports = calc;

/***/ },
/* 17 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

	var calc = __webpack_require__(16),
	    utils = __webpack_require__(12),
	    each = utils.each,
	    Controls = __webpack_require__(18);

	var DEFAULT_PROP = 'current';
	var PRIVATE = ['onStart', 'onFrame', 'onUpdate', 'onComplete'];

	var Action = (function () {
	    function Action(props) {
	        _classCallCheck(this, Action);

	        var action = this;

	        utils.each(this.getDefaultProps(), function (key, value) {
	            action[key] = value;
	        });

	        this.values = {};
	        this.set(props, this.getDefaultValueProp());
	    }

	    _createClass(Action, [{
	        key: 'set',
	        value: function set() {
	            var _this = this;

	            var props = arguments.length <= 0 || arguments[0] === undefined ? {} : arguments[0];
	            var defaultProp = arguments.length <= 1 || arguments[1] === undefined ? DEFAULT_PROP : arguments[1];

	            each(props, function (key, prop) {
	                if (key !== 'values') {
	                    _this[key] = prop;
	                }
	            });

	            // Merge values
	            if (props.values) {
	                (function () {
	                    var currentValues = _this.values,
	                        values = props.values;

	                    each(values, function (key, value) {
	                        var existingValue = currentValues[key],
	                            newValue = {};

	                        if (utils.isObj(value)) {
	                            newValue = value;
	                        } else {
	                            newValue[defaultProp] = value;
	                        }

	                        currentValues[key] = existingValue ? utils.merge(existingValue, newValue) : newValue;
	                    });
	                })();
	            }

	            return this;
	        }
	    }, {
	        key: 'process',
	        value: function process(actor, value) {
	            return value.current;
	        }

	        /*
	             Has Action ended?
	             
	             Returns true to end immedietly
	             
	             @return [boolean]: true
	         */
	    }, {
	        key: 'hasEnded',
	        value: function hasEnded() {
	            return true;
	        }
	    }, {
	        key: 'limit',
	        value: function limit(output, value) {
	            var restricted = calc.restricted(output, value.min, value.max),
	                escapeAmp = value.escapeAmp !== undefined ? value.escapeAmp : 0;
	            return restricted + (output - restricted) * escapeAmp;
	        }
	    }, {
	        key: 'getControls',
	        value: function getControls() {
	            return Controls;
	        }
	    }, {
	        key: 'getDefaultProps',
	        value: function getDefaultProps() {
	            return {};
	        }
	    }, {
	        key: 'getDefaultValue',
	        value: function getDefaultValue() {
	            return {};
	        }
	    }, {
	        key: 'getDefaultValueProp',
	        value: function getDefaultValueProp() {
	            return DEFAULT_PROP;
	        }
	    }, {
	        key: 'getSet',
	        value: function getSet() {
	            var _this2 = this;

	            var set = { values: this.values };

	            each(this, function (key, prop) {
	                if (_this2.hasOwnProperty(key) && PRIVATE.indexOf(key) === -1) {
	                    set[key] = prop;
	                }
	            });

	            return set;
	        }
	    }, {
	        key: 'extend',
	        value: function extend(props) {
	            return new this.constructor(utils.merge(this, props), this.getDefaultValueProp());
	        }
	    }, {
	        key: 'getPlayable',
	        value: function getPlayable() {
	            return this.extend();
	        }
	    }, {
	        key: 'activate',
	        value: function activate() {
	            this.isActive = true;
	            return this;
	        }
	    }, {
	        key: 'deactivate',
	        value: function deactivate() {
	            this.isActive = false;
	            return this;
	        }
	    }]);

	    return Action;
	})();

	module.exports = Action;

/***/ },
/* 18 */
/***/ function(module, exports) {

	"use strict";

	var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	var Controls = (function () {
	    function Controls(actor, action, hasStarted) {
	        _classCallCheck(this, Controls);

	        this.actor = actor;
	        this.action = action;

	        if (hasStarted) {
	            this.id = this.bindAction();
	            this.action.activate();
	        }
	    }

	    _createClass(Controls, [{
	        key: "start",
	        value: function start(input) {
	            this.id = this.bindAction();
	            this.actor.start(this.id, input);
	            this.action.activate();
	            return this;
	        }
	    }, {
	        key: "stop",
	        value: function stop() {
	            this.actor.unbindAction(this.id);
	            this.action.deactivate();
	            return this;
	        }
	    }, {
	        key: "pause",
	        value: function pause() {
	            this.action.deactivate();
	            return this;
	        }
	    }, {
	        key: "resume",
	        value: function resume() {
	            this.action.activate();
	            return this;
	        }
	    }, {
	        key: "toggle",
	        value: function toggle() {
	            var resume = this.actor.hasAction(this.id) ? this.resume : this.start;
	            return this.action.isActive ? this.pause() : resume.call(this);
	        }
	    }, {
	        key: "then",
	        value: function then() {
	            var _actor;

	            (_actor = this.actor).then.apply(_actor, arguments);
	            return this;
	        }
	    }, {
	        key: "bindAction",
	        value: function bindAction() {
	            return this.actor.bindAction(this.action, this.id);
	        }
	    }]);

	    return Controls;
	})();

	module.exports = Controls;

/***/ },
/* 19 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

	var _get = function get(_x, _x2, _x3) { var _again = true; _function: while (_again) { var object = _x, property = _x2, receiver = _x3; desc = parent = getter = undefined; _again = false; if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { _x = parent; _x2 = property; _x3 = receiver; _again = true; continue _function; } } else if ('value' in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } } };

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

	function _inherits(subClass, superClass) { if (typeof superClass !== 'function' && superClass !== null) { throw new TypeError('Super expression must either be null or a function, not ' + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) subClass.__proto__ = superClass; }

	var Action = __webpack_require__(17),
	    calc = __webpack_require__(16),
	    STRING = 'string',

	/*
	    Translate our mapLink value into mapTo
	    
	    @param [number]: Calculated value from linked value
	    @param [Value || object]: Linked value or empty object if we're linking to input
	    @param [array]: List of numbers relating to linked value
	    @param [array]: List of numbers relating to this value
	*/
	findMappedValue = function findMappedValue(newValue, linkedValue, toValue, mapLink, mapTo) {
	    var mapLength = mapLink.length,
	        i = 1,
	        lastLinkValue,
	        thisLinkValue,
	        lastToValue,
	        thisToValue;

	    for (; i < mapLength; i++) {
	        // Assign values from array, or if they're strings, look for them in linkedValue
	        lastLinkValue = typeof mapLink[i - 1] === STRING ? linkedValue[mapLink[i - 1]] : mapLink[i - 1];
	        thisLinkValue = typeof mapLink[i] === STRING ? linkedValue[mapLink[i]] : mapLink[i];
	        lastToValue = typeof mapTo[i - 1] === STRING ? toValue[mapTo[i - 1]] : mapTo[i - 1];
	        thisToValue = typeof mapTo[i] === STRING ? toValue[mapTo[i]] : mapTo[i];

	        // Check if we've gone past our calculated value, or if we're at the end of the array
	        if (newValue < thisLinkValue || i === mapLength - 1) {
	            newValue = calc.value(calc.restricted(calc.progress(newValue, lastLinkValue, thisLinkValue), 0, 1), lastToValue, thisToValue);
	            break;
	        }
	    }

	    return newValue;
	};

	var Watch = (function (_Action) {
	    _inherits(Watch, _Action);

	    function Watch() {
	        _classCallCheck(this, Watch);

	        for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
	            args[_key] = arguments[_key];
	        }

	        _get(Object.getPrototypeOf(Watch.prototype), 'constructor', this).apply(this, args);
	        this.isActive = true;
	    }

	    /*
	        Process this value
	        
	        First check if this value exists as a Value, if not
	        check within Input (if we have one)
	            
	        @param [Actor]
	        @param [Value]: Current value
	        @param [string]: Key of current value
	        @return [number]: Calculated value
	    */

	    _createClass(Watch, [{
	        key: 'process',
	        value: function process(actor, value, key) {
	            var values = actor.values,
	                newValue = value.current,
	                watchedKey = value.watch,
	                watchedValue = values[watchedKey] ? values[watchedKey] : {},
	                inputOffset = value.action ? value.action.inputOffset : false;

	            // First look at Action and check value isn't linking itself
	            if (watchedValue.current !== undefined && key !== watchedKey) {
	                newValue = watchedValue.current;

	                // Then check values in Input
	            } else if (inputOffset && inputOffset.hasOwnProperty(watchedKey)) {
	                    newValue = value.origin + inputOffset[watchedKey] * value.amp;
	                }

	            // If we have mapFrom and mapTo properties, translate the new value
	            if (value.mapFrom && value.mapTo) {
	                newValue = findMappedValue(newValue, watchedValue, value, value.mapFrom, value.mapTo);
	            }

	            return newValue;
	        }
	    }]);

	    return Watch;
	})(Action);

	module.exports = Watch;

/***/ },
/* 20 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var valueTypesManager = __webpack_require__(4),
	    calc = __webpack_require__(16),
	    utils = __webpack_require__(12),
	    isNum = utils.isNum,
	    each = utils.each;

	var numericalValues = ['current', 'to', 'min', 'max', 'velocity', 'friction', 'spring'],
	    numNumericalValues = numericalValues.length,
	    defaultValue = {
	    current: 0,
	    velocity: 0,
	    speed: 0,
	    frameChange: 0
	};

	function checkNumericalValue(name) {
	    return numericalValues.indexOf(name) > -1;
	}

	/*
	    Check Role typeMaps to see if this value name has been mapped
	    to a specific value type

	    @param [string]
	    @param [array]
	    @returns [string]: Value type
	*/
	function checkRoles(name, roles) {
	    var valueType;

	    each(roles, function (key, role) {
	        if (role._typeMap) {
	            valueType = role._typeMap[role.map(name)] || valueType;
	        }
	    });

	    return valueType;
	}

	/*
	    Check value for special type

	    @param [object]
	    @param [object]
	    @param [object]
	    @param [string]
	    @returns [string || false]
	*/
	function checkValueType(existingValue, newValue, scope, valueName) {
	    var valueType;

	    // Check existing value for type already set
	    if (existingValue && existingValue.type) {
	        valueType = existingValue.type;
	    } else {
	        // Or check Role _typeMap properties
	        if (scope.roles) {
	            valueType = checkRoles(valueName, scope.roles);
	        }

	        // Finally run tests
	        if (!valueType && utils.isString(newValue.current)) {
	            valueType = valueTypesManager.test(newValue.current);
	        }
	    }

	    return valueType;
	}

	/*
	    Resolve a property

	    @param [string]
	    @param [string || function || number]
	    @param [object]
	    @param [object]
	    @returns [number]
	*/
	function resolve(name, prop, value, scope) {
	    var isNumericalValue = checkNumericalValue(name);

	    // If function, resolve
	    if (utils.isFunc(prop) && isNumericalValue) {
	        prop = prop.call(scope, scope);
	    }

	    // If string, check for relative numbers and units
	    if (utils.isString(prop)) {
	        // If relative value
	        if (prop.indexOf('=') > 0) {
	            prop = calc.relativeValue(value.current, prop);
	        }

	        // If unit
	        if (isNumericalValue) {
	            splitUnit(prop, value);
	        }
	    }

	    if (isNumericalValue) {
	        prop = parseFloat(prop);
	    }

	    return prop;
	}

	/*
	    Split a value into sub-values

	    @param [string]
	    @param [object]
	    @param [object]
	    @param [valueTypeHandler]
	    @returns [object]
	*/
	function split(name, value, scope, valueTypeHandler) {
	    var splitValues = {},
	        i = 0;

	    var _loop = function () {
	        var propName = numericalValues[i];
	        var splitProp = {};

	        if (value.hasOwnProperty(propName)) {
	            var valueProp = value[propName];

	            // If we need to first resolve this, resolve
	            if (utils.isFunc(valueProp)) {
	                valueProp = valueProp.call(scope, scope);
	            }

	            if (!utils.isString(valueProp)) {
	                return 'continue';
	            }

	            splitProp = valueTypeHandler.split(valueProp);

	            // Assign split properties to each child value
	            each(splitProp, function (key, prop) {
	                // Create new value if none exists
	                splitValues[key] = splitValues[key] || utils.copy(valueTypesManager.defaultProps(value.type, key));
	                splitValues[key][propName] = prop;

	                if (utils.isString(splitProp[key])) {
	                    splitUnit(splitValues[key][propName], splitValues[key]);
	                }
	            });
	        }
	    };

	    for (; i < numNumericalValues; i++) {
	        var _ret = _loop();

	        if (_ret === 'continue') continue;
	    }

	    return splitValues;
	}

	/*
	    Split value into number and unit, and set unit to value

	    @param [string]
	    @param [object]
	*/
	function splitUnit(property, hostValue) {
	    if (utils.isNum(property)) {
	        return property;
	    }
	    var returnVal = property;

	    var _utils$splitValUnit = utils.splitValUnit(property);

	    var value = _utils$splitValUnit.value;
	    var unit = _utils$splitValUnit.unit;

	    if (!isNaN(value)) {
	        returnVal = value;
	        if (unit) {
	            hostValue.unit = unit;
	        }
	    }

	    return returnVal;
	}

	/*
	    Preprocess incoming values, splitting non-numerical values
	    into sub-values ie hex

	    @param [object]
	    @param [object]
	    @param [object]
	    @param [string]
	*/
	function preprocess(existing, incoming, scope, defaultProp) {
	    var values = {};

	    each(incoming, function (key, value) {
	        var existingValue = existing[key],
	            newValue = {};

	        if (utils.isObj(value)) {
	            newValue = value;
	        } else {
	            newValue[defaultProp] = value;
	        }

	        // If value doesn't have a special type, check for one
	        newValue.type = checkValueType(existingValue, newValue, scope, key);

	        values[key] = newValue;

	        // If we have a type property, split/assign default props
	        if (newValue.type) {
	            var typeHandler = valueTypesManager[newValue.type];

	            // If valueType handler has a split function, split this value
	            if (typeHandler.split) {
	                var splitValues = split(key, newValue, scope, typeHandler);
	                newValue.children = {};

	                each(splitValues, function (childName, childValue) {
	                    childValue = utils.merge(newValue, childValue);
	                    childValue.parent = childValue.name = key;
	                    childValue.propName = childName;

	                    delete childValue.type;
	                    delete childValue.children;

	                    newValue.children[childName] = values[key + childName] = childValue;
	                });

	                if (typeHandler.template) {
	                    newValue.template = existingValue ? existingValue.template : typeHandler.template(newValue.current);
	                }

	                // Or just assign default properties for this value
	            } else {
	                    values[key] = utils.merge(valueTypesManager.defaultProps(newValue.type, key), newValue);
	                }
	        }
	    });

	    return values;
	}

	module.exports = {

	    /*
	        Flip value target/origin
	    */
	    flip: function flip(value) {
	        var target = value.target !== undefined ? value.target : value.current;
	        value.target = value.to = value.origin;
	        value.origin = target;
	    },

	    /*
	        Merge existing and incoming values, resolving properties
	        set as functions and splitting non-numerical values ie hex
	         @param [object]
	        @param [object]
	        @param [object]
	        @param [string] (optional)
	        @param [object]
	        @returns [object]: New values object
	    */
	    process: function process(existing, incoming, inherit, defaultProp, scope) {
	        existing = existing || {};
	        defaultProp = defaultProp || 'current';
	        var preprocessed = preprocess(existing, incoming, scope, defaultProp);

	        each(preprocessed, function (key, value) {
	            var newValue = existing[key] || utils.copy(defaultValue),
	                hasChildren = value.children !== undefined,
	                defaultActionValue = inherit.action ? inherit.action.getDefaultValue() : {};

	            value.action = inherit.action;

	            each(defaultActionValue, function (propName, defaultActionProp) {
	                newValue[propName] = inherit.hasOwnProperty(propName) && !value.hasOwnProperty(propName) ? inherit[propName] : defaultActionProp;
	            });

	            each(value, function (valueName, valueProp) {
	                // If property is not undefined or a number, resolve
	                if (valueProp !== undefined && !isNum(valueProp) && !hasChildren) {
	                    valueProp = resolve(valueName, valueProp, newValue, scope);
	                }

	                newValue[valueName] = valueProp;

	                // Set internal target if this property is 'to'
	                if (valueName === 'to') {
	                    newValue.target = newValue.to;
	                }
	            });

	            newValue.origin = newValue.current;
	            newValue.hasRange = isNum(newValue.min) || isNum(newValue.max) ? true : false;

	            existing[key] = newValue;
	            scope.updateOrder(key, utils.isString(newValue.watch), hasChildren);
	        });

	        return existing;
	    }
	};

/***/ },
/* 21 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var Role = __webpack_require__(22);

	module.exports = new Role({
	    init: function init() {
	        if (this.init) {
	            this.init();
	        }
	    },

	    start: function start() {
	        if (this.onStart) {
	            this.onStart();
	        }
	    },

	    frame: function frame(state) {
	        if (this.onFrame) {
	            this.onFrame(state);
	        }
	    },

	    update: function update(state) {
	        if (this.onUpdate) {
	            this.onUpdate(state);
	        }
	    },

	    complete: function complete() {
	        if (this.onComplete) {
	            this.onComplete();
	        }
	    }
	});

/***/ },
/* 22 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var utils = __webpack_require__(12);
	var each = utils.each;

	/*
	    Role class constructor

	    @param [object]: Optional methods and props to add:
	        name [string]:      Name of generated getter/setter method on Actor
	        _map [object]:      Map Actor values to these values for this Role
	        _typeMap [object]:  Map values to value types
	        init [function]:    Callback to run when this Role is added to an Actor
	        start [function]:   Callback to run when host Actor starts an action
	        complete [function]: Callback to run when action completes
	        frame [function]:   Callback to fire once per frame
	        update [function]:  Callback to fire when values change
	        get [function]:     Read value from actual element
	        set [function]:     Set value on actual element
	*/
	var Role = function Role(methods) {
	    var role = this;

	    role._map = {};

	    each(methods, function (name, method) {
	        role[name] = !utils.isObj(method) ? method : utils.copy(method);
	    });
	};

	/*
	    Create a new role

	    @param [object]: Optional methods and props to add
	    @param [valuesToMap]: Override existing map with these values
	    @return [Role]: New Role
	*/
	var createRole = function createRole(methods, values) {
	    var newRole = new Role(methods);

	    each(values, function (key, value) {
	        newRole._map[key] = value;
	    });

	    return newRole;
	};

	Role.prototype = {

	    /*
	        Map value keys or generate new Role with updated map
	         Getter:
	            @param [string]: Key to map
	            @return [string]: Mapped key, or key if no mapped key found
	         Setter: 
	            @param [object]: Map of Actor keys -> Role keys
	            @return [Role]: New Role with unique map
	    */
	    map: function map(values) {
	        // If this is a string, get mapped value
	        // Otherwise this is a map, duplicated role with updated map
	        return utils.isString(values) ? this._map[values] || values : createRole(this, values);
	    }
	};

	module.exports = Role;

/***/ },
/* 23 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";

	var Role = __webpack_require__(22);
	var build = __webpack_require__(24);
	var each = __webpack_require__(12).each;

	var prefixes = ['Webkit', 'Moz', 'O', 'ms', ''];
	var numPrefixes = prefixes.length;
	var propertyNameCache = {};

	/*
	    Test style property for prefixed version
	    
	    @param [string]: Style property
	    @return [string]: Cached property name
	*/
	var testPrefix = function testPrefix(key) {
	    var testElement = document.body;

	    propertyNameCache[key] = false;

	    for (var i = 0; i < numPrefixes; i++) {
	        var prefix = prefixes[i],
	            prefixed = prefix === '' ? key : prefix + key.charAt(0).toUpperCase() + key.slice(1);

	        if (testElement.style.hasOwnProperty(prefixed)) {
	            propertyNameCache[key] = prefixed;
	        }
	    }

	    return propertyNameCache[key];
	};

	var cssRole = new Role({
	    _map: __webpack_require__(27),
	    _typeMap: __webpack_require__(28),

	    init: function init() {
	        this._cssCache = {};
	    },

	    update: function update(state) {
	        var actor = this;

	        each(build(state, actor._cssCache), function (key, value) {
	            cssRole.set(actor.element, key, value);
	        });
	    },

	    get: function get(element, key) {
	        key = propertyNameCache[key] || testPrefix(key);

	        if (key) {
	            return window.getComputedStyle(element, null)[key];
	        }
	    },

	    set: function set(element, key, value) {
	        key = propertyNameCache[key] || testPrefix(key);

	        if (key) {
	            element.style[key] = value;
	        }
	    }

	});

	module.exports = cssRole;

/***/ },
/* 24 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";

	var each = __webpack_require__(12).each,
	    transformDictionary = __webpack_require__(25),
	    transformProps = transformDictionary.props,
	    TRANSLATE_Z = 'translateZ';

	module.exports = function (output, cache) {
	    var css = {},
	        transform = '',
	        transformHasZ = false;

	    // Loop through output, check for transform properties
	    each(output, function (key, rule) {
	        // If this is a transform property, add to transform string
	        if (transformProps[key]) {
	            transform += key + '(' + rule + ')';
	            transformHasZ = key === TRANSLATE_Z ? true : transformHasZ;

	            // Or just assign directly
	        } else {
	                if (rule !== cache[key]) {
	                    cache[key] = css[key] = rule;
	                }
	            }
	    });

	    // If we have transform properties, add translateZ
	    if (transform !== '') {
	        if (!transformHasZ) {
	            transform += ' ' + TRANSLATE_Z + '(0px)';
	        }

	        if (transform !== cache.transform) {
	            cache.transform = css.transform = transform;
	        }
	    }

	    return css;
	};

/***/ },
/* 25 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";

	var positionTerms = __webpack_require__(26).positions,
	    numPositionTerms = positionTerms.length,
	    TRANSFORM_PERSPECTIVE = 'transformPerspective',
	    SCALE = 'scale',
	    ROTATE = 'rotate',
	    terms = {
	    funcs: ['translate', SCALE, ROTATE, 'skew', TRANSFORM_PERSPECTIVE],
	    props: {} // objects are faster at direct lookups
	};

	// Create transform terms
	(function () {
	    var funcs = terms.funcs,
	        props = terms.props,
	        numFuncs = funcs.length,
	        i = 0,
	        createProps = function createProps(funcName) {
	        var j = 0;

	        for (; j < numPositionTerms; j++) {
	            props[funcName + positionTerms[j]] = true;
	        }
	    };

	    // Manually add skew and transform perspective 
	    props[ROTATE] = props[SCALE] = props[TRANSFORM_PERSPECTIVE] = true;

	    // Loop over each function name and create function/property terms
	    for (; i < numFuncs; i++) {
	        createProps(funcs[i]);
	    }
	})();

	module.exports = terms;

/***/ },
/* 26 */
/***/ function(module, exports) {

	"use strict";

	var X = 'X',
	    Y = 'Y',
	    ALPHA = 'Alpha',
	    terms = {
	    colors: ['Red', 'Green', 'Blue', ALPHA],
	    positions: [X, Y, 'Z'],
	    dimensions: ['Top', 'Right', 'Bottom', 'Left'],
	    shadow: [X, Y, 'Radius', 'Spread', 'Color'],
	    hsl: ['Hue', 'Saturation', 'Lightness', ALPHA]
	};

	module.exports = terms;

/***/ },
/* 27 */
/***/ function(module, exports) {

	'use strict';

	var TRANSLATE = 'translate';

	module.exports = {
	    x: TRANSLATE + 'X',
	    y: TRANSLATE + 'Y',
	    z: TRANSLATE + 'Z'
	};

/***/ },
/* 28 */
/***/ function(module, exports) {

	'use strict';

	var COLOR = 'color',
	    POSITIONS = 'positions',
	    DIMENSIONS = 'dimensions',
	    SHADOW = 'shadow',
	    ANGLE = 'angle',
	    ALPHA = 'alpha',
	    PX = 'px';

	module.exports = {
	    // Color properties
	    color: COLOR,
	    backgroundColor: COLOR,
	    outlineColor: COLOR,
	    fill: COLOR,
	    stroke: COLOR,
	    // Border
	    borderColor: COLOR,
	    borderTopColor: COLOR,
	    borderRightColor: COLOR,
	    borderBottomColor: COLOR,
	    borderLeftColor: COLOR,
	    borderRadius: PX,
	    // Dimensions
	    margin: DIMENSIONS,
	    padding: DIMENSIONS,
	    width: PX,
	    height: PX,
	    // Positions
	    backgroundPosition: POSITIONS,
	    perspectiveOrigin: POSITIONS,
	    transformOrigin: POSITIONS,
	    // Shadows
	    textShadow: SHADOW,
	    boxShadow: SHADOW,
	    // Transform properties
	    rotate: ANGLE,
	    rotateX: ANGLE,
	    rotateY: ANGLE,
	    rotateZ: ANGLE,
	    skewX: ANGLE,
	    skewY: ANGLE,
	    translateX: PX,
	    translateY: PX,
	    translateZ: PX,
	    perspective: PX,
	    opacity: ALPHA
	};

/***/ },
/* 29 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";

	var Role = __webpack_require__(22),
	    attrRole = __webpack_require__(30),
	    build = __webpack_require__(31),
	    each = __webpack_require__(12).each;

	module.exports = new Role({
	    name: 'svg',

	    _map: __webpack_require__(27),
	    _typeMap: __webpack_require__(32),

	    start: function start() {
	        var boundingBox = this.element.getBBox(),
	            values = this.values,

	        // TODO: Support px
	        transformOriginX = values.transformOriginX ? values.transformOriginX.current : 50,
	            transformOriginY = values.transformOriginY ? values.transformOriginY.current : 50,
	            origin = {
	            x: boundingBox.width * (transformOriginX / 100) + boundingBox.x,
	            y: boundingBox.height * (transformOriginY / 100) + boundingBox.y
	        };

	        this.svgOrigin = origin;
	    },

	    update: function update(state) {
	        var actor = this;
	        each(build(state, this.svgOrigin), function (key, value) {
	            attrRole.set(actor.element, key, value);
	        });
	    }

	});

/***/ },
/* 30 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";

	var Role = __webpack_require__(22);
	var each = __webpack_require__(12).each;

	var attrRole = new Role({
	    update: function update(state) {
	        var actor = this;

	        each(state, function (key, value) {
	            attrRole.set(actor.element, key, value);
	        });
	    },

	    get: function get(element, key) {
	        return element.getAttribute(key);
	    },

	    set: function set(element, key, value) {
	        element.setAttribute(key, value);
	    }
	});

	module.exports = attrRole;

/***/ },
/* 31 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var each = __webpack_require__(12).each,
	    transformDictionary = __webpack_require__(25),
	    transformProps = transformDictionary.props,
	    zeroNotZero = 0.0001;

	module.exports = function (output, origin) {
	    var props = {},
	        hasTransform = false,
	        scale = output.scale !== undefined ? output.scale || zeroNotZero : output.scaleX || 1,
	        scaleY = output.scaleY !== undefined ? output.scaleY || zeroNotZero : scale || 1,
	        transformOriginX = origin.x,
	        transformOriginY = origin.y,
	        scaleTransformX = -transformOriginX * (scale * 1),
	        scaleTransformY = -transformOriginY * (scaleY * 1),
	        scaleReplaceX = transformOriginX / scale,
	        scaleReplaceY = transformOriginY / scaleY,
	        transform = {
	        translate: 'translate(' + output.translateX + ', ' + output.translateY + ') ',
	        scale: 'translate(' + scaleTransformX + ', ' + scaleTransformY + ') scale(' + scale + ', ' + scaleY + ') translate(' + scaleReplaceX + ', ' + scaleReplaceY + ') ',
	        rotate: 'rotate(' + output.rotate + ', ' + transformOriginX + ', ' + transformOriginY + ') ',
	        skewX: 'skewX(' + output.skewX + ') ',
	        skewY: 'skewY(' + output.skewY + ') '
	    };

	    each(output, function (key, value) {
	        if (transformProps[key]) {
	            hasTransform = true;
	        } else {
	            props[key] = value;
	        }
	    });

	    if (hasTransform) {
	        props.transform = '';

	        each(transform, function (key, value) {
	            var defaultValue = key === 'scale' ? '1' : '0';
	            props.transform += value.replace(/undefined/g, defaultValue);
	        });
	    }

	    return props;
	};

/***/ },
/* 32 */
/***/ function(module, exports) {

	'use strict';

	var COLOR = 'color',
	    SCALE = 'scale';

	module.exports = {
	    fill: COLOR,
	    stroke: COLOR,
	    scale: SCALE,
	    scaleX: SCALE,
	    scaleY: SCALE,
	    transformOrigin: 'positions',
	    d: 'complex'
	};

/***/ },
/* 33 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";

	var Role = __webpack_require__(22);
	var attrRole = __webpack_require__(30);
	var each = __webpack_require__(12).each;

	/*
	    Convert percentage to pixels
	    
	    @param [number]: Percentage of total length
	    @param [number]: Total length
	*/
	var percentToPixels = function percentToPixels(percentage, length) {
	    return parseFloat(percentage) / 100 * length + 'px';
	};

	/*
	    Create styles
	    
	    @param [object]: SVG Path properties
	    @param [object]: Length of path
	    @returns [object]: Key/value pairs of valid CSS properties
	*/
	var createStyles = function createStyles(props, length) {
	    var hasDashArray = false,
	        dashArrayStyles = {
	        length: 0,
	        spacing: length + 'px'
	    },
	        styles = {};

	    each(props, function (key, value) {
	        key = SVGDrawPath._map[key] || key;

	        switch (key) {
	            case 'length':
	            case 'spacing':
	                hasDashArray = true;
	                dashArrayStyles[key] = percentToPixels(value, length);
	                break;
	            case 'offset':
	                styles['stroke-dashoffset'] = percentToPixels(-value, length);
	                break;
	            default:
	                styles[key] = value;
	        }
	    });

	    if (hasDashArray) {
	        styles['stroke-dasharray'] = dashArrayStyles.length + ' ' + dashArrayStyles.spacing;
	    }

	    return styles;
	};

	/*
	    Draw Path role
	*/
	var SVGDrawPath = new Role({
	    _map: __webpack_require__(34),

	    _typeMap: {
	        stroke: 'color',
	        d: 'complex'
	    },

	    init: function init() {
	        this.pathLength = this.element.getTotalLength();
	    },

	    /*
	        Update `path` styles and if `element` is present, set
	        x, y and rotation
	    */
	    update: function update(state) {
	        attrRole.update.call(this, createStyles(state, this.pathLength));
	    }
	});

	module.exports = SVGDrawPath;

/***/ },
/* 34 */
/***/ function(module, exports) {

	'use strict';

	var STROKE = 'stroke';

	module.exports = {
	    opacity: STROKE + '-opacity',
	    width: STROKE + '-width',
	    miterlimit: STROKE + '-miterlimit'
	};

/***/ },
/* 35 */
/***/ function(module, exports, __webpack_require__) {

	/*
	    Input controller
	*/
	"use strict";

	var calc = __webpack_require__(16),
	    utils = __webpack_require__(12),
	    History = __webpack_require__(36),

	/*
	    Input constructor
	    
	        Syntax
	            newInput(name, value[, poll])
	                @param [string]: Name of to track
	                @param [number]: Initial value
	                @param [function] (optional): Function to poll Input data
	                
	            newInput(props[, poll])
	                @param [object]: Object of values
	                @param [function] (optional): Function to poll Input data
	     @return [Input]
	*/
	Input = function Input() {
	    var pollPos = arguments.length - 1;

	    this.current = {};
	    this.offset = {};
	    this.velocity = {};
	    this.history = new History();
	    this.update(arguments[0], arguments[1]);

	    if (utils.isFunc(arguments[pollPos])) {
	        this.poll = arguments[pollPos];
	    }
	};

	Input.prototype = {

	    // [number]: Number of frames of inactivity before velocity is turned to 0
	    maxInactiveFrames: 2,

	    // [number]: Number of frames input hasn't been updated
	    inactiveFrames: 0,

	    /*
	        Get latest input values
	        
	        @param [string] (optional): Name of specific property to return
	        @return [object || number]: Latest input values or, if specified, single value
	    */
	    get: function get(prop) {
	        var latest = this.history.get(),
	            val = prop !== undefined ? latest[prop] : latest;

	        return val;
	    },

	    /*
	        Update the input values
	        
	        Syntax
	            input.update(name, value)
	                @param [string]: Name of to track
	                @param [number]: Initial value
	                
	            input.update(props)
	                @param [object]: Object of values
	                
	        @return [Input]
	    */
	    update: function update(arg0, arg1) {
	        var values = {};

	        if (utils.isNum(arg1)) {
	            values[arg0] = arg1;
	        } else {
	            values = arg0;
	        }

	        this.history.add(utils.merge(this.current, values));

	        return this;
	    },

	    /*
	        Check for input movement and update pointer object's properties
	        
	        @param [number]: Timestamp of frame
	        @return [Input]
	    */
	    onFrame: function onFrame(timestamp) {
	        var latest, hasChanged;

	        // Check provided timestamp against lastFrame timestamp and return input has already been updated
	        if (timestamp === this.lastFrame) {
	            return;
	        }

	        latest = this.poll ? this.poll() : this.history.get();
	        hasChanged = utils.hasChanged(this.current, latest);

	        // If input has changed between frames 
	        if (hasChanged) {
	            this.velocity = calc.offset(this.current, latest);
	            this.current = latest;
	            this.inactiveFrames = 0;

	            // Or it hasn't moved and our frame limit has been reached
	        } else if (this.inactiveFrames >= this.maxInactiveFrames) {
	                this.velocity = calc.offset(this.current, this.current);

	                // Or input hasn't changed
	            } else {
	                    this.inactiveFrames++;
	                }

	        this.lastFrame = timestamp;

	        return this;
	    }
	};

	module.exports = Input;

/***/ },
/* 36 */
/***/ function(module, exports) {

	"use strict";

	var // [number]: Default max size of history
	maxHistorySize = 3,

	/*
	    History constructor
	    
	    @param [var]: Variable to store in first history slot
	    @param [int] (optional): Maximum size of history
	*/
	History = function History(obj, max) {
	    this.max = max || maxHistorySize;
	    this.entries = [];
	    this.add(obj);
	};

	History.prototype = {

	    /*
	        Push new var to history
	        
	        Shift out oldest entry if we've reached maximum capacity
	        
	        @param [var]: Variable to push into history.entries
	    */
	    add: function add(obj) {
	        var currentSize = this.getSize();

	        this.entries.push(obj);

	        if (currentSize >= this.max) {
	            this.entries.shift();
	        }
	    },

	    /*
	        Get variable at specified index
	         @param [int]: Index
	        @return [var]: Var found at specified index
	    */
	    get: function get(i) {
	        i = typeof i === 'number' ? i : this.getSize() - 1;

	        return this.entries[i];
	    },

	    /*
	        Get the second newest history entry
	        
	        @return [var]: Entry found at index size - 2
	    */
	    getPrevious: function getPrevious() {
	        return this.get(this.getSize() - 2);
	    },

	    /*
	        Get current history size
	        
	        @return [int]: Current length of entries.length
	    */
	    getSize: function getSize() {
	        return this.entries.length;
	    }

	};

	module.exports = History;

/***/ },
/* 37 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

	var Actor = __webpack_require__(7),
	    Tween = __webpack_require__(38),
	    utils = __webpack_require__(12);

	var DEFAULT_STAGGER_EASE = 'linear';

	function generateCallback(method) {
	    for (var _len = arguments.length, args = Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
	        args[_key - 1] = arguments[_key];
	    }

	    return utils.isString(method) ? function (member) {
	        return member[method].apply(member, args);
	    } : method;
	}

	var Iterator = (function () {
	    function Iterator(members) {
	        _classCallCheck(this, Iterator);

	        this.clear();

	        if (members) {
	            this.add(members);
	        }

	        this._stagger = new Actor();
	    }

	    _createClass(Iterator, [{
	        key: 'add',
	        value: function add(members) {
	            this.members = this.members.concat(members);
	            return this;
	        }
	    }, {
	        key: 'clear',
	        value: function clear() {
	            this.members = [];
	            return this;
	        }
	    }, {
	        key: 'each',
	        value: function each(method) {
	            for (var _len2 = arguments.length, args = Array(_len2 > 1 ? _len2 - 1 : 0), _key2 = 1; _key2 < _len2; _key2++) {
	                args[_key2 - 1] = arguments[_key2];
	            }

	            var callback = generateCallback.apply(undefined, [method].concat(args));
	            this.members.forEach(callback);
	            return this;
	        }
	    }, {
	        key: 'eachIntoNew',
	        value: function eachIntoNew(method) {
	            for (var _len3 = arguments.length, args = Array(_len3 > 1 ? _len3 - 1 : 0), _key3 = 1; _key3 < _len3; _key3++) {
	                args[_key3 - 1] = arguments[_key3];
	            }

	            var callback = generateCallback.apply(undefined, [method].concat(args)),
	                newIterator = new Iterator();

	            this.members.forEach(function (member) {
	                return newIterator.add(callback(member));
	            });

	            return newIterator;
	        }
	    }, {
	        key: 'stagger',
	        value: function stagger(method, props) {
	            var _this = this;

	            for (var _len4 = arguments.length, args = Array(_len4 > 2 ? _len4 - 2 : 0), _key4 = 2; _key4 < _len4; _key4++) {
	                args[_key4 - 2] = arguments[_key4];
	            }

	            var numMembers = this.members.length,
	                propsIsInterval = utils.isNum(props),
	                interval = propsIsInterval ? props : props.interval,
	                staggerProps = {},
	                i = -1,
	                callback = generateCallback.apply(undefined, [method].concat(args));

	            staggerProps.values = {
	                i: {
	                    current: 0,
	                    duration: interval * numMembers,
	                    ease: propsIsInterval ? DEFAULT_STAGGER_EASE : props.ease || DEFAULT_STAGGER_EASE,
	                    round: true,
	                    to: numMembers - 1
	                }
	            };

	            staggerProps.onUpdate = function (output) {
	                var newIndex = output.i,
	                    gapIndex = i + 1;

	                // If our new index is only one more than the previous index, fire immedietly
	                if (newIndex === i + 1) {
	                    callback(_this.members[gapIndex], gapIndex);

	                    // Or loop through the distance to fire all indecies. Increase delay.
	                } else {
	                        for (; gapIndex <= newIndex; gapIndex++) {
	                            callback(_this.members[gapIndex], gapIndex);
	                        }
	                    }

	                i = newIndex;
	            };

	            this._stagger.start(new Tween(staggerProps));

	            return this;
	        }
	    }]);

	    return Iterator;
	})();

	module.exports = Iterator;

/***/ },
/* 38 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

	var _get = function get(_x, _x2, _x3) { var _again = true; _function: while (_again) { var object = _x, property = _x2, receiver = _x3; desc = parent = getter = undefined; _again = false; if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { _x = parent; _x2 = property; _x3 = receiver; _again = true; continue _function; } } else if ('value' in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } } };

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

	function _inherits(subClass, superClass) { if (typeof superClass !== 'function' && superClass !== null) { throw new TypeError('Super expression must either be null or a function, not ' + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) subClass.__proto__ = superClass; }

	var Action = __webpack_require__(17),
	    calc = __webpack_require__(16),
	    utils = __webpack_require__(12),
	    each = utils.each,
	    presetEasing = __webpack_require__(39),
	    valueOps = __webpack_require__(20),
	    TweenControls = __webpack_require__(42),
	    nextSteps = {
	    loop: 'restart',
	    yoyo: 'reverse',
	    flip: 'flipValues'
	},

	/*
	    Ease value within ranged parameters
	    
	    @param [number]: Progress between 0 and 1
	    @param [number]: Value of 0 progress
	    @param [number]: Value of 1 progress
	    @param [string || function]: Name of preset easing
	        to use or generated easing function
	    @return [number]: Value of eased progress in range
	*/
	ease = function ease(progress, from, to, _ease) {
	    var progressLimited = calc.restricted(progress, 0, 1),
	        easingFunction = utils.isString(_ease) ? presetEasing[_ease] : _ease;

	    return calc.valueEased(progressLimited, from, to, easingFunction);
	};

	var COUNT = 'count';

	var Tween = (function (_Action) {
	    _inherits(Tween, _Action);

	    function Tween() {
	        _classCallCheck(this, Tween);

	        _get(Object.getPrototypeOf(Tween.prototype), 'constructor', this).apply(this, arguments);
	    }

	    _createClass(Tween, [{
	        key: 'getControls',
	        value: function getControls() {
	            return TweenControls;
	        }
	    }, {
	        key: 'getDefaultProps',
	        value: function getDefaultProps() {
	            return {
	                delay: 0,
	                dilate: 1,
	                duration: 300,
	                loop: false,
	                yoyo: false,
	                flip: false,
	                playDirection: 1,
	                ended: true,
	                elapsed: 0
	            };
	        }
	    }, {
	        key: 'getDefaultValue',
	        value: function getDefaultValue() {
	            return {
	                delay: 0,
	                duration: 300,
	                ease: 'easeOut',
	                stagger: 0,
	                steps: 0,
	                to: 0,
	                round: false
	            };
	        }
	    }, {
	        key: 'getDefaultValueProp',
	        value: function getDefaultValueProp() {
	            return 'to';
	        }

	        /*
	            Update Action elapsed time
	            
	            @param [object]: Action properties
	            @param [number]: Timestamp of current frame
	        */
	    }, {
	        key: 'onFrameStart',
	        value: function onFrameStart(actor, frameDuration) {
	            this.elapsed = this.elapsed || 0;

	            if (frameDuration) {
	                this.elapsed += frameDuration * actor.dilate * this.playDirection;
	                this.ended = true;
	            }
	        }

	        /*
	            Calculate progress of value based on time elapsed,
	            value delay/duration/stagger properties
	             @param [Actor]
	            @param [object]: Value state and properties
	            @return [number]: Calculated value
	        */
	    }, {
	        key: 'process',
	        value: function process(actor, value) {
	            var target = value.to,
	                progressTarget = this.playDirection === 1 ? 1 : 0,
	                newValue = value.current,
	                progress;

	            // If this value has a to property, otherwise we just return current value
	            if (target !== undefined) {
	                progress = calc.restricted(calc.progress(this.elapsed - value.delay, value.duration) - value.stagger, 0, 1);

	                // Mark Action as NOT ended if still in progress
	                if (progress !== progressTarget) {
	                    this.ended = false;
	                }

	                // Step progress if we're stepping
	                if (value.steps) {
	                    progress = utils.stepProgress(progress, value.steps);
	                }

	                // Ease value
	                newValue = ease(progress, value.origin, target, value.ease);
	            }

	            return newValue;
	        }

	        /*
	            If this tween has ended, check if we loop/yoyo/flip
	            
	            @return [boolean]: Has this tween really really ended?
	        */
	    }, {
	        key: 'hasEnded',
	        value: function hasEnded(actor) {
	            var _this = this;

	            if (this.ended) {
	                each(nextSteps, function (name, methodName) {
	                    if (_this.checkNextStep(actor, name, _this[methodName])) {
	                        _this.ended = false;
	                        actor.hasChanged = true;
	                        return false;
	                    }
	                });
	            }

	            return this.ended;
	        }
	    }, {
	        key: 'checkNextStep',
	        value: function checkNextStep(actor, name, method) {
	            var stepTaken = false,
	                step = this[name],
	                count = this[name + COUNT] || 0,
	                forever = step === true;

	            if (forever || utils.isNum(step)) {
	                ++count;
	                this[name + COUNT] = count;

	                if (forever || count <= step) {
	                    method.call(this, actor);
	                    stepTaken = true;
	                }
	            }

	            return stepTaken;
	        }
	    }, {
	        key: 'flipValues',
	        value: function flipValues(actor) {
	            var actorValues = actor.values;
	            this.elapsed = this.duration - this.elapsed;

	            each(this.values, function (key) {
	                var value = actorValues[key];

	                if (value.children) {
	                    each(value.children, function (childKey) {
	                        valueOps.flip(actorValues[key + childKey]);
	                    });
	                }

	                valueOps.flip(value);
	            });
	        }
	    }, {
	        key: 'reverse',
	        value: function reverse() {
	            this.playDirection *= -1;
	        }
	    }, {
	        key: 'restart',
	        value: function restart() {
	            this.elapsed = this.playDirection === 1 ? 0 : this.duration;
	            this.started = utils.currentTime();
	        }
	    }]);

	    return Tween;
	})(Action);

	module.exports = Tween;

/***/ },
/* 39 */
/***/ function(module, exports, __webpack_require__) {

	/*
	    Easing functions
	    ----------------------------------------
	    
	    Generates and provides easing functions based on baseFunction definitions
	    
	    A call to easingFunction.get('functionName') returns a function that can be passed:
	        @param [number]: Progress 0-1
	        @param [number] (optional): Amp modifier, only accepted in some easing functions
	                                    and is used to adjust overall strength
	        @return [number]: Eased progress
	        
	    We can generate new functions by sending an easing function through easingFunction.extend(name, method).
	    Which will make nameIn, nameOut and nameInOut functions available to use.
	        
	    Easing functions from Robert Penner
	    http://www.robertpenner.com/easing/
	        
	    Bezier curve interpretor created from Gaëtan Renaudeau's original BezierEasing  
	    https://github.com/gre/bezier-easing/blob/master/index.js  
	    https://github.com/gre/bezier-easing/blob/master/LICENSE
	*/
	"use strict";

	var Easing = __webpack_require__(40),
	    easingFunction,

	// Generate easing function with provided power
	generatePowerEasing = function generatePowerEasing(power) {
	    return function (progress) {
	        return Math.pow(progress, power);
	    };
	},

	/*
	    Each of these base functions is an easeIn
	    
	    On init, we use EasingFunction.mirror and .reverse to generate easeInOut and
	    easeOut functions respectively.
	*/
	baseEasing = {
	    circ: function circ(progress) {
	        return 1 - Math.sin(Math.acos(progress));
	    },
	    back: function back(progress) {
	        var strength = 1.5;

	        return progress * progress * ((strength + 1) * progress - strength);
	    }
	};

	// Generate power easing easing
	['ease', 'cubic', 'quart', 'quint'].forEach(function (easingName, i) {
	    baseEasing[easingName] = generatePowerEasing(i + 2);
	});

	// Generate in/out/inOut variations
	for (var key in baseEasing) {
	    if (baseEasing.hasOwnProperty(key)) {
	        easingFunction = new Easing(baseEasing[key]);
	        baseEasing[key + 'In'] = easingFunction['in'];
	        baseEasing[key + 'Out'] = easingFunction.out;
	        baseEasing[key + 'InOut'] = easingFunction.inOut;
	    }
	}

	/*
	    Linear easing adjustment
	    
	    The default easing method, not added with .extend as it has no Out or InOut
	    variation.
	    
	    @param [number]: Progress, from 0-1
	    @return [number]: Unadjusted progress
	*/
	baseEasing.linear = function (progress) {
	    return progress;
	};

	module.exports = baseEasing;

/***/ },
/* 40 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var Bezier = __webpack_require__(41),

	/*
	    Mirror easing
	    
	    Mirrors the provided easing function, used here for mirroring an
	    easeIn into an easeInOut
	    
	    @param [number]: Progress, from 0 - 1, of current shift
	    @param [function]: The easing function to mirror
	    @returns [number]: The easing-adjusted delta
	*/
	mirrorEasing = function mirrorEasing(progress, method) {
	    return progress <= 0.5 ? method(2 * progress) / 2 : (2 - method(2 * (1 - progress))) / 2;
	},

	/*
	    Reverse easing
	    
	    Reverses the output of the provided easing function, used for flipping easeIn
	    curve to an easeOut.
	    
	    @param [number]: Progress, from 0 - 1, of current shift
	    @param [function]: The easing function to reverse
	    @returns [number]: The easing-adjusted delta
	*/
	reverseEasing = function reverseEasing(progress, method) {
	    return 1 - method(1 - progress);
	};

	/*
	    Easing class

	    If provided easing function, returns easing function with 
	    in/out/inOut variations

	    If provided four arguments, returns new Bezier class instead.
	*/
	var Easing = function Easing(x1, y1, x2, y2) {
	    var method = x1,
	        easingFunction;

	    // If this is a bezier curve, return a bezier function
	    if (arguments.length > 1) {
	        easingFunction = new Bezier(x1, y1, x2, y2);
	    } else {
	        easingFunction = function (progress) {
	            return method(progress);
	        };

	        easingFunction['in'] = function (progress) {
	            return method(progress);
	        };

	        easingFunction.out = function (progress) {
	            return reverseEasing(progress, method);
	        };

	        easingFunction.inOut = function (progress) {
	            return mirrorEasing(progress, method);
	        };
	    }

	    return easingFunction;
	};

	module.exports = Easing;

/***/ },
/* 41 */
/***/ function(module, exports) {

	/*
	    Bezier function generator
	        
	    Gaëtan Renaudeau's BezierEasing
	    https://github.com/gre/bezier-easing/blob/master/index.js  
	    https://github.com/gre/bezier-easing/blob/master/LICENSE
	    You're a hero
	    
	    Use
	    
	        var easeOut = new Bezier(.17,.67,.83,.67),
	            x = easeOut(0.5); // returns 0.627...
	*/
	"use strict";

	var NEWTON_ITERATIONS = 8,
	    NEWTON_MIN_SLOPE = 0.001,
	    SUBDIVISION_PRECISION = 0.0000001,
	    SUBDIVISION_MAX_ITERATIONS = 10,
	    K_SPLINE_TABLE_SIZE = 11,
	    K_SAMPLE_STEP_SIZE = 1.0 / (K_SPLINE_TABLE_SIZE - 1.0),
	    FLOAT_32_SUPPORTED = typeof Float32Array !== 'undefined',
	    a = function a(a1, a2) {
	    return 1.0 - 3.0 * a2 + 3.0 * a1;
	},
	    b = function b(a1, a2) {
	    return 3.0 * a2 - 6.0 * a1;
	},
	    c = function c(a1) {
	    return 3.0 * a1;
	},
	    getSlope = function getSlope(t, a1, a2) {
	    return 3.0 * a(a1, a2) * t * t + 2.0 * b(a1, a2) * t + c(a1);
	},
	    calcBezier = function calcBezier(t, a1, a2) {
	    return ((a(a1, a2) * t + b(a1, a2)) * t + c(a1)) * t;
	},

	/*
	    Bezier constructor
	*/
	Bezier = function Bezier(mX1, mY1, mX2, mY2) {
	    var sampleValues = FLOAT_32_SUPPORTED ? new Float32Array(K_SPLINE_TABLE_SIZE) : new Array(K_SPLINE_TABLE_SIZE),
	        _precomputed = false,
	        binarySubdivide = function binarySubdivide(aX, aA, aB) {
	        var currentX,
	            currentT,
	            i = 0;

	        do {
	            currentT = aA + (aB - aA) / 2.0;
	            currentX = calcBezier(currentT, mX1, mX2) - aX;
	            if (currentX > 0.0) {
	                aB = currentT;
	            } else {
	                aA = currentT;
	            }
	        } while (Math.abs(currentX) > SUBDIVISION_PRECISION && ++i < SUBDIVISION_MAX_ITERATIONS);

	        return currentT;
	    },
	        newtonRaphsonIterate = function newtonRaphsonIterate(aX, aGuessT) {
	        var i = 0,
	            currentSlope = 0.0,
	            currentX;

	        for (; i < NEWTON_ITERATIONS; ++i) {
	            currentSlope = getSlope(aGuessT, mX1, mX2);

	            if (currentSlope === 0.0) {
	                return aGuessT;
	            }

	            currentX = calcBezier(aGuessT, mX1, mX2) - aX;
	            aGuessT -= currentX / currentSlope;
	        }

	        return aGuessT;
	    },
	        calcSampleValues = function calcSampleValues() {
	        for (var i = 0; i < K_SPLINE_TABLE_SIZE; ++i) {
	            sampleValues[i] = calcBezier(i * K_SAMPLE_STEP_SIZE, mX1, mX2);
	        }
	    },
	        getTForX = function getTForX(aX) {
	        var intervalStart = 0.0,
	            currentSample = 1,
	            lastSample = K_SPLINE_TABLE_SIZE - 1,
	            dist = 0.0,
	            guessForT = 0.0,
	            initialSlope = 0.0;

	        for (; currentSample != lastSample && sampleValues[currentSample] <= aX; ++currentSample) {
	            intervalStart += K_SAMPLE_STEP_SIZE;
	        }

	        --currentSample;

	        dist = (aX - sampleValues[currentSample]) / (sampleValues[currentSample + 1] - sampleValues[currentSample]);
	        guessForT = intervalStart + dist * K_SAMPLE_STEP_SIZE;

	        initialSlope = getSlope(guessForT, mX1, mX2);

	        // If slope is greater than min
	        if (initialSlope >= NEWTON_MIN_SLOPE) {
	            return newtonRaphsonIterate(aX, guessForT);
	            // Slope is equal to min
	        } else if (initialSlope === 0.0) {
	                return guessForT;
	                // Slope is less than min
	            } else {
	                    return binarySubdivide(aX, intervalStart, intervalStart + K_SAMPLE_STEP_SIZE);
	                }
	    },
	        precompute = function precompute() {
	        _precomputed = true;
	        if (mX1 != mY1 || mX2 != mY2) {
	            calcSampleValues();
	        }
	    },

	    /*
	        Generated function
	        
	        Returns value 0-1 based on X
	    */
	    f = function f(aX) {
	        var returnValue;

	        if (!_precomputed) {
	            precompute();
	        }

	        // If linear gradient, return X as T
	        if (mX1 === mY1 && mX2 === mY2) {
	            returnValue = aX;

	            // If at start, return 0
	        } else if (aX === 0) {
	                returnValue = 0;

	                // If at end, return 1
	            } else if (aX === 1) {
	                    returnValue = 1;
	                } else {
	                    returnValue = calcBezier(getTForX(aX), mY1, mY2);
	                }

	        return returnValue;
	    };

	    return f;
	};

	module.exports = Bezier;

/***/ },
/* 42 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

	var _get = function get(_x, _x2, _x3) { var _again = true; _function: while (_again) { var object = _x, property = _x2, receiver = _x3; desc = parent = getter = undefined; _again = false; if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { _x = parent; _x2 = property; _x3 = receiver; _again = true; continue _function; } } else if ('value' in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } } };

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

	function _inherits(subClass, superClass) { if (typeof superClass !== 'function' && superClass !== null) { throw new TypeError('Super expression must either be null or a function, not ' + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) subClass.__proto__ = superClass; }

	var Controls = __webpack_require__(18);

	var TweenControls = (function (_Controls) {
	    _inherits(TweenControls, _Controls);

	    function TweenControls() {
	        _classCallCheck(this, TweenControls);

	        _get(Object.getPrototypeOf(TweenControls.prototype), 'constructor', this).apply(this, arguments);
	    }

	    _createClass(TweenControls, [{
	        key: 'restart',
	        value: function restart() {
	            this.action.restart();
	            return this;
	        }
	    }, {
	        key: 'reverse',
	        value: function reverse() {
	            this.action.reverse();
	            return this;
	        }
	    }, {
	        key: 'seek',
	        value: function seek(progress) {
	            if (!this.actor.hasAction(this.id)) {
	                this.start().pause();
	            }

	            this.action.elapsed = this.action.duration * progress;

	            if (!this.action.isActive) {
	                this.action.activate();
	                this.actor.process.fire();
	                this.action.deactivate();
	            }

	            return this;
	        }
	    }]);

	    return TweenControls;
	})(Controls);

	module.exports = TweenControls;

/***/ },
/* 43 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

	var _get = function get(_x, _x2, _x3) { var _again = true; _function: while (_again) { var object = _x, property = _x2, receiver = _x3; desc = parent = getter = undefined; _again = false; if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { _x = parent; _x2 = property; _x3 = receiver; _again = true; continue _function; } } else if ('value' in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } } };

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

	function _inherits(subClass, superClass) { if (typeof superClass !== 'function' && superClass !== null) { throw new TypeError('Super expression must either be null or a function, not ' + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) subClass.__proto__ = superClass; }

	var Action = __webpack_require__(17),
	    calc = __webpack_require__(16),
	    utils = __webpack_require__(12),
	    simulations = __webpack_require__(44);

	var DEFAULT_PROP = 'velocity';

	var Simulate = (function (_Action) {
	    _inherits(Simulate, _Action);

	    function Simulate() {
	        _classCallCheck(this, Simulate);

	        for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
	            args[_key] = arguments[_key];
	        }

	        _get(Object.getPrototypeOf(Simulate.prototype), 'constructor', this).apply(this, args);
	        this.calculatesVelocity = true;
	        this.inactiveFrames = 0;
	    }

	    _createClass(Simulate, [{
	        key: 'getDefaultProps',
	        value: function getDefaultProps() {
	            return {
	                maxInactiveFrames: 3
	            };
	        }
	    }, {
	        key: 'getDefaultValue',
	        value: function getDefaultValue() {
	            return {
	                // [string]: Simulation to .run
	                simulate: DEFAULT_PROP,

	                // [number]: Deceleration to apply to value, in units per second
	                deceleration: 0,

	                // [number]: Acceleration to apply to value, in units per second
	                acceleration: 0,

	                // [number]: Factor to multiply velocity by on bounce
	                bounce: 0,

	                // [number]: Spring strength during 'string'
	                spring: 80,

	                // [number]: Timeconstant of glide
	                timeConstant: 395,

	                // [number]: Stop simulation under this speed
	                stopSpeed: 5,

	                // [boolean]: Capture with spring physics on limit breach
	                capture: false,

	                // [number]: Friction to apply per frame
	                friction: 0,

	                to: 0,
	                round: false
	            };
	        }
	    }, {
	        key: 'getDefaultValueProp',
	        value: function getDefaultValueProp() {
	            return DEFAULT_PROP;
	        }

	        /*
	            Simulate the Value's per-frame movement
	            
	            @param [Actor]
	            @param [Value]: Current value
	            @param [string]: Key of current value
	            @param [number]: Duration of frame in ms
	            @return [number]: Calculated value
	        */
	    }, {
	        key: 'process',
	        value: function process(actor, value, key, timeSinceLastFrame) {
	            var simulate = value.simulate,
	                simulation = utils.isString(simulate) ? simulations[simulate] : simulate,
	                newVelocity = simulation ? simulation(value, timeSinceLastFrame, actor.started) : 0;

	            value.velocity = Math.abs(newVelocity) >= value.stopSpeed ? newVelocity : 0;
	            return value.current + calc.speedPerFrame(value.velocity, timeSinceLastFrame);
	        }

	        /*
	            Has this action ended?
	            
	            Use a framecounter to see if Action has changed in the last x frames
	            and declare ended if not
	            
	            @param [Actor]
	            @param [boolean]: Has Action changed?
	            @return [boolean]: Has Action ended?
	        */
	    }, {
	        key: 'hasEnded',
	        value: function hasEnded(actor, hasChanged) {
	            this.inactiveFrames = hasChanged ? 0 : this.inactiveFrames + 1;
	            return this.inactiveFrames > actor.maxInactiveFrames;
	        }

	        /*
	            Limit output to value range, if any
	            
	            If velocity is at or more than range, and value has a bounce property,
	            run the bounce simulation
	            
	            @param [number]: Calculated output
	            @param [Value]: Current Value
	            @return [number]: Limit-adjusted output
	        */
	    }, {
	        key: 'limit',
	        value: function limit(output, value) {
	            var isOutsideMax = output >= value.max,
	                isOutsideMin = output <= value.min,
	                isOutsideRange = isOutsideMax || isOutsideMin;

	            if (isOutsideRange) {
	                output = calc.restricted(output, value.min, value.max);

	                if (value.bounce) {
	                    value.velocity = simulations.bounce(value);
	                } else if (value.capture) {
	                    simulations.capture(value, isOutsideMax ? value.max : value.min);
	                }
	            }

	            return output;
	        }
	    }]);

	    return Simulate;
	})(Action);

	module.exports = Simulate;

/***/ },
/* 44 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";

	var calc = __webpack_require__(16),
	    utils = __webpack_require__(12),
	    speedPerFrame = calc.speedPerFrame;

	/*
	    Add core physics simulations
	*/
	var simulations = {
	    /*
	        Velocity
	        
	        The default .run() simulation.
	        
	        Applies any set deceleration and acceleration to existing velocity
	    */
	    velocity: function velocity(value, duration) {
	        value.velocity = value.velocity - speedPerFrame(value.deceleration, duration) + speedPerFrame(value.acceleration, duration);

	        return simulations.friction(value, duration);
	    },

	    /*
	        Glide
	        
	        Emulates touch device scrolling effects with exponential decay
	        http://ariya.ofilabs.com/2013/11/javascript-kinetic-scrolling-part-2.html
	    */
	    glide: function glide(value, duration, started) {
	        var timeUntilFinished = -utils.currentTime() - started,
	            delta = -value.to * Math.exp(timeUntilFinished / value.timeConstant);

	        return value.to + delta - value.current;
	    },

	    /*
	        Friction
	         Apply friction to the current value
	        TODO: Make this framerate-independent
	    */
	    friction: function friction(value, duration) {
	        var newVelocity = speedPerFrame(value.velocity, duration) * (1 - value.friction);

	        return calc.speedPerSecond(newVelocity, duration);
	    },

	    spring: function spring(value, duration) {
	        var distance = value.to - value.current;

	        value.velocity += distance * speedPerFrame(value.spring, duration);

	        return simulations.friction(value, duration);
	    },

	    bounce: function bounce(value) {
	        var distance = 0,
	            to = value.to,
	            current = value.current,
	            bounce = value.bounce;

	        // If we're using glide simulation we have to flip our target too
	        if (value.simulate === 'glide') {
	            distance = to - current;
	            value.to = current - distance * bounce;
	        }

	        return value.velocity *= -bounce;
	    },

	    capture: function capture(value, target) {
	        value.to = target;
	        value.simulate = 'spring';
	        value.capture = value.min = value.max = undefined;
	    }
	};

	module.exports = simulations;

/***/ },
/* 45 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

	var _get = function get(_x, _x2, _x3) { var _again = true; _function: while (_again) { var object = _x, property = _x2, receiver = _x3; desc = parent = getter = undefined; _again = false; if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { _x = parent; _x2 = property; _x3 = receiver; _again = true; continue _function; } } else if ('value' in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } } };

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

	function _inherits(subClass, superClass) { if (typeof superClass !== 'function' && superClass !== null) { throw new TypeError('Super expression must either be null or a function, not ' + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) subClass.__proto__ = superClass; }

	var Action = __webpack_require__(17),
	    Pointer = __webpack_require__(46),
	    calc = __webpack_require__(16);

	var Track = (function (_Action) {
	    _inherits(Track, _Action);

	    function Track() {
	        _classCallCheck(this, Track);

	        _get(Object.getPrototypeOf(Track.prototype), 'constructor', this).apply(this, arguments);
	    }

	    _createClass(Track, [{
	        key: 'onFrameStart',

	        /*
	            Update input offset
	        */
	        value: function onFrameStart(actor, frameDuration, framestamp) {
	            actor.state.input = this.input.onFrame(framestamp);
	            this.inputOffset = calc.offset(this.inputOrigin, this.input.current);
	        }

	        /*
	            Move Value relative to Input movement
	            
	            @param [Value]: Current value
	            @param [string]: Key of current value
	            @return [number]: Calculated value
	        */
	    }, {
	        key: 'process',
	        value: function process(actor, value, key) {
	            return this.inputOffset.hasOwnProperty(key) ? value.origin + this.inputOffset[key] : value.current;
	        }

	        /*
	            Has this Action ended? 
	            
	            @return [boolean]: False to make user manually finish .track()
	        */
	    }, {
	        key: 'hasEnded',
	        value: function hasEnded() {
	            return false;
	        }
	    }, {
	        key: 'bindInput',
	        value: function bindInput(input) {
	            this.input = !input.current ? new Pointer(input) : input;
	            this.inputOrigin = this.input.get();
	        }
	    }, {
	        key: 'getDefaultValue',
	        value: function getDefaultValue() {
	            return {
	                amp: 1
	            };
	        }
	    }]);

	    return Track;
	})(Action);

	module.exports = Track;

/***/ },
/* 46 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";

	var Input = __webpack_require__(35),
	    currentPointer,
	    // Sort this out for multitouch

	TOUCHMOVE = 'touchmove',
	    MOUSEMOVE = 'mousemove',

	/*
	    Convert event into point
	    
	    Scrape the x/y coordinates from the provided event
	    
	    @param [event]: Original pointer event
	    @param [boolean]: True if touch event
	    @return [object]: x/y coordinates of event
	*/
	eventToPoint = function eventToPoint(event, isTouchEvent) {
	    var touchChanged = isTouchEvent ? event.changedTouches[0] : false;

	    return {
	        x: touchChanged ? touchChanged.clientX : event.pageX,
	        y: touchChanged ? touchChanged.clientY : event.pageY
	    };
	},

	/*
	    Get actual event
	    
	    Checks for jQuery's .originalEvent if present
	    
	    @param [event | jQuery event]
	    @return [event]: The actual JS event  
	*/
	getActualEvent = function getActualEvent(event) {
	    return event.originalEvent || event;
	},

	/*
	    Pointer constructor
	*/
	Pointer = function Pointer(e) {
	    var event = getActualEvent(e),
	        // In case of jQuery event
	    isTouch = event.touches ? true : false,
	        startPoint = eventToPoint(event, isTouch);

	    this.update(startPoint);
	    this.isTouch = isTouch;
	    this.bindEvents();
	},
	    proto = Pointer.prototype = new Input();

	/*
	    Bind move event
	*/
	proto.bindEvents = function () {
	    this.moveEvent = this.isTouch ? TOUCHMOVE : MOUSEMOVE;

	    currentPointer = this;

	    document.documentElement.addEventListener(this.moveEvent, this.onMove);
	};

	/*
	    Unbind move event
	*/
	proto.unbindEvents = function () {
	    document.documentElement.removeEventListener(this.moveEvent, this.onMove);
	};

	/*
	    Pointer onMove event handler
	    
	    @param [event]: Pointer move event
	*/
	proto.onMove = function (e) {
	    var newPoint = eventToPoint(e, currentPointer.isTouch);
	    e = getActualEvent(e);
	    e.preventDefault();
	    currentPointer.update(newPoint);
	};

	proto.stop = function () {
	    this.unbindEvents();
	};

	module.exports = Pointer;

/***/ },
/* 47 */
/***/ function(module, exports) {

	"use strict";

	module.exports = {
	    defaultProps: {
	        min: 0,
	        max: 1
	    }
	};

/***/ },
/* 48 */
/***/ function(module, exports) {

	'use strict';

	module.exports = {
	    defaultProps: {
	        unit: 'deg'
	    }
	};

/***/ },
/* 49 */
/***/ function(module, exports) {

	'use strict';

	module.exports = {
	    defaultProps: {
	        unit: 'px'
	    }
	};

/***/ },
/* 50 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";

	var createDelimited = __webpack_require__(51),
	    getColorValues = __webpack_require__(52),
	    functionCreate = __webpack_require__(55),
	    defaultProps = __webpack_require__(56),
	    terms = __webpack_require__(26).hsl;

	module.exports = {

	    defaultProps: {
	        Hue: {
	            min: 0,
	            max: 360
	        },
	        Saturation: defaultProps.percent,
	        Lightness: defaultProps.percent,
	        Alpha: defaultProps.opacity
	    },

	    test: function test(value) {
	        return value && value.indexOf('hsl') > -1;
	    },

	    split: function split(value) {
	        return getColorValues(value, terms);
	    },

	    combine: function combine(values) {
	        return functionCreate(createDelimited(values, terms, ', ', 2), 'hsla');
	    }
	};

/***/ },
/* 51 */
/***/ function(module, exports) {

	"use strict";

	module.exports = function (values, terms, delimiter, chop) {
	    var combined = '',
	        key = '',
	        i = 0,
	        numTerms = terms.length;

	    for (; i < numTerms; i++) {
	        key = terms[i];

	        if (values.hasOwnProperty(key)) {
	            combined += values[key] + delimiter;
	        }
	    }

	    if (chop) {
	        combined = combined.slice(0, -chop);
	    }

	    return combined;
	};

/***/ },
/* 52 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var splitCommaDelimited = __webpack_require__(53),
	    functionBreak = __webpack_require__(54);

	module.exports = function (value, terms) {
	    var splitValue = {},
	        numTerms = terms.length,
	        colors = splitCommaDelimited(functionBreak(value)),
	        i = 0;

	    for (; i < numTerms; i++) {
	        splitValue[terms[i]] = colors[i] !== undefined ? colors[i] : 1;
	    }

	    return splitValue;
	};

/***/ },
/* 53 */
/***/ function(module, exports) {

	'use strict';

	module.exports = function (value) {
	    return typeof value === 'string' ? value.split(/,\s*/) : [value];
	};

/***/ },
/* 54 */
/***/ function(module, exports) {

	'use strict';

	module.exports = function (value) {
	    return value.substring(value.indexOf('(') + 1, value.lastIndexOf(')'));
	};

/***/ },
/* 55 */
/***/ function(module, exports) {

	'use strict';

	module.exports = function (value, prefix) {
	    return prefix + '(' + value + ')';
	};

/***/ },
/* 56 */
/***/ function(module, exports) {

	"use strict";

	module.exports = {
	    color: {
	        min: 0,
	        max: 255,
	        round: true
	    },
	    opacity: {
	        min: 0,
	        max: 1
	    },
	    percent: {
	        min: 0,
	        max: 100,
	        unit: '%'
	    }
	};

/***/ },
/* 57 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";

	var createDelimited = __webpack_require__(51),
	    getColorValues = __webpack_require__(52),
	    functionCreate = __webpack_require__(55),
	    defaultProps = __webpack_require__(56),
	    colorDefaults = defaultProps.color,
	    terms = __webpack_require__(26).colors;

	module.exports = {

	    defaultProps: {
	        Red: colorDefaults,
	        Green: colorDefaults,
	        Blue: colorDefaults,
	        Alpha: defaultProps.opacity
	    },

	    test: function test(value) {
	        return value && value.indexOf('rgb') > -1;
	    },

	    split: function split(value) {
	        return getColorValues(value, terms);
	    },

	    combine: function combine(values) {
	        return functionCreate(createDelimited(values, terms, ', ', 2), 'rgba');
	    }
	};

/***/ },
/* 58 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";

	var rgb = __webpack_require__(57);

	module.exports = {

	    defaultProps: rgb.defaultProps,

	    test: function test(value) {
	        return value && value.indexOf('#') > -1;
	    },

	    split: function split(value) {
	        var r, g, b;

	        // If we have 6 characters, ie #FF0000
	        if (value.length > 4) {
	            r = value.substr(1, 2);
	            g = value.substr(3, 2);
	            b = value.substr(5, 2);

	            // Or we have 3 characters, ie #F00
	        } else {
	                r = value.substr(1, 1);
	                g = value.substr(2, 1);
	                b = value.substr(3, 1);
	                r += r;
	                g += g;
	                b += b;
	            }

	        return {
	            Red: parseInt(r, 16),
	            Green: parseInt(g, 16),
	            Blue: parseInt(b, 16),
	            Alpha: 1
	        };
	    },

	    combine: function combine(values) {
	        return rgb.combine(values);
	    }
	};

/***/ },
/* 59 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";

	var utils = __webpack_require__(12),
	    rgb = __webpack_require__(57),
	    hsl = __webpack_require__(50),
	    hex = __webpack_require__(58),
	    supported = [rgb, hsl, hex],
	    numSupported = 3,
	    runSupported = function runSupported(method, value) {
	    for (var i = 0; i < numSupported; i++) {
	        if (supported[i].test(value)) {
	            return supported[i][method](value);
	        }
	    }
	};

	module.exports = {

	    defaultProps: utils.merge(rgb.defaultProps, hsl.defaultProps),

	    test: function test(value) {
	        return rgb.test(value) || hex.test(value) || hsl.test(value);
	    },

	    split: function split(value) {
	        return runSupported('split', value);
	    },

	    combine: function combine(values) {
	        return values.Red !== undefined ? rgb.combine(values) : hsl.combine(values);
	    }
	};

/***/ },
/* 60 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";

	var createDelimited = __webpack_require__(51),
	    pxDefaults = __webpack_require__(49).defaultProps,
	    splitSpaceDelimited = __webpack_require__(61),
	    terms = __webpack_require__(26).positions;

	module.exports = {

	    defaultProps: pxDefaults,

	    /*
	        Split positions in format "X Y Z"
	        
	        @param [string]: Position values
	            "20% 30% 0" -> {20%, 30%, 0}
	            "20% 30%" -> {20%, 30%}
	            "20%" -> {20%, 20%}
	    */
	    split: function split(value) {
	        var positions = splitSpaceDelimited(value),
	            numPositions = positions.length,
	            splitValue = {
	            X: positions[0],
	            Y: numPositions > 1 ? positions[1] : positions[0]
	        };

	        if (numPositions > 2) {
	            splitValue.Z = positions[2];
	        }

	        return splitValue;
	    },

	    combine: function combine(values) {
	        return createDelimited(values, terms, ' ');
	    }
	};

/***/ },
/* 61 */
/***/ function(module, exports) {

	'use strict';

	module.exports = function (value) {
	    return typeof value === 'string' ? value.split(' ') : [value];
	};

/***/ },
/* 62 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";

	var terms = __webpack_require__(26).dimensions,
	    pxDefaults = __webpack_require__(49).defaultProps,
	    createDelimited = __webpack_require__(51),
	    splitSpaceDelimited = __webpack_require__(61);

	module.exports = {

	    defaultProps: pxDefaults,

	    /*
	        Split dimensions in format "Top Right Bottom Left"
	        
	        @param [string]: Dimension values
	            "20px 0 30px 40px" -> {20px, 0, 30px, 40px}
	            "20px 0 30px" -> {20px, 0, 30px, 0}
	            "20px 0" -> {20px, 0, 20px, 0}
	            "20px" -> {20px, 20px, 20px, 20px}
	        
	        @return [object]: Object with T/R/B/L metrics
	    */
	    split: function split(value) {
	        var dimensions = splitSpaceDelimited(value),
	            numDimensions = dimensions.length,
	            jumpBack = numDimensions !== 1 ? 2 : 1,
	            i = 0,
	            j = 0,
	            splitValue = {};

	        for (; i < 4; i++) {
	            splitValue[terms[i]] = dimensions[j];

	            // Jump back (to start) counter if we've reached the end of our values
	            j++;
	            j = j === numDimensions ? j - jumpBack : j;
	        }

	        return splitValue;
	    },

	    combine: function combine(values) {
	        return createDelimited(values, terms, ' ');
	    }
	};

/***/ },
/* 63 */
/***/ function(module, exports) {

	"use strict";

	module.exports = {
	    defaultProps: {
	        init: 1
	    }
	};

/***/ },
/* 64 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";

	var color = __webpack_require__(59),
	    utils = __webpack_require__(12),
	    pxDefaults = __webpack_require__(49).defaultProps,
	    terms = __webpack_require__(26).shadow,
	    splitSpaceDelimited = __webpack_require__(61),
	    createDelimited = __webpack_require__(51),
	    shadowTerms = terms.slice(0, 4);

	module.exports = {

	    defaultProps: utils.merge(color.defaultProps, {
	        X: pxDefaults,
	        Y: pxDefaults,
	        Radius: pxDefaults,
	        Spread: pxDefaults
	    }),

	    /*
	        Split shadow properties "X Y Radius Spread Color"
	        
	        @param [string]: Shadow property
	        @return [object]
	    */
	    split: function split(value) {
	        var bits = splitSpaceDelimited(value),
	            numBits = bits.length,
	            hasReachedColor = false,
	            colorProp = '',
	            thisBit,
	            i = 0,
	            splitValue = {};

	        for (; i < numBits; i++) {
	            thisBit = bits[i];

	            // If we've reached the color property, append to color string
	            if (hasReachedColor || color.test(thisBit)) {
	                hasReachedColor = true;
	                colorProp += thisBit;
	            } else {
	                splitValue[terms[i]] = thisBit;
	            }
	        }

	        return utils.merge(splitValue, color.split(colorProp));
	    },

	    combine: function combine(values) {
	        return createDelimited(values, shadowTerms, ' ') + color.combine(values);
	    }
	};

/***/ },
/* 65 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var utils = __webpack_require__(12),
	    each = utils.each,
	    floatRegex = /(-)?(\d[\d\.]*)/g,
	    generateToken = function generateToken(key) {
	    return '${' + key + '}';
	};

	module.exports = {
	    test: function test(value) {
	        var matches = value.match(floatRegex);
	        return utils.isArray(matches) && matches.length > 1;
	    },

	    template: function template(value) {
	        var counter = 0;
	        return value.replace(floatRegex, function () {
	            return generateToken(counter++);
	        });
	    },

	    split: function split(value) {
	        var splitValue = {},
	            matches = value.match(floatRegex),
	            numMatches = matches.length;

	        for (var i = 0; i < numMatches; i++) {
	            splitValue[i] = matches[i];
	        }

	        return splitValue;
	    },

	    combine: function combine(values, template) {
	        var combinedValue = template;

	        each(values, function (key, value) {
	            combinedValue = combinedValue.replace(generateToken(key), value);
	        });

	        return combinedValue;
	    }
	};

/***/ },
/* 66 */
/***/ function(module, exports) {

	// Generated by CoffeeScript 1.9.3

	/*
	jQuery Growl
	Copyright 2015 Kevin Sylvestre
	1.3.1
	 */

	(function() {
	  "use strict";
	  var $, Animation, Growl,
	    bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; };

	  $ = jQuery;

	  Animation = (function() {
	    function Animation() {}

	    Animation.transitions = {
	      "webkitTransition": "webkitTransitionEnd",
	      "mozTransition": "mozTransitionEnd",
	      "oTransition": "oTransitionEnd",
	      "transition": "transitionend"
	    };

	    Animation.transition = function($el) {
	      var el, ref, result, type;
	      el = $el[0];
	      ref = this.transitions;
	      for (type in ref) {
	        result = ref[type];
	        if (el.style[type] != null) {
	          return result;
	        }
	      }
	    };

	    return Animation;

	  })();

	  Growl = (function() {
	    Growl.settings = {
	      namespace: 'growl',
	      duration: 3200,
	      close: "&#215;",
	      location: "default",
	      style: "default",
	      size: "medium"
	    };

	    Growl.growl = function(settings) {
	      if (settings == null) {
	        settings = {};
	      }
	      this.initialize();
	      return new Growl(settings);
	    };

	    Growl.initialize = function() {
	      return $("body:not(:has(#growls))").append('<div id="growls" />');
	    };

	    function Growl(settings) {
	      if (settings == null) {
	        settings = {};
	      }
	      this.container = bind(this.container, this);
	      this.content = bind(this.content, this);
	      this.html = bind(this.html, this);
	      this.$growl = bind(this.$growl, this);
	      this.$growls = bind(this.$growls, this);
	      this.animate = bind(this.animate, this);
	      this.remove = bind(this.remove, this);
	      this.dismiss = bind(this.dismiss, this);
	      this.present = bind(this.present, this);
	      this.cycle = bind(this.cycle, this);
	      this.close = bind(this.close, this);
	      this.click = bind(this.click, this);
	      this.unbind = bind(this.unbind, this);
	      this.bind = bind(this.bind, this);
	      this.render = bind(this.render, this);
	      this.settings = $.extend({}, Growl.settings, settings);
	      this.$growls().attr('class', this.settings.location);
	      this.render();
	    }

	    Growl.prototype.render = function() {
	      var $growl;
	      $growl = this.$growl();
	      this.$growls().append($growl);
	      if (this.settings.fixed) {
	        this.present();
	      } else {
	        this.cycle();
	      }
	    };

	    Growl.prototype.bind = function($growl) {
	      if ($growl == null) {
	        $growl = this.$growl();
	      }
	      $growl.on("click", this.click);
	      return $growl.on("contextmenu", this.close).find("." + this.settings.namespace + "-close").on("click", this.close);
	    };

	    Growl.prototype.unbind = function($growl) {
	      if ($growl == null) {
	        $growl = this.$growl();
	      }
	      $growl.off("click", this.click);
	      return $growl.off("contextmenu", this.close).find("." + this.settings.namespace + "-close").off("click", this.close);
	    };

	    Growl.prototype.click = function(event) {
	      if (this.settings.url != null) {
	        event.preventDefault();
	        event.stopPropagation();
	        return window.open(this.settings.url);
	      }
	    };

	    Growl.prototype.close = function(event) {
	      var $growl;
	      event.preventDefault();
	      event.stopPropagation();
	      $growl = this.$growl();
	      return $growl.stop().queue(this.dismiss).queue(this.remove);
	    };

	    Growl.prototype.cycle = function() {
	      var $growl;
	      $growl = this.$growl();
	      return $growl.queue(this.present).delay(this.settings.duration).queue(this.dismiss).queue(this.remove);
	    };

	    Growl.prototype.present = function(callback) {
	      var $growl;
	      $growl = this.$growl();
	      this.bind($growl);
	      return this.animate($growl, this.settings.namespace + "-incoming", 'out', callback);
	    };

	    Growl.prototype.dismiss = function(callback) {
	      var $growl;
	      $growl = this.$growl();
	      this.unbind($growl);
	      return this.animate($growl, this.settings.namespace + "-outgoing", 'in', callback);
	    };

	    Growl.prototype.remove = function(callback) {
	      this.$growl().remove();
	      return callback();
	    };

	    Growl.prototype.animate = function($element, name, direction, callback) {
	      var transition;
	      if (direction == null) {
	        direction = 'in';
	      }
	      transition = Animation.transition($element);
	      $element[direction === 'in' ? 'removeClass' : 'addClass'](name);
	      $element.offset().position;
	      $element[direction === 'in' ? 'addClass' : 'removeClass'](name);
	      if (callback == null) {
	        return;
	      }
	      if (transition != null) {
	        $element.one(transition, callback);
	      } else {
	        callback();
	      }
	    };

	    Growl.prototype.$growls = function() {
	      return this.$_growls != null ? this.$_growls : this.$_growls = $('#growls');
	    };

	    Growl.prototype.$growl = function() {
	      return this.$_growl != null ? this.$_growl : this.$_growl = $(this.html());
	    };

	    Growl.prototype.html = function() {
	      return this.container(this.content());
	    };

	    Growl.prototype.content = function() {
	      return "<div class='" + this.settings.namespace + "-close'>" + this.settings.close + "</div>\n<div class='" + this.settings.namespace + "-title'>" + this.settings.title + "</div>\n<div class='" + this.settings.namespace + "-message'>" + this.settings.message + "</div>";
	    };

	    Growl.prototype.container = function(content) {
	      return "<div class='" + this.settings.namespace + " " + this.settings.namespace + "-" + this.settings.style + " " + this.settings.namespace + "-" + this.settings.size + "'>\n  " + content + "\n</div>";
	    };

	    return Growl;

	  })();

	  this.Growl = Growl;

	  $.growl = function(options) {
	    if (options == null) {
	      options = {};
	    }
	    return Growl.growl(options);
	  };

	  $.growl.error = function(options) {
	    var settings;
	    if (options == null) {
	      options = {};
	    }
	    settings = {
	      title: "Error!",
	      style: "error"
	    };
	    return $.growl($.extend(settings, options));
	  };

	  $.growl.notice = function(options) {
	    var settings;
	    if (options == null) {
	      options = {};
	    }
	    settings = {
	      title: "Notice!",
	      style: "notice"
	    };
	    return $.growl($.extend(settings, options));
	  };

	  $.growl.warning = function(options) {
	    var settings;
	    if (options == null) {
	      options = {};
	    }
	    settings = {
	      title: "Warning!",
	      style: "warning"
	    };
	    return $.growl($.extend(settings, options));
	  };

	}).call(this);


/***/ },
/* 67 */
/***/ function(module, exports) {

	'use strict';

	Object.defineProperty(exports, '__esModule', {
	  value: true
	});

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

	var Trophies = function Trophies() {
	  _classCallCheck(this, Trophies);

	  $(".card").flip({
	    axis: 'y',
	    trigger: 'hover'
	  });
	};

	exports['default'] = {
	  init: function init() {
	    new Trophies();
	  }
	};
	module.exports = exports['default'];

/***/ },
/* 68 */
/***/ function(module, exports) {

	'use strict';

	Object.defineProperty(exports, '__esModule', {
	  value: true
	});

	var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

	var Nav = (function () {
	  function Nav() {
	    _classCallCheck(this, Nav);

	    this.initTrophiesNav();
	    this.initGameNav();
	  }

	  _createClass(Nav, [{
	    key: 'initTrophiesNav',
	    value: function initTrophiesNav() {
	      $('.trophies-nav').click(function () {
	        $('#game-wrapper').removeClass('game-body').addClass('trophies-body');
	        $('.game-nav').fadeIn("slow");
	        $(this).fadeOut("slow");
	        $('.trophies-container').fadeIn("slow");
	        $('.game-container').fadeOut("slow");
	      });
	    }
	  }, {
	    key: 'initGameNav',
	    value: function initGameNav() {
	      $('.game-nav').click(function () {
	        $('#game-wrapper').removeClass('trophies-body').addClass('game-body');
	        $('.trophies-nav').fadeIn("slow");
	        $(this).fadeOut("slow");
	        $('.game-container').fadeIn("slow");
	        $('.trophies-container').fadeOut("slow");
	      });
	    }
	  }]);

	  return Nav;
	})();

	exports['default'] = {
	  init: function init() {
	    new Nav();
	  }
	};
	module.exports = exports['default'];

/***/ }
/******/ ]);