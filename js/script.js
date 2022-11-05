// Call functions

/* The function to display the contents of the page. It sets the default index values for how long each page should be. Uses a for loop to print up to 9 items on the page
depending on how long the provided data loop is.

It also includes a conditional inside the loop to modify the endIndex variable so this function isn't trying to create list items that don't exist.
*/
const showPage = (list, page) => {
   const startIndex = page * 9 - 9;
  let endIndex = page * 9;
  const students = document.querySelector('.student-list');

  students.innerHTML = '';
   for (let i = startIndex; i >= startIndex && i < endIndex; i++) {
      if(endIndex > list.length) {
         const diff = endIndex - list.length;
         endIndex -= diff;
      }
      const student = `
    <li class="student-item cf">
      <div class="student-details">
        <img class="avatar" src="${list[i].picture.large}" alt="Profile Picture">
        <h3>${list[i].name.first} ${list[i].name.last}</h3>
        <span class="email">${list[i].email}</span>
      </div>
      <div class="joined-details">
        <span class="date">Joined ${list[i].registered.date}</span>
      </div>
    </li>`;
    students.insertAdjacentHTML('beforeend', student);
   }
}

/*
Separates my data into "pages" of 9 or less items per page and enables users to move between items using page buttons at the bottom of the page.
Adds an active class to the button with the text of "1" by default but changes the active button when the user clicks to move to another page.
*/

const addPagination = (list) => {
   let numOfPages = Math.ceil(list.length/9);

   const pageBtnNum = document.querySelector(".link-list");
   pageBtnNum.innerHTML = '';

   for(let i = 0; i < numOfPages; i++) {
      let list = document.createElement('li');
      let btn = document.createElement('button');
      btn.type = 'button';
      btn.textContent = `${i+1}`;
      list.append(btn);
      pageBtnNum.append(list);
   }
   if(pageBtnNum.firstElementChild) {
      pageBtnNum.firstElementChild.firstElementChild.className = 'active';
   }

   pageBtnNum.addEventListener("click", (event) => {
      let target = event.target;
      if (target.tagName === "BUTTON") {
        for (let i = 0; i < pageBtnNum.children.length; i++) {
          pageBtnNum.children[i].firstElementChild.className = "";
          if (target.className != "active") {
            target.className = "active";
          }
        }
        showPage(list, target.textContent);
      }
    });
}
/*
The initial render for my html search bar. The plan is to eventually have it search through the rendered data and only display the parats with a name that matches
what was searched for. As of right now, it just exists and doesn't actually do anything.
*/
const searchBar = () => {
   let search = document.createElement('div');
   search.innerHTML = `
   <label for="search" class="student-search">
  <span>Search by name</span>
  <input id="search" placeholder="Search by name...">
  <button type="button"><img src="img/icn-search.svg" alt="Search icon"></button>
</label>`;
document.querySelector('header').appendChild(search);

}

addPagination(data);
showPage(data, 1);
searchBar();
