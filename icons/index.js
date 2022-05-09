const icons = document.querySelectorAll('img');

icons.forEach(icon => {
    icon.addEventListener('click', () => {
        window.location = icon.src;
    });
});