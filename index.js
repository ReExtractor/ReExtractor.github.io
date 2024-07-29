const headerEl = document.querySelector("header");
const scrollToTop = document.querySelector(".scroll-to-top");

window.addEventListener("scroll", () => {
    // 
    let height = headerEl.getBoundingClientRect().height;

    if (window.pageYOffset - height > 800) {
        if (!headerEl.classList.contains("sticky")) {
            headerEl.classList.add("sticky");
        }
    } else {
        headerEl.classList.remove("sticky");
    }

    if (window.pageYOffset > 1000) {
        scrollToTop.style.display = "block";
    } else {
        scrollToTop.style.display = "none";
    }
});

const glide = new Glide(".glide", {
    type: "carousel",
    startAt: 0,
    autoplay: 3500,
});
const captionsEL = document.querySelectorAll(".slide-caption");
//document.querySelectorAll 选择所有具有 .slide-caption 类的元素，并将它们存储在 captionsEL 变量中
glide.on(["mount.after", "run.after"], () => {
    const caption = captionsEL[glide.index];
    anime({
        targets: caption.children, //动画的目标元素为caption的子元素
        opacity: [0, 1], //透明度0-1，变为完全透明
        duration: 400,
        easing: "spring(1, 80, 10, 0)",
        delay: anime.stagger(400, { start: 300 }),//延迟
        translateY: [anime.stagger([40, 10]), 0], //动画开始时，元素会向下移动（translateY 的正值表示向下），然后在动画结束时回到原位（translateY 的值为 0）
    });
});
glide.on("run.before", () => {
    document.querySelectorAll(".slide-caption > *").forEach((el) => {
        el.style.opacity = 0;
    });
});//在切换幻灯片之前，这个事件监听器将所有字幕元素的子元素的透明度重置为 0; 确保在下一张幻灯片的动画开始前，所有的字幕元素都是不可见的。

glide.mount(); //挂载轮播图

// js
const isotope = new Isotope(".cases", {
    layoutMode: "fitRows",
    itemSelector: ".case-item",
});

const filterBtns = document.querySelector(".filter-btns");

filterBtns.addEventListener("click", (e) => {
    let { target } = e;
    const filterOption = target.getAttribute("data-filter");
    if (filterOption) {
        document
            .querySelectorAll(".filter-btn.active")
            .forEach((btn) => btn.classList.remove("active"));
        target.classList.add("active");

        isotope.arrange({ filter: filterOption });
    }
});

// 
const staggeringOption = {
    delay: 300,
    distance: "50px",
    duration: 500,
    easing: "ease-in-out",
    origin: "bottom",
};

// 
ScrollReveal().reveal(".feature", {...staggeringOption, interval: 350 });

ScrollReveal().reveal(".service-item", {...staggeringOption, interval: 350 });

const dataSectionEl = document.querySelector(".data-section");

ScrollReveal().reveal(".data-section", {
    beforeReveal: () => {
        anime({
            targets: ".data-piece .num",
            innerHTML: (el) => {
                return [0, el.innerHTML];
            },
            duration: 1500,
            round: 1,
            easinge: "easeInExpo",
        });
        dataSectionEl.style.backgroundPosition =
            "center calc(50% - ${dataSectionEl.getBoundingClientRect().bottom/5}px)";
    },
});

window.addEventListener("scroll", () => {
    const bottom = dataSectionEl.getBoundingClientRect().bottom;
    const top = dataSectionEl.getBoundingClientRect.top;
    if (bottom >= 0 && top <= window.innerHeight) {
        dataSectionEl.style.backgroundPosition = "center calc(50% - ${bottom/5}px)";
    }
});

const scroll = new SmoothScroll(
    'nav a[href*="#"] , .scroll-to-top a[href*="#"]', {
        header: "header",
        offset: 50,
    }
);

document.addEventListener("scrollStart", () => {
    if (headerEl.classList.contains("open")) {
        headerEl.classList.remove("open");
    }
})

const exploreBtnEls = document.querySelectorAll(".explore-btn");
exploreBtnEls.forEach((exploreBtnEl) => {
    exploreBtnEl.addEventListener("click", () => {
        scroll.animateScroll(document.querySelector("#over-view"));
    });
});

//
const burgerEl = document.querySelector(".burger");
burgerEl.addEventListener("click", () => {
    headerEl.classList.toggle("open");
})


