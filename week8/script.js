M.AutoInit();

// Function to change the number of visible projects based on screen size

function carouselItems(mediumScreen) {
    if (mediumScreen.matches) {
        $('.carousel').carousel({
            numVisible: 3
        });
    } else {
        $('.carousel').carousel({
            numVisible: 5
        });
    }
}

var mediumScreen = window.matchMedia("(max-width: 767px)")
carouselItems(mediumScreen);
mediumScreen.addListener(carouselItems);

