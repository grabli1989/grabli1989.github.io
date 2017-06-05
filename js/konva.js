var stage = null;
var layer = null;
var width = null;
var height = null;
var imageContainer = null;
var image1anchor = null;
var ratioImage1 = null;
var currentImage = null;
var imageGroup = null;
var groups = {};
var countClickBackground = 1;

var resizeContainer = function () {
    if(stage) {
        stage.width(imageContainer.width());
        stage.height(imageContainer.height());
    }
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
        image = group.getParent().get('Image')[0];
    }
    ratioImage1 = image.height() / image.width();
    image.position(topLeft.position());
    var width = topRight.getX() - topLeft.getX();
    var height = bottomLeft.getY() - topLeft.getY();
        // if((bottomLeft.getY() - topLeft.getY()) < (width * ratioImage1)) {
        //     // bottomLeft.setY(width * ratioImage1);
        //     // bottomRight.setY(width * ratioImage1);
        // }
    if(width && height && width > 15 && height > 15) {
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

        //
        if(image.getParent().getAttr('name') == 'imageGroup') {
            imageGroup.offsetX(image.getWidth()/2);
            imageGroup.offsetY(image.getHeight()/2);
            // console.log(image.getParent());
        }
        image.cache();

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
        radius: 15,
        name: name,
        draggable: draggable,
        dragOnTop: false,
        opacity: opacity
    });
    anchor.on('dragmove', function() {
        update(this);
        // layer.draw();
    });
    anchor.on('mousedown touchstart', function() {
        group.setDraggable(false);
        this.moveToTop();
    });
    anchor.on('dragend', function() {
        group.setDraggable(true);
        // layer.draw();
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
var imageContainerRender = function (imgData) {
    imageContainer = $('#content');
    width = imageContainer.width();
    height = imageContainer.height();
    var containerWidth = width;
    var containerHeight = height;

    if(!width || !height ) {
        return;
    }

    ratioImage1 = height / width;
    // console.log('container ratio:' + ratioImage1);

    var imageObj1 = new Image();
    imageObj1.onload = function() {
        image1.image(imageObj1);
        layer.draw();
        var originWidth = image1.getImage().width;
        var originHeight = image1.getImage().height;
        var originRatio = originHeight / originWidth;
        // console.log('origin ratio:' + originRatio);
        if(originRatio < ratioImage1) {
            // console.log(containerHeight);
            height = width * originRatio;
            width = height / originRatio;
            image1Group.setY(containerHeight / 2 - height / 2);
        } else {
            height = height;
            width = height / originRatio;
            image1Group.setX(containerWidth / 2 - width / 2);
        }
        image1.width(width);
        image1.height(height);
        layer.draw();

        // anchor1Group = new Konva.Group({
        //     x: 0,
        //     y: 0,
        //     name: 'anchor1Group',
        //     opacity: 0,
        //     draggable: true
        // });
        // image1Group.add(anchor1Group);
        addAnchor(image1Group, 0, 0, 'topLeft', 0);
        addAnchor(image1Group, width, 0, 'topRight', 0);
        image1anchor = addAnchor(image1Group, width, height, 'bottomRight');
        addAnchor(image1Group, 0, height, 'bottomLeft', 0);
    };
    imageObj1.src = imgData;

    stage = new Konva.Stage({
        container: 'image-container',
        width: containerWidth,
        height: containerHeight,
        name: 'stage',
        class: 'stage'
    });
    layer = new Konva.Layer();
    stage.add(layer);

    var image1 = new Konva.Image({
        width: width,
        height: height,
        name: 'image1',
        class: 'background'
    });

    var image1Group = new Konva.Group({
        // x: stage.getWidth()/2, y: stage.getHeight()/2,
        // offsetX: width/2, offsetY: height/2,
        width: width,
        height: height,
        name: 'image1Group',
        draggable: true
    });

    layer.add(image1Group);
    image1Group.add(image1);
}



// var addNewImage = function (slideNum) {
//
//     var width = 128,
//         height = 128;
//
//     if(animatedLayer) {
//         var id = animatedLayer.id();
//         alayers[id] = animatedLayer.clone({
//             id: id,
//         });
//         animatedLayer.destroy();
//     }
//
//     if(alayers.hasOwnProperty(slideNum)) {
//         animatedLayer = alayers[slideNum];
//         stage.add(animatedLayer);
//         imageGroup = animatedLayer.get('Group')[0];
//         image = imageGroup.get('Image')[0];
//             var center = imageGroup.getChildren(function (node) {
//                 return node.getAttr('name') === 'center';
//             });
//         imageGroup.add(center);
//         newImage = image;
//         newImage.cache();
//         stage.batchDraw();
//
//     } else {
//         if(!stage || !layer || !imageContainer) {
//             return;
//         }
//
//         var x = imageContainer.width()/2;
//         var y = imageContainer.height()/2;
//
//         animatedLayer = new Konva.Layer({
//             id: slideNum,
//         });
//
//         var center = new Konva.Circle({
//             x: width / 2,
//             y: -20,
//             radius: 15,
//             fill: '#555',
//             name: 'center',
//             opacity: 0,
//             // draggable: true,
//             dragOnTop: false
//         });
//
//         var image = new Konva.Image({
//             width: width,
//             height: height,
//             name: 'image',
//             // draggable: true
//         });
//
//         newImage = image;
//
//         imageGroup = new Konva.Group({
//             width: width,
//             height: height,
//             offsetX: width / 2,
//             offsetY: height / 2,
//             x: x,
//             y: y,
//             name: 'imageGroup',
//             draggable: true
//         });
//
//         animatedLayer.add(imageGroup);
//         // imageGroup.add(image);
//         imageGroup.add(center);
//
//         stage.add(animatedLayer);
//         var anim = new Konva.Animation(function(frame) {
//             animate(animatedLayer, imageGroup, frame);
//         }, animatedLayer);
// // wait one second and then spin the star
//         setTimeout(function() {
//             anim.start();
//         });
//
//         var imageObj = new Image();
//         imageObj.onload = function() {
//             newImage.image(imageObj);
//
//             newImage.cache();
//             newImage.filters([Konva.Filters.Brighten]);
//             imageGroup.add(image);
//             var slider = document.getElementById('brightness');
//             slider.onchange = function() {
//                 newImage.brightness(slider.value);
//                 animatedLayer.batchDraw();
//             };
//         };
//
//         imageObj.src = '/img/clickable/img' + slideNum + '.png';
//         imageObj.id = 'slide'+slideNum;
//     }
//
//     console.log(alayers);
//
//     imageGroup.lastRotation = 0;
//     imageGroup.angularVelocity = 6;
//     imageGroup.controlled = false;
//
//     center.on('mousedown touchstart', function () {
//         imageGroup.draggable(false);
//     });
//
//     center.on('mouseup touchend dragend', function () {
//         imageGroup.draggable(true);
//     });
//
//     center.on('mousedown touchstart touchmove', function(evt) {
//         imageGroup.angularVelocity = 0;
//         imageGroup.controlled = true;
//     });
//
//     image.on('mousedown touchstart', function () {
//         imageGroup.draggable(true);
//         imageGroup.controlled = false;
//     });
//
//     image.on('mouseover tap', function () {
//         center.opacity(1);
//         anchorGroup.opacity(1);
//         $('#brightness').show();
//     });
//     image.on('mouseout', function () {
//         // anchorGroup.opacity(0);
//     });
//
//     var anchorGroup = new Konva.Group({
//         width: width,
//         height: height,
//         name: 'anchorGroup',
//         draggable: true,
//         opacity: 0
//     });
//     imageGroup.add(anchorGroup);
//
//     addAnchor(anchorGroup, 0, 0, 'topLeft', 0);
//     addAnchor(anchorGroup, width, 0, 'topRight', 0);
//     var anchor = addAnchor(anchorGroup, width, height, 'bottomRight');
//     addAnchor(anchorGroup, 0, height, 'bottomLeft', 0);
//
//     anchor.on('dragmove', function() {
//         // console.log(newImage);
//         var clone = newImage.clone({
//             brightness: newImage.brightness(),
//             width: imageGroup.offsetX()*2,
//             height: imageGroup.offsetY()*2
//         });
//         clone.cache();
//         newImage.destroy();
//         newImage = clone;
//         imageGroup.add(newImage);
//         animatedLayer.batchDraw();
//
//         center.setX(clone.width()/2);
//     });
//
//     stage.on('click tap', function (evt) {
//         var targetName = evt.target.getAttr('name');
//         if(targetName != 'image') {
//             $('#brightness').hide();
//         }
//         switch (targetName) {
//             case 'image1':
//                 anchorGroup.opacity(0);
//                 center.opacity(0);
//                 anchor1Group.opacity(1);
//                 break;
//             case 'image':
//                 console.log(123);
//                 anchorGroup.opacity(1);
//                 center.opacity(1);
//                 anchor1Group.opacity(0);
//                 break;
//         }
//
//     });
//     stage.on('contentMouseup touchend', function() {
//         imageGroup.controlled = false;
//     });
//     stage.on('contentMousemove touchstart touchmove', function() {
//         if(imageGroup.controlled) {
//             var mousePos = stage.getPointerPosition();
//             var x = imageGroup.getX() - mousePos.x;
//             var y = imageGroup.getY() - mousePos.y;
//             imageGroup.setRotation(0.5 * Math.PI + Math.atan(y / x));
//             if(mousePos.x <= imageGroup.getX()) {
//                 imageGroup.rotate(Math.PI);
//             }
//             // imageGroup.offsetX(image.getWidth()/2);
//             // imageGroup.offsetY(image.getHeight()/2);
//         }
//     });
//
// }

var showImage = function(slideNum) {
    if(currentImage) {
        var parent = currentImage.getParent();
        parent.getChildren(function (node) {
            return node.getAttr('name') === 'anchorRotate';
        }).hide();
        parent.get('Group')[0].hide();
        currentImage.hide();
    }
    var image = groups['img' + slideNum].get('Image')[0];
    image.show();
    currentImage = image;
    stage.draw();
};

var loadImages = function () {
    var width = 128,
        height = 128;

    var images = [
        '/img/clickable/img1.png',
        '/img/clickable/img2.png',
        '/img/clickable/img3.png',
        '/img/clickable/img4.png',
        '/img/clickable/img5.png',
        '/img/clickable/img6.png',
        '/img/clickable/img7.png',
    ];
    var x = imageContainer.width()/2;
    var y = imageContainer.height()/2;

    images.forEach(function (path, i) {
        i++;
        var image = null;
        var imageObj = new Image();
        imageObj.onload = function() {
            image = new Konva.Image({
                image: imageObj,
                width: width,
                height: height,
                name:  'img' + i,
                class: 'img'
            });
            image.hide();
            var group = new Konva.Group({
                width: width,
                height: height,
                offsetX: width / 2,
                offsetY: height / 2,
                x: x,
                y: y,
                name: 'imageGroup' + i,
                draggable: true
            });

            image.on('mousedown touchstart', function () {
                group.draggable(true);
                group.controlled = false;
            });

            var anchorRotate = new Konva.Circle({
                x: width / 2,
                y: -20,
                radius: 15,
                fill: '#555',
                name: 'anchorRotate',
                dragOnTop: false
            });
            anchorRotate.hide();

            group.lastRotation = 0;
            group.angularVelocity = 6;
            group.controlled = false;

            anchorRotate.on('mousedown touchstart', function () {
                group.draggable(false);
            });

            anchorRotate.on('mouseup touchend dragend', function () {
                group.draggable(true);
            });

            anchorRotate.on('mousedown touchstart touchmove', function(evt) {
                group.angularVelocity = 0;
                group.controlled = true;
            });

            var anchorGroup = createAnchorGroup(i, width, height);
            group.add(image);
            group.add(anchorGroup);
            group.add(anchorRotate);
            var animateLayer = new Konva.Layer();
            animateLayer.add(group);
            stage.add(animateLayer);

            var anim = new Konva.Animation(function(frame) {
                animate(animateLayer, group, frame);
            }, animateLayer);
            // wait one second and then spin the star
            setTimeout(function() {
                anim.start();
            });

            stage.batchDraw();
            groups[image.getAttr('name')] = group;
        };
        imageObj.src = path;
    });




    stage.on('click tap touchstart', function (evt) {
        var target = evt.target;
        var parent = target.getParent();
        var targetClassAttr = target.getAttr('class');

        switch (targetClassAttr) {
            case 'img':
                var anchor = parent.get('Group')[0];
                var anchorRotate = parent.getChildren(function (node) {
                    return node.getAttr('name') === 'anchorRotate';
                });
                anchorRotate.show();
                // console.log(anchorRotate);
                anchor.show();
                image1anchor.hide();
                stage.batchDraw();
                var brightness = $('#brightness');
                brightness.val(target.brightness());
                brightness.show();
                countClickBackground = 1;
                break;
            case 'background':
                if(currentImage) {
                    var imageParent = currentImage.getParent();
                    imageParent.get('Group')[0].hide();
                    imageParent.getChildren(function (node) {
                        return node.getAttr('name') === 'anchorRotate';
                    }).hide();
                    if(countClickBackground == 2) {
                        image1anchor.show();
                        countClickBackground = 1;
                    } else {
                        countClickBackground++;
                    }
                    stage.batchDraw();
                    $('#brightness').hide();
                }
                break;
        }

    });

    stage.on('contentMouseup touchend', function() {
        if(currentImage) {
            var imageGroup = currentImage.getParent();
            imageGroup.controlled = false;
        }
    });
    stage.on('contentMousemove touchstart touchmove', function() {
        if(currentImage) {
            var imageGroup = currentImage.getParent();
            if(imageGroup.controlled) {
                var mousePos = stage.getPointerPosition();
                var x = imageGroup.getX() - mousePos.x;
                var y = imageGroup.getY() - mousePos.y;
                imageGroup.setRotation(0.5 * Math.PI + Math.atan(y / x));
                if(mousePos.x <= imageGroup.getX()) {
                    imageGroup.rotate(Math.PI);
                }
            }
        }
    });

}

var resetAnchors = function () {
    if(currentImage) {
        var imageParent = currentImage.getParent();
        imageParent.get('Group')[0].hide();
        imageParent.getChildren(function (node) {
            return node.getAttr('name') === 'anchorRotate';
        }).hide();
        image1anchor.hide();
        $('#brightness').hide();
        stage.batchDraw();
    }
};

var changBrightness = function (value) {
    var image = currentImage;
    image.cache();
    image.filters([Konva.Filters.Brighten]);
    image.brightness(value);
    stage.batchDraw();
};

var createAnchorGroup = function (i, w, h) {
    var width = w;
    var height = h;
    var anchorGroup = new Konva.Group({
        width: width,
        height: height,
        name: 'anchorGroup' + i,
        draggable: true,
    });
    anchorGroup.hide();
    addAnchor(anchorGroup, 0, 0, 'topLeft', 0);
    addAnchor(anchorGroup, width, 0, 'topRight', 0);
    var anchor = addAnchor(anchorGroup, width, height, 'bottomRight');
    addAnchor(anchorGroup, 0, height, 'bottomLeft', 0);

    anchor.on('dragmove', function() {
        var anchorGroup = this.getParent();
        var imageGroup = anchorGroup.getParent();
        var anchorRotate = imageGroup.getChildren(function (node) {
            return node.getAttr('name') === 'anchorRotate';
        })[0];
        var image = imageGroup.get('Image')[0];
        // console.log(image);

        imageGroup.offsetX(image.getWidth()/2);
        imageGroup.offsetY(image.getHeight()/2);

        anchorRotate.setX(image.width()/2);
    });

    return anchorGroup;
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

// Attach event listener
document.getElementById('upload-background').addEventListener('change', doUpload);

// Take event from file change & handle it
function doUpload(e){
    // The user might upload multiple files, we'll take the first
    var file = e.target.files[0];

    // Check that there is a file uploaded
    if(file){
        // We need to use a FileReader to actually read the file.
        var reader = new FileReader();

        // When it's loaded, we'll send the image data to the canvas method
        reader.onload = function(event){
            imageContainerRender(event.target.result);
            loadImages();
        }

        // Pass the reader the file to read and give us the DataURL
        reader.readAsDataURL(file);
    }
}

// // Handle the returned image data
// function canvasLoadImage(imgData){
//     // Create a New Imgae
//     var img = new Image();
//
//     // Assign the image data as the source - as we are using a data URL
//     img.src = imgData;
//
//     // Always use onload with images!
//     img.onload = function(){
//
//         // Load the Canvas & Context
//         var canvas = document.getElementById('canvas');
//         var context = canvas.getContext('2d');
//
//         var hRatio = canvas.width  / img.width    ;
//         var vRatio =  canvas.height / img.height  ;
//         var ratio  = Math.min ( hRatio, vRatio );
//         var centerShift_x = ( canvas.width - img.width*ratio ) / 2;
//         var centerShift_y = ( canvas.height - img.height*ratio ) / 2;
//         context.clearRect(0,0,canvas.width, canvas.height);
//         context.drawImage(img, 0,0, img.width, img.height,
//             centerShift_x,centerShift_y,img.width*ratio, img.height*ratio);
//
//         // Draw the image
//         //context.drawImage(img, 0, 0);
//
//         // More here?
//     }
// }