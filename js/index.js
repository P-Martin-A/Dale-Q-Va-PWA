const $MENU   = document.getElementById('menu'),
      $LISTS  = document.getElementById('lists'),
      $CLOSED = document.getElementById('closed')

$MENU.addEventListener('click', ()=>{
    $LISTS.classList.add('active')
    $CLOSED.addEventListener('click', ()=>{        
        $LISTS.classList.remove('active')
    })
})

