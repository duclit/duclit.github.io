const content = "Hi, I'm Koala.";
let currentI = 0;

function typewriter(id) {
    const element = document.getElementById(id);
    
    setTimeout(() => {
        element.innerHTML += content[currentI];
        currentI++;
        
        if (currentI < content.length) typewriter(id);
    }, 150)
}

typewriter('heading');