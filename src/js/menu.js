export default function menu() {
    const btnMenu = document.querySelector('nav')
    const menu = document.querySelector('.menu')
    const itensMenu = document.querySelector('.itensMenu')

    if (menu) {
        const abreMenu = () => {
            menu.classList.toggle('saida')
            
        setTimeout(() => {
            menu.classList.toggle('none')}, 100)
            menu.classList.toggle('preAnime')
        }
        btnMenu.addEventListener('click', abreMenu)
        itensMenu.addEventListener('click', abreMenu)
    }

}