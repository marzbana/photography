document.addEventListener("DOMContentLoaded", function() {
    // Initialize Locomotive Scroll
    const locoScroll = new LocomotiveScroll({
        el: document.querySelector('[data-scroll-container]'),
        smooth: true
    });

    // Update ScrollTrigger on Locomotive Scroll updates
    locoScroll.on("scroll", ScrollTrigger.update);

    // Setup ScrollTrigger to use the same scrolling context as Locomotive Scroll
    ScrollTrigger.scrollerProxy("[data-scroll-container]", {
        scrollTop(value) {
            return arguments.length
                ? locoScroll.scrollTo(value, 0, 0)
                : locoScroll.scroll.instance.scroll.y;
        },
        getBoundingClientRect() {
            return { top: 0, left: 0, width: window.innerWidth, height: window.innerHeight };
        },
        pinType: document.querySelector("[data-scroll-container]").style.transform
            ? "transform"
            : "fixed"
    });

    ScrollTrigger.addEventListener("refresh", () => locoScroll.update());
    ScrollTrigger.refresh();

    // Dynamically load images for gallery
    const galleryContainer = document.querySelector('.gallery-container');
    const galleryPath = 'assets/images/gallery/';
    
    fetchImages(galleryPath).then(images => {
        images.forEach(image => {
            const imgElement = document.createElement('img');
            imgElement.src = `${galleryPath}${image}`;
            imgElement.classList.add('gallery-image');
            galleryContainer.appendChild(imgElement);

            // Optional: Animate each image with GSAP on scroll
            gsap.from(imgElement, {
                scrollTrigger: {
                    trigger: imgElement,
                    scroller: "[data-scroll-container]",
                    start: "top 90%",
                    end: "top 60%",
                    scrub: true
                },
                opacity: 0,
                y: 50
            });
        });
    });

    // Fetch image names from the directory (simulate directory scan)
    async function fetchImages(path) {
        // This part requires backend support to list files, but we can simulate it:
        return [
            'photo1.jpg',
            'photo2.jpg',
            'photo3.jpg'
            // Add as many images as there are in the directory
        ];
    }
});
