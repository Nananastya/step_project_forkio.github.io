const button = document.querySelector('.burger-menu__logo');
const x = document.querySelector('.x');
const burgerItem = document.getElementById('.burger-menu__item');
const menuLogo = document.getElementById('menu-icon');
const burgerMenu = document.getElementById('burger-menu');

document.onclick = function(e){
    if(e.target.id !== 'burger-item' && e.target.id !== 'menu-icon'){
        burgerMenu.classList.add('inactive');
        menuLogo.classList.remove('inactive');
        x.classList.add('inactive');
        
    }
}

function openMenu(){
   
    burgerMenu.classList.toggle('inactive');
    button.classList.toggle('inactive');
    x.classList.toggle('inactive');
    
}

button.addEventListener('click', openMenu);
x.addEventListener('click', openMenu);