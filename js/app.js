console.log("this is pp.js");
showNotes();
let addBtn = document.getElementById('addBtn');

addBtn.addEventListener("click", function (e) {
    //alert("clicked");
    let addTxt = document.getElementById('addTxt');
    let notes = localStorage.getItem("notes");
if(addTxt.value=="" || addTxt.value==" " || addTxt.value=="  " || addTxt.value=="   " || addTxt.value=="    ")alert("Please Add some Text to Create a New Note");
    else {
    if (notes == null) {
        notesObj = [];
    }
    else {
        notesObj = JSON.parse(notes);
    }
        let myObj = {
            title:addTitle.value,            
            text:addTxt.value
        }
        
    notesObj.push(myObj);
    localStorage.setItem("notes", JSON.stringify(notesObj));
    addTxt.value = "";
        addTitle.value="";
        
    console.log(notesObj);
    showNotes();
}});

function showNotes() {
    let notes = localStorage.getItem("notes");
    if (notes == null) {
        notesObj = [];
    }
    else {
        notesObj = JSON.parse(notes);
    }
    let html = "";
    notesObj.forEach(function (element, index) {
        html +=
            `<div class="noteCard my-2 mx-2 card" style="width:18rem;" >  
  <div class="card-body">
    <h5 class="card-title">${element.title}</h5>
    <p class="card-text">${element.text}</p>
    <button href="#" id="${index}" onclick="deleteNote(this.id)" class="btn btn-primary">Delete Note</a>
  </div>
</div>`

    });

    let notesElm = document.getElementById('notes');
    if (notesObj.length != 0) {
        notesElm.innerHTML = html;
    } else {
        notesElm.innerHTML = `Nothing to show  Use "Add a Note" above to add notes. `;
    }

}

function deleteNote(index) {
    console.log("i am deleting ", index);
    let notes = localStorage.getItem("notes");
    if (notes == null) {
        notesObj = [];
    }
    else {
        notesObj = JSON.parse(notes);
    }

    notesObj.splice(index, 1);
    localStorage.setItem("notes", JSON.stringify(notesObj));
    showNotes();

}

let search = document.getElementById('searchTxt');
search.addEventListener("input", function () {
    console.log('input fired');
    let inputVal = search.value.toLowerCase();
    let noteCards = document.getElementsByClassName('noteCard');
    Array.from(noteCards).forEach(function (element) {
        let cardTxt = element.getElementsByTagName("p")[0].innerText;
 
        let cardTitle = element.getElementsByTagName("h5")[0].innerText;
        //alert(ttl);
       var s = cardTxt;
        s=s.toLowerCase();
        //alert(ttl);
        var str = cardTitle;
        str=str.toLowerCase();
        //if(str.includes(inputVal))alert(str);
        if (s.includes(inputVal) || str.includes(inputVal)) {
            element.style.display = "block";
        }
        else {
            element.style.display = "none";
        }
    });
});
