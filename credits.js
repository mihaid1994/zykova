document.addEventListener("DOMContentLoaded", function () {
    /*** 🎇 Надёжный код для звёзд ***/
    const canvas = document.getElementById("starsCanvas");
    if (!canvas) return;
    const ctx = canvas.getContext("2d");

    function resizeCanvas() {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
    }

    resizeCanvas();
    window.addEventListener("resize", resizeCanvas);

    const stars = [];
    const mainStars = 100;

    for (let i = 0; i < mainStars; i++) {
        stars.push({
            x: Math.random() * canvas.width,
            y: Math.random() * canvas.height,
            radius: Math.random() * 2 + 1,
            opacity: Math.random() * 1 + 0.7,
            speed: Math.random() * 0.02 + 0.01,
            glow: Math.random() < 0.5,
            glowColor: "rgba(0, 0, 255, 1)",
            glowBlur: Math.random() * 7
        });
    }                              
                                

    const smallStars = 350;

    for (let i = 0; i < smallStars; i++) {
        stars.push({
            x: Math.random() * canvas.width,
            y: Math.random() * canvas.height,
            radius: Math.random() * 0.5 + 0.3,
            opacity: Math.random() * 0.8 + 0.3,
            speed: Math.random() * 0.02 + 0.01,
            glow: Math.random() < 0.3,
            glowColor: "rgb(255, 94, 0)",
            glowBlur: Math.random() * 3
        });
    }


    function drawStars() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        for (let star of stars) {
            ctx.save();
            ctx.globalCompositeOperation = "lighter";
            if (star.glow) {
                ctx.shadowBlur = star.glowBlur;
                ctx.shadowColor = star.glowColor;
            } else {
                ctx.shadowBlur = 0;
                ctx.shadowColor = "transparent";
            }
            ctx.beginPath();
            ctx.arc(star.x, star.y, star.radius, 0, Math.PI * 2);
            ctx.fillStyle = `rgba(255, 255, 255, ${star.opacity})`;
            ctx.fill();
            ctx.restore();
        }
    }

    function twinkleStars() {
        for (let star of stars) {
            star.opacity += (Math.random() - 0.5) * star.speed * 4;
            if (star.opacity > 1) star.opacity = 1;
            if (star.opacity < 0.2) star.opacity = 0.2;
        }
        drawStars();
        requestAnimationFrame(twinkleStars);
    }

    drawStars();
    twinkleStars();

    /*** 🎬 Титры движутся плавно ***/
    const creditsContainer = document.querySelector(".credits");
    const birthdayText = document.querySelector(".birthday-message");

    if (!creditsContainer || !birthdayText) return;

    creditsContainer.animate(
        [
            { transform: "translateY(170vh)", opacity: 1 },
            { transform: "translateY(-100vh)", opacity: 1 }
        ],
        {
            duration: 20000,
            easing: "linear",
            fill: "forwards"
        }
    );

    setTimeout(() => {
        birthdayText.style.opacity = "1";
        birthdayText.style.transform = "translate(-50%, -50%) scale(1)";
        birthdayText.animate(
            [
                { opacity: 0, transform: "translate(-50%, -50%) scale(0.5)" },
                { opacity: 1, transform: "translate(-50%, -50%) scale(1)" }
            ],
            {
                duration: 4000,
                easing: "ease-out",
                fill: "forwards"
            }
        );
    }, 20500);
});
