document.addEventListener("DOMContentLoaded", function() {
    const animatedTitle = document.getElementById("animatedTitle");
    const content = document.querySelector(".content");
    const toGallery = document.querySelector(".to-gallery");

    // Проверяем, есть ли заголовок (чтобы код работал только на главной)
    if (animatedTitle) {
        // Слова для заголовка
        const titleWords = ["Этот", "день", "твой."];
        let wordIndex = 0;

        // Скрываем контент перед стартом анимации
        content.style.visibility = "hidden";
        toGallery.style.visibility = "hidden";

        function animateTitle() {
            if (wordIndex < titleWords.length) {
                animatedTitle.innerHTML += titleWords[wordIndex] + " ";
                wordIndex++;
                setTimeout(animateTitle, 700);
            } else {
                // Теперь контент появляется плавно
                setTimeout(() => {
                    content.style.visibility = "visible";
                    toGallery.style.visibility = "visible";
                    content.classList.add("fade-in");
                    toGallery.classList.add("fade-in");
                }, 500);
            }
        }

        // Если анимация уже проигрывалась, сразу показываем контент
        if (!sessionStorage.getItem("animationPlayed")) {
            document.querySelector(".intro").style.opacity = "1";
            animateTitle();
            sessionStorage.setItem("animationPlayed", "true");
        } else {
            animatedTitle.innerHTML = titleWords.join(" ");
            document.querySelector(".intro").style.opacity = "1";
            content.style.visibility = "visible";
            toGallery.style.visibility = "visible";
            content.classList.add("fade-in");
            toGallery.classList.add("fade-in");
        }
    }

    // Проверяем, есть ли элемент, перед тем как менять слово
    const changingElement = document.querySelector(".changing-word");
    if (changingElement) {
        const changingWords = ["особенная", "неповторимая", "яркая", "чудесная", "волшебная"];
        let changingIndex = 0;

        function changeWord() {
            changingElement.innerText = changingWords[changingIndex];
            changingIndex = (changingIndex + 1) % changingWords.length;
        }

        // 🔹 Ускорили смену слов до 2 секунд
        setInterval(changeWord, 2000);
    }

    // Кнопка перехода в галерею
    const goToGalleryBtn = document.getElementById("goToGallery");
    if (goToGalleryBtn) {
        goToGalleryBtn.addEventListener("click", function() {
            window.location.href = "gallery.html";
        });
    }
});