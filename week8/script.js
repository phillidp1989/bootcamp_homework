M.AutoInit();

// Function to change the number of visible projects based on screen size

function carouselItems(mediumScreen) {
    if (mediumScreen.matches) {
        $('.carousel').carousel({
            numVisible: 3,
            padding: 0,
            shift: 0
        });
    } else {
        $('.carousel').carousel({
            numVisible: 5,
            padding: 20
        });
    }
}

var mediumScreen = window.matchMedia("(max-width: 767px)")
carouselItems(mediumScreen);
mediumScreen.addListener(carouselItems);



