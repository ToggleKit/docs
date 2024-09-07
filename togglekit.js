

async function toggleKit() {
const alertDivs = document.querySelectorAll(`[data-tg="alert"]`);
alertDivs.forEach((alertDiv => {
    alertDiv.querySelector(`button`).addEventListener(`click`, function() {
        alertDiv.style.display = `none`
    })
}));
let cart = document.querySelector(`[data-tg="cart"]`);
let cartItems = document.querySelectorAll(`[data-tg="cItem"]`);
let itemsInCart = JSON.parse(localStorage.getItem(`itemsInCart`)) || [];
let btnTxt = {};
if (cartItems) {
    if (cart) {
        cartItems.forEach(function(cartItem) {
            let id = cartItem.id;
            let cAdd = cartItem.querySelector(`[data-tg="cAdd"]`);
            let cURL = cartItem.querySelector(`[data-tg="cURL"]`).href;
            let cImg = cartItem.querySelector(`[data-tg="cImg"]`).src;
            let cTitle = cartItem.querySelector(`[data-tg="cTitle"]`).textContent;

            function btnStatus(itemsInCart) {
                let itemIndex = itemsInCart.findIndex(item => item.id === id);
                if (itemIndex == -1) {
                    btnTxt.btn = "Add"
                } else {
                    btnTxt.btn = "Remove"
                }

                cAdd.textContent = btnTxt.btn
            }

            btnStatus(itemsInCart)

            cAdd.addEventListener(`click`, function() {
                let itemIndex = itemsInCart.findIndex(item => item.id === id);
                if (itemIndex !== -1) {
                    itemsInCart.splice(itemIndex, 1);
                    itemsInCart = itemsInCart.filter(function(item) {
                        return item.id !== id
                    });
                    localStorage.setItem(`itemsInCart`, JSON.stringify(itemsInCart));
                    updateCart();
                    btnStatus(itemsInCart)
                } else {
                    itemsInCart.push({
                        id: id,
                        link: cURL,
                        src: cImg,
                        title: cTitle,
                    })

                    localStorage.setItem(`itemsInCart`, JSON.stringify(itemsInCart));
                    updateCart();
                    btnStatus(itemsInCart)
                }
            })
        })

        function updateCart() {
            cart.innerHTML = "";
            itemsInCart.forEach(function(item) {
                let li = document.createElement(`li`);
                let itemRemoveBtn = document.createElement(`button`);
                li.innerHTML = `<a href="${item.link}"> <h2>${item.title}</h2> <img src="${item.src}" alt="${item.title}"/></a>`;
                li.setAttribute(`data-tg`, `selectedItem`)

                li.id = item.id;
                itemRemoveBtn.setAttribute(`data-tg`, `itemRemoveBtn`)

                itemRemoveBtn.textContent = `Remove`;
                li.appendChild(itemRemoveBtn);
                cart.appendChild(li);
                itemRemoveBtn.addEventListener(`click`, function() {
                    itemsInCart = itemsInCart.filter(function(filteredItem) {
                        return filteredItem.id !== item.id
                    })

                    localStorage.setItem(`itemsInCart`, JSON.stringify(itemsInCart));
                    updateCart();
                    cartItems.forEach(function(cartItem) {
                        let id = cartItem.id

                        let cAdd = cartItem.querySelector(`[data-tg="cAdd"]`);
                        let itemIndex = itemsInCart.findIndex(item => item.id === id);
                        if (itemIndex == -1) {
                            cAdd.textContent = "Add"
                        }
                    })
                })
            })

            let total = document.createElement(`div`);
            total.textContent = `Total Items: ${itemsInCart.length}`;
            cart.appendChild(total)
        }

        updateCart()
    }
};
const dropDowns = document.querySelectorAll(`[data-tg="dropDown"]`);
document.addEventListener('click', function(event) {
    if (!Array.from(dropDowns).some(dropDown => dropDown.contains(event.target))) {
        dropDowns.forEach(dropDown => {
            const div = dropDown.querySelector('div');
            div.removeAttribute('data-dropon')
        })
    }
});
dropDowns.forEach(dropDown => {
    const div = dropDown.querySelector('div');
    dropDown.querySelector('button').addEventListener('click', function() {
        if (div.getAttribute('data-dropon') === '') {
            removeAttr()
        } else {
            removeAttr();
            div.setAttribute('data-dropon', '')
        }
    })
});

function removeAttr() {
    document.querySelectorAll(`[data-dropon]`).forEach((d => {
        d.removeAttribute(`data-dropon`)
    }))
}

document.querySelectorAll(`[data-tg="modal"]`).forEach((modals => {
    let sd = modals.querySelector(`[data-tg="shadow"]`);
    let cntr = modals.querySelector(`[data-tg="container"]`);
    let txt = modals.querySelector(`[data-tg="body"]>p`);
    modals.querySelector(`[data-tg="eventer"]`).addEventListener(`click`, function() {
        sd.setAttribute(`data-status`, `active`)
    });
    ['closer', 'saver', 'canceller'].forEach(function(buttons) {
        modals.querySelector(`[data-tg="${buttons}"]`).addEventListener('click', closeModal)
    });

    function closeModal() {
        sd.removeAttribute(`data-status`)
    }

    if (typeof modal === `undefined`) {
        sd.style.backgroundColor = `#00000033`;
        cntr.style.backgroundColor = `#fff`;
        cntr.style.maxWidth = `250px`;
        cntr.style.minWidth = `200px`;
        cntr.style.border = `solid 1px #000`;
        cntr.style.borderRadius = `5px`;
        txt.style.textAlign = `justify`;
        txt.style.maxHeight = '200px'
    } else {
        sd.style.backgroundColor = modal.shadow || `#00000033`;
        cntr.style.backgroundColor = modal.container.background || `#fff`;
        cntr.style.maxWidth = modal.container.maxWidth || `250px`;
        cntr.style.minWidth = modal.container.minWidth || `200px`;
        cntr.style.border = modal.container.border || `solid 1px #000`;
        cntr.style.borderRadius = modal.container.borderRadius || `5px`;
        txt.style.textAlign = modal.container.text.textAlign || `justify`;
        txt.style.maxHeight = modal.container.text.maxHeight || `200px`
    }
}));
if (typeof menu === "undefined") {
    let menu = {
        selector: `[data-tg="nestMenu"]`,
        firstBreaker: `_`,
        secondBreaker: `__`,
    }

    let menuEle = document.querySelector(menu.selector);
    if (menuEle) {
        let ul = document.createElement("ul");
        let liTag = menuEle.querySelectorAll("li");
        for (var i = 0; i < liTag.length; i++) {
            let liText = liTag[i].textContent;
            if (liText.startsWith(menu.firstBreaker)) {
                let previousLiTag = liTag[i].previousElementSibling;
                let previousLiTagText = previousLiTag.textContent;
                if (previousLiTagText.charAt(0) !== menu.firstBreaker) {
                    previousLiTag.classList = "on-sub";
                    previousLiTag.appendChild(liTag[i]);
                    if (liText.startsWith(menu.secondBreaker)) {
                        let secondNestPreviusLiTag = liTag[i].previousElementSibling;
                        liTag[i].classList = "drop-2"

                        if (secondNestPreviusLiTag.textContent.charAt(1) !== menu.firstBreaker) {
                            let ul = document.createElement("ul");
                            ul.classList = "sub-sub-menu"

                            secondNestPreviusLiTag.classList = "drop-1";
                            secondNestPreviusLiTag.appendChild(ul)
                        }
                    }
                }
            }
        }

        var homeLinks = document.querySelectorAll(".on-sub>a");
        for (var i = 0; i < homeLinks.length; i++) {
            var homeLink = homeLinks[i];
            var homeItem = homeLink.parentElement;
            var newUl = document.createElement("ul");
            newUl.classList = "sub-menu"

            var otherItems = homeItem.querySelectorAll("li");
            for (var j = 0; j < otherItems.length; j++) {
                var otherItem = otherItems[j];
                newUl.appendChild(otherItem)
            }

            homeItem.appendChild(newUl)
        }

        var nmElements = document.getElementsByClassName("drop-1");
        for (var i = 0; i < nmElements.length; i++) {
            var nextSibling = nmElements[i].nextElementSibling;
            ''

            while (nextSibling && nextSibling.classList.contains("drop-2")) {
                nmElements[i].querySelector("ul").appendChild(nextSibling);
                nextSibling = nmElements[i].nextElementSibling
            }
        }

        let links = document.querySelectorAll(`${menu.selector} a`);
        for (let link of links) {
            let text = link.textContent;
            let newText = text.replace(new RegExp(menu.firstBreaker, "g"), "");
            link.textContent = newText
        }

        let onSubs = document.querySelectorAll('.on-sub');
        for (let i = 0; i < onSubs.length; i++) {
            if (onSubs[i]) {
                onSubs[i].querySelector('a').href = 'javascript:void(0)';
                onSubs[i].addEventListener('click', function(event) {
                    event.stopPropagation();
                    if (onSubs[i].querySelector('.sub-menu').classList.contains("show")) {
                        removeSM()
                    } else {
                        removeSM();
                        onSubs[i].querySelector('a').classList.add('On');
                        onSubs[i].querySelector('.sub-menu').classList.add('show')
                    }

                    document.addEventListener("click", function(events) {
                        if (!onSubs[i].contains(events.target)) {
                            removeSM()
                        }
                    })
                })

                let drop1 = onSubs[i].querySelectorAll('.drop-1');
                for (let d = 0; d < drop1.length; d++) {
                    drop1[d].querySelector('a').href = 'javascript:void(0)';
                    drop1[d].addEventListener('click', function(event) {
                        event.stopPropagation();
                        if (drop1[d].querySelector('.sub-sub-menu').classList.contains("show")) {
                            removeSSM()
                        } else {
                            removeSSM();
                            drop1[d].querySelector('a').classList.add('active');
                            drop1[d].querySelector('.sub-sub-menu').classList.add('show')
                        }
                    })
                }
            }
        }

        function removeSM() {
            let subMenu = document.querySelectorAll('.sub-menu');
            for (let sm = 0; sm < subMenu.length; sm++) {
                subMenu[sm].classList.remove("show")
            }

            let onSub = document.querySelectorAll('.on-sub>a')

            for (let os = 0; os < onSub.length; os++) {
                onSub[os].classList.remove("On")
            }
        }

        function removeSSM() {
            let subSubMenu = document.querySelectorAll('.sub-sub-menu');
            for (let ssm = 0; ssm < subSubMenu.length; ssm++) {
                subSubMenu[ssm].classList.remove("show")
            }

            let allDrop1 = document.querySelectorAll('.drop-1>a');
            for (let d1i = 0; d1i < allDrop1.length; d1i++) {
                allDrop1[d1i].classList.remove('active')
            }
        }
    }
} else {
    menu.selector = menu.selector || '[data-tg="nestMenu"]';
    menu.firstBreaker = menu.firstBreaker || '_';
    menu.secondBreaker = menu.secondBreaker || '__';
    let menuEle = document.querySelector(menu.selector);
    if (menuEle) {
        let ul = document.createElement("ul");
        let liTag = menuEle.querySelectorAll("li");
        for (var i = 0; i < liTag.length; i++) {
            let liText = liTag[i].textContent;
            if (liText.startsWith(menu.firstBreaker)) {
                let previousLiTag = liTag[i].previousElementSibling;
                let previousLiTagText = previousLiTag.textContent;
                if (previousLiTagText.charAt(0) !== menu.firstBreaker) {
                    previousLiTag.classList = "on-sub";
                    previousLiTag.appendChild(liTag[i]);
                    if (liText.startsWith(menu.secondBreaker)) {
                        let secondNestPreviusLiTag = liTag[i].previousElementSibling;
                        liTag[i].classList = "drop-2"

                        if (secondNestPreviusLiTag.textContent.charAt(1) !== menu.firstBreaker) {
                            let ul = document.createElement("ul");
                            ul.classList = "sub-sub-menu"

                            secondNestPreviusLiTag.classList = "drop-1";
                            secondNestPreviusLiTag.appendChild(ul)
                        }
                    }
                }
            }
        }

        var homeLinks = document.querySelectorAll(".on-sub>a");
        for (var i = 0; i < homeLinks.length; i++) {
            var homeLink = homeLinks[i];
            var homeItem = homeLink.parentElement;
            var newUl = document.createElement("ul");
            newUl.classList = "sub-menu"

            var otherItems = homeItem.querySelectorAll("li");
            for (var j = 0; j < otherItems.length; j++) {
                var otherItem = otherItems[j];
                newUl.appendChild(otherItem)
            }

            homeItem.appendChild(newUl)
        }

        var nmElements = document.getElementsByClassName("drop-1");
        for (var i = 0; i < nmElements.length; i++) {
            var nextSibling = nmElements[i].nextElementSibling;
            ''

            while (nextSibling && nextSibling.classList.contains("drop-2")) {
                nmElements[i].querySelector("ul").appendChild(nextSibling);
                nextSibling = nmElements[i].nextElementSibling
            }
        }

        let links = document.querySelectorAll(`${menu.selector} a`);
        for (let link of links) {
            let text = link.textContent;
            let newText = text.replace(new RegExp(menu.firstBreaker, "g"), "");
            link.textContent = newText
        }

        let onSubs = document.querySelectorAll('.on-sub');
        for (let i = 0; i < onSubs.length; i++) {
            if (onSubs[i]) {
                onSubs[i].querySelector('a').href = 'javascript:void(0)';
                onSubs[i].addEventListener('click', function(event) {
                    event.stopPropagation();
                    if (onSubs[i].querySelector('.sub-menu').classList.contains("show")) {
                        removeSM()
                    } else {
                        removeSM();
                        onSubs[i].querySelector('a').classList.add('On');
                        onSubs[i].querySelector('.sub-menu').classList.add('show')
                    }

                    document.addEventListener("click", function(events) {
                        if (!onSubs[i].contains(events.target)) {
                            removeSM()
                        }
                    })
                })

                let drop1 = onSubs[i].querySelectorAll('.drop-1');
                for (let d = 0; d < drop1.length; d++) {
                    drop1[d].querySelector('a').href = 'javascript:void(0)';
                    drop1[d].addEventListener('click', function(event) {
                        event.stopPropagation();
                        if (drop1[d].querySelector('.sub-sub-menu').classList.contains("show")) {
                            removeSSM()
                        } else {
                            removeSSM();
                            drop1[d].querySelector('a').classList.add('active');
                            drop1[d].querySelector('.sub-sub-menu').classList.add('show')
                        }
                    })
                }
            }
        }

        function removeSM() {
            let subMenu = document.querySelectorAll('.sub-menu');
            for (let sm = 0; sm < subMenu.length; sm++) {
                subMenu[sm].classList.remove("show")
            }

            let onSub = document.querySelectorAll('.on-sub>a')

            for (let os = 0; os < onSub.length; os++) {
                onSub[os].classList.remove("On")
            }
        }

        function removeSSM() {
            let subSubMenu = document.querySelectorAll('.sub-sub-menu');
            for (let ssm = 0; ssm < subSubMenu.length; ssm++) {
                subSubMenu[ssm].classList.remove("show")
            }

            let allDrop1 = document.querySelectorAll('.drop-1>a');
            for (let d1i = 0; d1i < allDrop1.length; d1i++) {
                allDrop1[d1i].classList.remove('active')
            }
        }
    }
};
let nextSiblingToggleButtons = document.querySelectorAll(`[data-tg="nextSiblingToggle"]`)

nextSiblingToggleButtons.forEach((toggleButton => {
    toggleButton.addEventListener(`click`, function() {
        toggleButton.nextElementSibling.toggleAttribute("data-nextSiblingOn")
    })
}))

const pagers = document.querySelectorAll(`[data-tg="pager"]`);
pagers.forEach((pager => {
    const div = document.createElement(`div`);
    div.setAttribute(`data-tg`, `numberDiv`)

    const pages = pager.querySelectorAll(`[data-page]`);
    pages[0].setAttribute(`data-pageon`, ``)

    for (let i = 0; i < pages.length; i++) {
        const button = document.createElement(`button`);
        button.setAttribute(`data-tg`, `pageNumber`)

        button.textContent = `Page ${i+1}`;
        div.appendChild(button)
    }

    pager.appendChild(div);
    const buttons = pager.querySelectorAll(`[data-tg="pageNumber"]`);
    buttons.forEach((button, i) => {
        button.addEventListener(`click`, function() {
            const pages = pager.querySelectorAll(`[data-page]`);
            pages.forEach((page => {
                page.removeAttribute(`data-pageon`)
            }))

            pages[i].setAttribute(`data-pageon`, ``)
        })
    })
}));
document.querySelectorAll(`[data-tg="parentHide"]`).forEach((parent => {
    parent.querySelector(`button`).addEventListener(`click`, function() {
        parent.style.display = "none"
    })
}));
window.addEventListener('load', function() {
    document.querySelectorAll(`[data-tg="preloader"]`).forEach((preloder => {
        preloder.style.display = "none"
    }))
});
const ranges = document.querySelectorAll(`[data-tg="range"]`);
ranges.forEach((range => {
    const rangeCounDiv = document.createElement(`span`);
    rangeCounDiv.textContent = range.value

    range.oninput = (function() {
        rangeCounDiv.textContent = range.value
    })

    range.after(rangeCounDiv)
}));
const scrollToTop = document.querySelector(`[data-tg="scrollToTop"]`);
if (scrollToTop) {
    scrollToTop.addEventListener(`click`, function() {
        window.scrollTo({
            top: 0,
            left: 0,
            behavior: `smooth`
        })
    });
    window.addEventListener(`scroll`, function() {
        if (window.pageYOffset >= 200) {
            scrollToTop.classList.add(`active`)
        } else {
            scrollToTop.classList.remove(`active`)
        }
    })
}
const imgs = document.querySelectorAll(`[data-tg="slideable"]>img`);
lastImg = imgs[imgs.length-1]
  

if (lastImg) {
  lastImg.onload = () => {
    const sliderELe = document.querySelectorAll('[data-tg="sliderBox"]');
    sliderELe.forEach((element) => {
      const container = element.querySelector(`[data-tg="slideable"]`);
      let img = element.querySelector(`img`);
      element.style.width = img.clientWidth + "px";
      element.style.height = img.clientHeight + "px";
      const slides = container.children;
      const prevButton = element.querySelector('[data-tg="prev"]');
      const nextButton = element.querySelector('[data-tg="next"]');
      let currentSlideIndex = 0;
      slides[currentSlideIndex].setAttribute("data-tg", "action");
      nextButton.addEventListener("click", () => {
        slides[currentSlideIndex].removeAttribute("data-tg");
        currentSlideIndex = (currentSlideIndex + 1) % slides.length;
        slides[currentSlideIndex].setAttribute("data-tg", "action");
        container.style.transform = `translateX(-${100 * currentSlideIndex}%)`
      });
      prevButton.addEventListener("click", () => {
        slides[currentSlideIndex].removeAttribute("data-tg");
        currentSlideIndex = (currentSlideIndex - 1 + slides.length) % slides.length;
        slides[currentSlideIndex].setAttribute("data-tg", "action");
        container.style.transform = `translateX(-${100 * currentSlideIndex}%)`
      })
    })
  }
}

// window.addEventListener(`load`, function() {

// });
let tabContainers = document.querySelectorAll(`[data-tg="tabContainer"]`)

tabContainers.forEach((tabContainer => {
    let tabSwitch = tabContainer.querySelectorAll(`[data-tg="tabSwitchs"]>button`);
    let tab = tabContainer.querySelectorAll(`[data-tg="Tabs"]>div`);
    for (let i = 0; i < tabSwitch.length; i++) {
        tab[0].setAttribute(`data-tab`, ``);
        tabSwitch[i].addEventListener('click', function() {
            hideTabs();
            tab[i].setAttribute('data-tab', "")
        })

        function hideTabs() {
            tab.forEach((t => {
                t.removeAttribute('data-tab')
            }))
        }
    }
}));
let tooltipEle = document.querySelectorAll(`[data-tooltip]`);
tooltipEle.forEach((element => {
    if (typeof tooltip === "undefined") {
        element.style.setProperty("--tooltipColor", "#000");
        element.style.setProperty("--tooltipBackgroound", "#e8e8e8");
        element.style.setProperty("--tooltipBorderRadius", "5px");
        element.style.setProperty("--tooltipBoxShadow", "0px 0px 5px #002b")
    } else {
        element.style.setProperty("--tooltipColor", tooltip.textColor || "#000");
        element.style.setProperty("--tooltipBackgroound", tooltip.backgroundColor || "#e8e8e8");
        element.style.setProperty("--tooltipBorderRadius", tooltip.borderRadius || "5px");
        element.style.setProperty("--tooltipBoxShadow", tooltip.boxShadow || "0px 0px 5px #002b")
    }
}));

const elements = document.querySelectorAll(`[data-textlimit]`);
elements.forEach(element => {
  const wordLimit = element.getAttribute('data-textlimit')
  const words = element.innerText.split(' ');
  if (words.length > wordLimit) {
    element.innerText = words.slice(0, wordLimit).join(' ') + '...';
  }
});

let classPasses = document.querySelectorAll(`[data-class]`);
classPasses.forEach(classPass => {
  let cls = classPass.getAttribute(`data-class`);
  let aim = classPass.getAttribute(`data-aim`);
  classPass.addEventListener('click', () => {
    if (document.querySelector(aim)) {
      document.querySelector(aim).classList.toggle(cls);
    } else {
      console.log(`Do not find the selector: ${aim}`)
    }
  })
});

let contentPasses = document.querySelectorAll(`[data-container]`);
contentPasses.forEach(container => {
  let aim = container.getAttribute(`data-aim`);
  let code = container.querySelector(`[data-code]`).cloneNode(true);
  let btn = container.querySelector(`[data-fire]`)
  btn.addEventListener('click', () => {
    if (document.querySelector(aim)) {
      document.querySelector(aim).appendChild(code)
    } else {
      console.log(`Do not find the selector: ${aim}`)
    }
  })
});
document.addEventListener('click', (event) => {
  if (event.target.matches('[data-fire]')) {
    const container = event.target.closest('[data-remove]');
    if (container) {
      const codeElement = event.target.closest('[data-code]');
      if (codeElement) {
        codeElement.remove();
      }
    }
  }
});
  const copyTos = document.querySelectorAll(`[data-copyto]`)
  copyTos.forEach(copyTo => {
    const copy = copyTo.querySelector(`[data-copyable]`).textContent;
    const copyIt = copyTo.querySelector(`[data-copyit]`);
    copyIt.addEventListener('click', () => {
      navigator.clipboard.writeText(copy).then(() => {
        copyIt.textContent = "Copied!";
      }).catch(err => {
        copyIt.textContent = "Failed"
      })
    })
  });
}
