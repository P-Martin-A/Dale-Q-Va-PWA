const $MENU       = document.getElementById('menu'),
      $LISTS      = document.getElementById('lists'),
      $CLOSED     = document.getElementById('closed'),
      $HTML       = window.document["all"][0],
      $FORM       = document.getElementById('form'),
      $INPUTS     = document.querySelectorAll('#form input'),
      EXPRESSIONS = {
        name: /^[a-zA-ZÀ-ÿ\s]$/,
        email: /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/
      },
      FIELDS = {
        name: false,
        email: false
      } 


const formValidation = e =>{
    switch (e.target.name) {
        case 'name':
            fieldValidation(EXPRESSIONS.name, e.target, 'name')
        break;
        case 'email':
            fieldValidation(EXPRESSIONS.email, e.target, 'email')        
        break;
    }
}

const fieldValidation = (expression, input, field)=>{
    if(expression.test(input.value)){
        document.querySelector(`#group-${field} .group-input .input-${field}`).classList.add('correct')
        document.querySelector(`#group-${field} .group-input .input-${field}`).classList.remove('incorrect')
        document.querySelector(`#group-${field} .group-input i`).classList.add('bxs-check-circle')
        document.querySelector(`#group-${field} .group-input i`).classList.remove('bxs-x-circle')
        FIELDS[field] = true
    }else{
        document.querySelector(`#group-${field} .group-input .input-${field}`).classList.remove('correct')
        document.querySelector(`#group-${field} .group-input .input-${field}`).classList.add('incorrect')
        document.querySelector(`#group-${field} .group-input i`).classList.remove('bxs-check-circle')
        document.querySelector(`#group-${field} .group-input i`).classList.add('bxs-x-circle')
    }
}



window.addEventListener('scroll', ()=>{
    const $ABOUT    = document.getElementById('about'),
          $SINGERS  = document.getElementById('singers'),
          $CONTACT  = document.getElementById('contact'),
          VIEWPORT  = window.innerHeight/2,
          POSITIONA = $ABOUT.getBoundingClientRect().top, 
          POSITIONS = $SINGERS.getBoundingClientRect().top,
          POSITIONC = $CONTACT.getBoundingClientRect().top

    if(POSITIONA < VIEWPORT) $ABOUT.style.transform = 'translateX(0)'
    if(POSITIONS < VIEWPORT) $SINGERS.style.transform = 'translateX(0)'
    if(POSITIONC < VIEWPORT) $CONTACT.style.transform = 'translateX(0)'
})

$MENU.addEventListener('click', ()=>{
    $LISTS.classList.add('active')
    $HTML.classList.add('active')
    $CLOSED.addEventListener('click', ()=>{        
        $LISTS.classList.remove('active')
        $HTML.classList.remove('active')
    })
})

$INPUTS.forEach(input =>{
    input.addEventListener('keyup', formValidation)
    input.addEventListener('blur', formValidation)
})

$FORM.addEventListener('submit', e =>{
    e.preventDefault()

    if(FIELDS.name && FIELDS.email){
        $FORM.reset()

        document.querySelectorAll('.group-input i').forEach(icon => {
            icon.classList.remove('bxs-check-circle')
            icon.classList.remove('bxs-x-circle')
        })
        document.querySelector(`#group-name .group-input .input-name`).classList.remove('correct')
        document.querySelector(`#group-name .group-input .input-name`).classList.remove('incorrect')
        document.querySelector(`#group-email .group-input .input-email`).classList.remove('incorrect')
        document.querySelector(`#group-email .group-input .input-email`).classList.remove('correct')
    }
})


