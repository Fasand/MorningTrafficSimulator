var CollisionDetectr = function( car )
{
    //  INIT
    this.car = car;
    this.init();
    //detect proximity first




}


CollisionDetectr.prototype.init = function() {
    console.log('yeet');
    this.registeredObjects = [];
    //detect proximity first

        
    // if (car1.position.x < car2.position.x + car2.width &&
    //     car1.position.x + car1.width > car2.position.x &&
    //     car1.position.y < car2.position.y + car2.height &&
    //     car1.position.y + car1.height > car2.position.y) {
    //      opts.callbackFn();
    //     }
}



CollisionDetectr.prototype.update = function() {
    
}
var exampleCallbackFn = function () {
    console.log('callbackfn');
}