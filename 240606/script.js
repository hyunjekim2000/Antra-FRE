// todo list fetch
fetch('https://jsonplaceholder.typicode.com/todos')
  .then(response => response.json())
  .then(data => displayList(data))
  .catch(error => console.error('error:', error));

// display list
function displayList(data) {
  const list = document.getElementById('myUL');

  data.forEach(todo => {

    // create new todo for each items in the list
    const li = document.createElement('li');
    li.textContent = todo.title;

    // check status
    if (todo.completed) {
      li.classList.add('checked');
    }

    // close button
    const span = document.createElement('SPAN');
    const txt = document.createTextNode('\u00D7');
    span.className = 'close';
    span.appendChild(txt);
    li.appendChild(span);

    // append the new todo to the list
    list.appendChild(li);
  });

  // close button functionality
  const close = document.getElementsByClassName('close');
  for (let i = 0; i < close.length; i++) {
    close[i].onclick = function() {
      const div = this.parentElement;
      div.style.display = 'none';
    }
  }
}

// given content for close 
// Click on a close button to hide the current list item
var close = document.getElementsByClassName("close");
var i;
for (i = 0; i < close.length; i++) {
  close[i].onclick = function() {
    var div = this.parentElement;
    div.style.display = "none";
  }
}

// Add a "checked" symbol when clicking on a list item
var list = document.querySelector('ul');
list.addEventListener('click', function(ev) {
  if (ev.target.tagName === 'LI') {
    ev.target.classList.toggle('checked');
  }
}, false);

// Create a new list item when clicking on the "Add" button
function newElement() {
  var li = document.createElement("li");
  var inputValue = document.getElementById("myInput").value;
  var t = document.createTextNode(inputValue);
  li.appendChild(t);
  if (inputValue === '') {
    alert("You must write something!");
  } else {
    document.getElementById("myUL").appendChild(li);
  }
  document.getElementById("myInput").value = "";

  var span = document.createElement("SPAN");
  var txt = document.createTextNode("\u00D7");
  span.className = "close";
  span.appendChild(txt);
  li.appendChild(span);

  for (i = 0; i < close.length; i++) {
    close[i].onclick = function() {
      var div = this.parentElement;
      div.style.display = "none";
    }
  }
}
