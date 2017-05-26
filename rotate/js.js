var width = window.innerWidth;
var height = window.innerHeight;
Konva.angleDeg = false;
function animate(animatedLayer, star, frame) {
    // 20% slow down per second
    var angularFriction = 0.2;
    var angularVelocityChange = star.angularVelocity * frame.timeDiff * (1 - angularFriction) / 1000;
    star.angularVelocity -= angularVelocityChange;
    if(star.controlled) {
        star.angularVelocity = (star.getRotation() - star.lastRotation) * 1000 / frame.timeDiff;
    }
    else {
        // star.rotate(frame.timeDiff * star.angularVelocity / 1000);
    }
    star.lastRotation = star.getRotation();
}
var stage = new Konva.Stage({
    container: 'container',
    width: width,
    height: height
});
var animatedLayer = new Konva.Layer();
var star = new Konva.Star({
    x: stage.getWidth() / 2,
    y: stage.getHeight() / 2,
    outerRadius: 80,
    innerRadius: 40,
    stroke: '#005500',
    fill: '#b5ff88',
    strokeWidth: 4,
    numPoints: 5,
    lineJoin: 'round',
    shadowOffset: 5,
    shadowBlur: 10,
    shadowColor: 'black',
    shadowOpacity: 0.5,
    opacity: 0.8
});
// custom properties
star.lastRotation = 0;
star.angularVelocity = 6;
star.controlled = false;
star.on('mousedown', function(evt) {
    this.angularVelocity = 0;
    this.controlled = true;
});
animatedLayer.add(star);
var center = new Konva.Circle({
    x: stage.getWidth() / 2,
    y: stage.getHeight() / 2,
    radius: 3,
    fill: '#555'
});
animatedLayer.add(center);
// add listeners to container
stage.on('contentMouseup', function() {
    star.controlled = false;
});
stage.on('contentMousemove', function() {
    if(star.controlled) {
        var mousePos = stage.getPointerPosition();
        var x = star.getX() - mousePos.x;
        var y = star.getY() - mousePos.y;
        star.setRotation(0.5 * Math.PI + Math.atan(y / x));
        if(mousePos.x <= stage.getWidth() / 2) {
            star.rotate(Math.PI);
        }
    }
});
stage.add(animatedLayer);
var anim = new Konva.Animation(function(frame) {
    animate(animatedLayer, star, frame);
}, animatedLayer);
// wait one second and then spin the star
setTimeout(function() {
    anim.start();
});