var stage = null;
var layer = null;
var width = null;
var height = null;
var imageContainer = null;
var anchor1Group = null;
var ratioImage1 = null;
var newImage = null;
var imageGroup = null;

var reset = function () {
    if(!layer) return;
    layer.children = null;
    imageContainerRender();
}
var reload = function () {
    layer.draw();
};
var update = function (activeAnchor) {
    var group = activeAnchor.getParent();
    var topLeft = group.get('.topLeft')[0];
    var topRight = group.get('.topRight')[0];
    var bottomRight = group.get('.bottomRight')[0];
    var bottomLeft = group.get('.bottomLeft')[0];
    var image = group.get('Image')[0];
    var anchorX = activeAnchor.getX();
    var anchorY = activeAnchor.getY();
    // update anchor positions
    switch (activeAnchor.getName()) {
        case 'topLeft':
            topRight.setY(anchorY);
            bottomLeft.setX(anchorX);
            break;
        case 'topRight':
            topLeft.setY(anchorY);
            bottomRight.setX(anchorX);
            break;
        case 'bottomRight':
            bottomLeft.setY(anchorY);
            topRight.setX(anchorX);
            break;
        case 'bottomLeft':
            bottomRight.setY(anchorY);
            topLeft.setX(anchorX);
            break;
    }
    if('undefined' == typeof image) {
        image = newImage;
    }
    ratioImage1 = image.height() / image.width();
    image.position(topLeft.position());
    var width = topRight.getX() - topLeft.getX();
    var height = bottomLeft.getY() - topLeft.getY();
        // if((bottomLeft.getY() - topLeft.getY()) < (width * ratioImage1)) {
        //     // bottomLeft.setY(width * ratioImage1);
        //     // bottomRight.setY(width * ratioImage1);
        // }
    if(width && height) {
        if(height < width * ratioImage1) {
            image.width(height/ratioImage1);
            image.height(height);
            bottomRight.setX(height/ratioImage1);
            bottomRight.setY(height);
            // bottomLeft.setY(width * ratioImage1);
            // bottomRight.setY(width * ratioImage1);
        } else {
            image.width(width);
            image.height(width * ratioImage1);
            bottomRight.setY(width * ratioImage1);
            bottomRight.setX(width);
            // bottomLeft.setY(width * ratioImage1);
            // bottomRight.setY(width * ratioImage1);
        }


        imageGroup.offsetX(image.getWidth()/2);
        imageGroup.offsetY(image.getHeight()/2);

        // if(width > image.width()) {
        //     // image.width(width);
        //     // image.width(height/ratioImage1);
        // }
        // if(height > image.height()) {
        //     // image.height(width * ratioImage1);
        //     // image.height(width * ratioImage1);
        // }
    }
}
var addAnchor = function (group, x, y, name, opacity) {
    var draggable = false;
    if (typeof opacity == 'undefined') {
        opacity = 1;
        draggable = true;
    }
    var stage = group.getStage();
    var layer = group.getLayer();
    var anchor = new Konva.Circle({
        x: x,
        y: y,
        stroke: '#666',
        fill: '#ddd',
        strokeWidth: 2,
        radius: 8,
        name: name,
        draggable: draggable,
        dragOnTop: false,
        opacity: opacity
    });
    anchor.on('dragmove', function() {
        update(this);
        layer.draw();
    });
    anchor.on('mousedown touchstart', function() {
        group.setDraggable(false);
        this.moveToTop();
    });
    anchor.on('dragend', function() {
        group.setDraggable(true);
        layer.draw();
    });
    // add hover styling
    anchor.on('mouseover', function() {
        var layer = this.getLayer();
        document.body.style.cursor = 'pointer';
        this.setStrokeWidth(4);
        layer.draw();
    });
    anchor.on('mouseout', function() {
        var layer = this.getLayer();
        document.body.style.cursor = 'default';
        this.setStrokeWidth(2);
        layer.draw();
    });
    group.add(anchor);
    return anchor;
}
var imageContainerRender = function () {
    imageContainer = $('#content');
    width = imageContainer.width();
    height = imageContainer.height();

    if(!width || !height ) {
        return;
    }

    ratioImage1 = height / width;
    console.log(ratioImage1);

    stage = new Konva.Stage({
        container: 'image-container',
        width: width,
        height: height
    });
    layer = new Konva.Layer();
    stage.add(layer);

    var image1 = new Konva.Image({
        width: width,
        height: height,
        name: 'image1'
    });

    var image1Group = new Konva.Group({
        x: 0,
        y: 0,
        name: 'image1Group',
        draggable: true
    });

    layer.add(image1Group);
    image1Group.add(image1);

    anchor1Group = new Konva.Group({
        x: 0,
        y: 0,
        name: 'anchor1Group',
        opacity: 0,
        draggable: true
    });

    addAnchor(image1Group, 0, 0, 'topLeft', 0);
    addAnchor(image1Group, width, 0, 'topRight', 0);
    addAnchor(image1Group, width, height, 'bottomRight');
    addAnchor(image1Group, 0, height, 'bottomLeft', 0);
    image1Group.add(anchor1Group);


    var imageObj1 = new Image();
    imageObj1.onload = function() {
        image1.image(imageObj1);
        layer.draw();
    };
    imageObj1.src = '/img/image1.jpg';
}



var addNewImage = function (slideNum) {
    reset();
    var width = 128,
        height = 128;
    if(!stage || !layer || !imageContainer) {
        return;
    }

    var x = imageContainer.width()/2;
    var y = imageContainer.height()/2;

    var animatedLayer = new Konva.Layer();

    var center = new Konva.Circle({
        x: width / 2,
        y: -20,
        radius: 8,
        fill: '#555',
        name: 'center',
        opacity: 0,
        // draggable: true,
        dragOnTop: false
    });
    center.on('mousedown touchstart', function () {
        imageGroup.draggable(false);
    });

    center.on('mouseup touchend', function () {
        imageGroup.draggable(true);
    });

    var selected = document.getElementsByClassName('resize-dragb' + slideNum)[0];
    console.log(selected);

    var image = new Konva.Image({
        image: selected,
        width: width,
        height: height,
        name: 'image',
        // draggable: true
    });
    newImage = image;

    image.on('mousedown touchstart', function () {
        imageGroup.draggable(true);
        imageGroup.controlled = false;
    });

    image.on('mouseover tap', function () {
        center.opacity(1);
        anchorGroup.opacity(1);
        $('#brightness').show();
    });
    image.on('mouseout', function () {
        // anchorGroup.opacity(0);
    });


    stage.on('click tap', function (evt) {
        var targetName = evt.target.getAttr('name');
        if(targetName != 'image') {
            $('#brightness').hide();
        }
        switch (targetName) {
            case 'image1':
                anchorGroup.opacity(0);
                center.opacity(0);
                anchor1Group.opacity(1);
                break;
            case 'image':
                anchorGroup.opacity(1);
                center.opacity(1);
                anchor1Group.opacity(0);
                break;
        }

    });

    imageGroup = new Konva.Group({
        width: width,
        height: height,
        offsetX: width / 2,
        offsetY: height / 2,
        x: x,
        y: y,
        brightness: 1,
        name: 'imageGroup',
        draggable: true
    });

    animatedLayer.add(imageGroup);
    // imageGroup.add(image);
    imageGroup.add(center);

    imageGroup.lastRotation = 0;
    imageGroup.angularVelocity = 6;
    imageGroup.controlled = false;
    center.on('mousedown touchstart touchmove', function(evt) {
        imageGroup.angularVelocity = 0;
        imageGroup.controlled = true;
    });

    stage.on('contentMouseup', function() {
        imageGroup.controlled = false;
    });
    stage.on('contentMousemove touchstart touchmove', function() {
        if(imageGroup.controlled) {
            var mousePos = stage.getPointerPosition();
            var x = imageGroup.getX() - mousePos.x;
            var y = imageGroup.getY() - mousePos.y;
            imageGroup.setRotation(0.5 * Math.PI + Math.atan(y / x));
            if(mousePos.x <= imageGroup.getX()) {
                imageGroup.rotate(Math.PI);
            }
            // imageGroup.offsetX(image.getWidth()/2);
            // imageGroup.offsetY(image.getHeight()/2);
        }
    });
    stage.add(animatedLayer);
    var anim = new Konva.Animation(function(frame) {
        animate(animatedLayer, imageGroup, frame);
    }, animatedLayer);
// wait one second and then spin the star
    setTimeout(function() {
        anim.start();
    });

    var anchorGroup = new Konva.Group({
        width: width,
        height: height,
        // offsetX: width / 2,
        // offsetY: height / 2,
        name: 'anchorGroup',
        draggable: true,
        opacity: 0
    });
    imageGroup.add(anchorGroup);

    addAnchor(anchorGroup, 0, 0, 'topLeft', 0);
    addAnchor(anchorGroup, width, 0, 'topRight', 0);
    var anchor = addAnchor(anchorGroup, width, height, 'bottomRight');
    addAnchor(anchorGroup, 0, height, 'bottomLeft', 0);

    var imageObj = new Image();
    imageObj.onload = function() {
        newImage.image(imageObj);

        newImage.cache();
        newImage.filters([Konva.Filters.Brighten]);
        imageGroup.add(image);
        var slider = document.getElementById('brightness');
        slider.onchange = function() {
            newImage.brightness(slider.value);
            animatedLayer.batchDraw();

            // var clone = newImage.clone({
            //         brightness: image.brightness(),
            //         width: image.width(),
            //         height: image.height()
            //     });
            //     // clone.cache();
            //     newImage.destroy();
            //     newImage = clone;
            //     imageGroup.add(image);
            // animatedLayer.batchDraw();

        };

        // animatedLayer.draw();
    };

    anchor.on('dragmove', function() {
        console.log(newImage);
        var clone = newImage.clone({
            brightness: newImage.brightness(),
            width: imageGroup.offsetX()*2,
            height: imageGroup.offsetY()*2
        });
        clone.cache();
        newImage.destroy();
        newImage = clone;
        imageGroup.add(newImage);
        animatedLayer.batchDraw();

        center.setX(clone.width()/2);
    });

    imageObj.src = '/img/clickable/img' + slideNum + '.png';
    imageObj.id = 'slide'+slideNum;
}

// Rotation
Konva.angleDeg = false;
function animate(layer, image, frame) {
    // 20% slow down per second
    var angularFriction = 0.2;
    var angularVelocityChange = image.angularVelocity * frame.timeDiff * (1 - angularFriction) / 1000;
    image.angularVelocity -= angularVelocityChange;

    image.angularVelocity = (image.getRotation() - image.lastRotation) * 1000 / frame.timeDiff;

    image.lastRotation = image.getRotation();
}