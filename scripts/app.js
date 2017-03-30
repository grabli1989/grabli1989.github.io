(function () {
    'use strict';

    var heatMapsMenuBody, buttonSwitch, menuItems, poweredByVibe;

    var MenuIsOpen = false;

    heatMapsMenuBody = document.getElementById('heatMapsMenuBody');
    buttonSwitch = document.getElementById('buttonSwitch');
    menuItems = document.getElementsByClassName('menu-item');
    poweredByVibe = document.getElementsByClassName('poweredByVibe')[0];

    [].forEach.call(menuItems, function(item) {
        item.onmouseover = function() {
            item.classList.add('hoverMenuItem');
        };
        item.onmouseout = function() {
            item.classList.remove('hoverMenuItem');
        };
        item.onclick = function () {
            alert('Click on: ' + item.lastElementChild.innerText);
        }
    });


    document.getElementById('heatMapsMenuHeader').onclick = function () {
        MenuIsOpen = !MenuIsOpen;
        if(MenuIsOpen) {
            buttonSwitch.classList.add('isOpen');
            heatMapsMenuBody.classList.add('isOpenMenu');
            poweredByVibe.classList.remove('opacity');
            return;
        }
        buttonSwitch.classList.remove('isOpen');
        heatMapsMenuBody.classList.remove('isOpenMenu');
        poweredByVibe.classList.add('opacity');
    }

})();
