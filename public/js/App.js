/*global $e, requestAnimFrame, Game */

"use strict";

/**
 *  Top-level application class
 */
var App = function() {
  this.canvas = $e("game_canvas");
  this.game = null; // instance of the GameEngine
  this.tileMap = null;
  this.tileImage = null;
  this.prevT = 0; // previous frame timestamp (millisecs)
};

App._instance = null;

App.run = function() {
  // singleton - only 1 instance
  if (App._instance && !RESTART) return;
  App._instance = new App();
  App._instance.init();
};

App.prototype.init = function() {
  var that = this;

  //  Set up resize event handler
  window.onresize = function() {
    that.resize();
  };

  //  Resize now to make canvas correct size
  this.resize();
  that.onAssetsLoaded();
};

App.prototype.onAssetsLoaded = function() {
  var that = this;

  $e("loading_block").style.display = "none";
  this.numRounds = NUM_ROUNDS !== void 0 ? NUM_ROUNDS : 5;
  //  Create game instance
  this.game = new Game({
    canvas: this.canvas,
    numRounds: this.numRounds,
    numPlayers: GAME_MODE,
  });
  // Bind to window
  window.game = this.game;

  //  Set up key listeners
  document.addEventListener(
    "keydown",
    function(e) {
      that.game.onKeyDown(e);
    },
    true
  );
  document.addEventListener(
    "keyup",
    function(e) {
      that.game.onKeyUp(e);
    },
    true
  );

  this.prevT = Date.now();
  startMusic();
  //  Start animation loop
  requestAnimationFrame(function() {
    that.doFrame();
  });
};

/**  This function gets called every frame */
App.prototype.doFrame = function() {
  var curT = Date.now();
  var dt = curT - this.prevT;

  //  Only update/render if time has elapsed
  if (dt > 0) {
    if (dt > 100) {
      //  Timestep too large - max out at 1/10th of a second.
      this.prevT += dt - 100;
      dt = 100;
    }

    this.game.update(dt);
    this.game.render();

    this.prevT = curT;
  }

  // Keep the animation loop going
  var that = this;
  requestAnimationFrame(function() {
    if (!PAUSE) {
      that.doFrame();
    }
  });
};
App.resume = function() {
  App._instance.doFrame();
};
App.prototype.resize = function() {
  // What is our container size...
  var rc = $e("game_container").getBoundingClientRect();
  var cw = Math.floor(rc.right - rc.left);
  var ch = Math.floor(rc.bottom - rc.top);

  //  Apply this w & h to game div and canvas
  $e("game").style.width = cw + "px";
  $e("game").style.height = ch + "px";
  this.canvas.width = cw;
  this.canvas.height = ch;

  //  Notify the game that resize happened
  if (this.game) this.game.resize();
};
var PAUSE = true;
var RESTART = false;
var NUM_ROUNDS;
