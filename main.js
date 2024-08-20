
function divHide(id) {
    const divs = document.querySelectorAll(".section");
    for (let div of divs) {
        div.style.display = "none";
    }
    document.getElementById(id).style.display = "block";
}

const asideP = document.querySelectorAll("aside>p");

function ps() {
    for (let p of asideP) {
        p.classList.remove("select","ani");
    }
}

for (let p of asideP) {
    p.addEventListener('click', function() {
        ps();
        p.classList.add("select","ani");
    });
};

function copyToClipboard(cls) {
    const txt = document.querySelector('.'+cls).textContent
    navigator.clipboard.writeText(txt).then(() => {
      alert('Code copied to clipboard!');
    }).catch(err => {
      console.error('Failed to copy: ', err);
    });
};

divHide('getStarted');
