$(document).ready(function(){
    let ul = document.getElementById("about-bubbles");
    let aboutBubbles = ul.getElementsByTagName("li");
    for(li of aboutBubbles){
      li.addEventListener('click', function(){
        if(this.classList.contains('active')){
          this.classList.remove("active");
        } else {
          this.classList.add("active");
        }
      })
    }
});