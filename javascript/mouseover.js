// script.js
document.addEventListener("DOMContentLoaded", function () {
    const imageItems = document.querySelectorAll(".image-item");

    imageItems.forEach((item) => {
        item.addEventListener("mouseover", function () {
            item.style.opacity = 1;
        });

        item.addEventListener("mouseout", function () {
            item.style.opacity = 1;
        });
    });
});


