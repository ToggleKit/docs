window.addEventListener('hashchange', () => {
    hashChange();
    removeClassActive();
    afterLoadContent();
});
window.addEventListener('load', () => {
    hashChange();
    removeClassActive();
    afterLoadContent();
});


async function getText(path) {
  try {
    let res = await fetch(path);
    if (!res.ok) {
      throw new Error(`HTTP error! status: ${res.status}`);
    }
    let content = await res.text();
    document.querySelector('#app').innerHTML = content;
    prism();
    toggleKit();
  } catch (error) {
    console.error('Error fetching the text:', error);
    document.querySelector('#app').innerHTML = '<p>Failed to load content. Please try again later.</p>';
  }
}



function hashChange() {
    let hash = window.location.hash;
    let url = hash ? hash.replace('#', '') + '.html' : 'home.html';
    if (window.location.pathname !== url) {
        getText(url);
    }
}

function copyToClipboard(cls) {
    const txt = document.querySelector('.' + cls).textContent
    navigator.clipboard.writeText(txt).then(() => {
        notify();
    }).catch(err => {
        console.error('Failed to copy: ', err);
    });
};
function notify(){
  const notification = document.querySelector('#popup');
  notification.classList.add('show');
  setTimeout(()=>{notification.classList.remove('show');}, 3000)
}
const menu = document.querySelector(".menu");
menu.onclick = function() {
  menu.classList.toggle('active');
  document.querySelector("aside").classList.toggle("show");
}
document.addEventListener('click',(e)=>{
  if(e.target !== menu){
    menu.classList.remove('active');
    document.querySelector("aside").classList.remove("show");
  }
})
const modeBtn = document.getElementById('mode');
const body = document.body;
modeBtn.addEventListener('click', (e) => {
  const currentmode = localStorage.getItem('mode');
   
  if (currentmode) {
    modeBtn.classList.add('darkmode')
    localStorage.removeItem('mode');
    modeBtn.innerHTML = 'brightness_4';
    body.classList.add('dark')
  } else {
    modeBtn.classList.remove('darkmode')
    localStorage.setItem('mode', 'active');
    modeBtn.innerHTML = 'light_mode';
    if(body.classList.contains('dark')){
      body.classList.remove('dark');
    }
  }
});
const currentMode = localStorage.getItem('mode');
if (currentMode) {
  modeBtn.classList.remove('darkmode')
  modeBtn.innerHTML = 'light_mode';
  
} else {
  modeBtn.classList.add('darkmode')
  modeBtn.innerHTML = 'brightness_4';
  body.classList.add('dark');
}
let navs = document.querySelectorAll('aside>a');
navs.forEach(nav=>{
  nav.addEventListener('click',()=>{
    removeClassActive();
    nav.classList.add('active');
  })
})
function removeClassActive() {
  navs.forEach(nav => {
    nav.classList.remove('active');
  });
}
function afterLoadContent(){
  const hash = window.location.hash
  navs.forEach(nav => {
    const href = nav.getAttribute('href');
    if(hash === href){
      nav.classList.add('active');
    }else if(!hash){
      document.querySelector('aside>a').classList.add('active')
    }
});
}
