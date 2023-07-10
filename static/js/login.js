const $icon = document.querySelector('#icon');
const $InputSenha = document.querySelector('#InputSenha');

let invi = false

$icon.onclick = function() {
    if (invi === false) {
        $icon.classList.remove('fa-eye')
        $icon.classList.add('fa-eye-slash')
        $icon.classList.add('minor')
        $InputSenha.classList.remove('masked')
        invi = true
    } else {
        $icon.classList.add('fa-eye')
        $icon.classList.remove('fa-eye-slash')  
        $icon.classList.remove('minor')
        $InputSenha.classList.add('masked')
        invi = false
    }
}