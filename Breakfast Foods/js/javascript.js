var btn = document.getElementsByClassName('btn');
var dropdown = document.getElementsByClassName('dropdown-button');
var accordionbtn = document.getElementById('accordion');
var len = btn.length;
for (var i = 0; i < len; i++) {
  btn[i].addEventListener('click', function(e) {
    var id = +e.path[1].id;
    console.log(dropdown[id-1])
    dropdown[id-1].style.visibility = 'visible';
    for (var j = 1; j <= len; j++) {
      if (id != j) {
        dropdown[j-1].style.visibility = 'hidden';
      }
    }
  });
}
accordionbtn.addEventListener('click', function(e) {
  e.path[2].lastElementChild.style.display = 'none';
});