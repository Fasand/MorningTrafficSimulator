var CollisionDetectr = function( opts )
{
    this.opts = opts || {};
    //  INIT
    this.car = opts.car;
    this.map = opts.map.reverse();
    this.init();
    //detect proximity first




}


CollisionDetectr.prototype.init = function() {
    this.registeredObjects = [];
    this.setUpWalls();

    //detect proximity first

        
    // if (car1.position.x < car2.position.x + car2.width &&
    //     car1.position.x + car1.width > car2.position.x &&
    //     car1.position.y < car2.position.y + car2.height &&
    //     car1.position.y + car1.height > car2.position.y) {
    //      opts.callbackFn();
    //     }
}

CollisionDetectr.prototype.setUpWalls = function() {
    let index = 0;

    for (var y = 0; y < this.opts.mapH; y++) {
        for (var x = 0; x < this.opts.mapW; x++) {
            let element = this.map[y][x];
            if (element === 0)
                this.createRect(element, x, y);
            }
       index++;
    }
    console.log(this.registeredObjects);
}


CollisionDetectr.prototype.createRect = function(element, x, y) {
    let rect = {
        x: x * this.opts.tileW,
        y: y * this.opts.tileH,
        w: this.opts.tileW,
        h: this.opts.tileH
    }
    this.registeredObjects.push(rect);
}
CollisionDetectr.prototype.update = function() {
    var isColliding = this.collides();
    if(isColliding !== null){
        console.log(isColliding);
    }
}
CollisionDetectr.prototype.collides = function() {

    for (obj in this.registeredObjects) {
        var x = (this.car.position.x * Game.DRAW_SCALE) + (this.opts.canvasW / 2);
        var y = this.car.position.y * Game.DRAW_SCALE + (this.opts.canvasH / 2);
        if (x < obj.x + obj.w &&
            x + this.car.width > obj.x &&
            y  < obj.y + obj.h &&
            y + this.car.height > obj.y) {
                console.log('fuckin finally')
                return obj;
        }
    }
    return null;
}
