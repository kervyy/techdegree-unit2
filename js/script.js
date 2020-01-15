/******************************************
Treehouse Techdegree:
FSJS project 2 - List Filter and Pagination
Author : Cedrc Kervadec
******************************************/

/***
Global variables declaration
 - studentsList is the total list of students
 - numberShown is the number of item that should be shown per page
***/
const studentsList = document.getElementsByClassName('student-item');
const numberShown = 10;

//Selecting the page element
const page = document.querySelector('div.page');
//Creating search elements that will be used for event handling
const searchInput = document.createElement('input');
const searchButton = document.createElement('button');

/***
showPage function which displays the list items depending on the page number selected.
***/
const showPage = (list, page) => {
  const startIndex = page * numberShown - numberShown;
  const endIndex = page * numberShown;

  //Resetting the display
  for (let i = 0; i < studentsList.length; i+= 1) {
    studentsList[i].style.display = "none";
  }

  //Setting the display depending on the list parameter
  for (let i = 0; i < list.length; i += 1) {
    if (i >= startIndex & i < endIndex){
      list[i].style.display = "";
    } else {
      list[i].style.display = "none";
    }
  }
};

/***
appendPageLink function
***/
const appendPageLink = (list) => {
  //Creating div pagination element
  const pagesDiv = document.createElement('div');
  //Creating ul containing all page link elements
  const pagesList = document.createElement('ul');

  pagesDiv.className = "pagination";
  pagesDiv.appendChild(pagesList);

  if (list.length > numberShown) {
    //Loop through the pages to create, from 1 to the calculated value of pages necessary
    for (let i = 1; i <= Math.floor(list.length / numberShown) + 1; i += 1) {
      //Creating the link
      let li = document.createElement('li');
      let a = document.createElement('a');
      a.href = "#";
      a.textContent = i;

      //Initiating the active page for the first call of the function
      if (i === 1) {
        a.className = "active";
      }

      //Appending each page item to the ul
      li.appendChild(a);
      pagesList.appendChild(li);

      //Event listener on click of a page button
      a.addEventListener('click', () => {
        //Selecting all page link elements
        const links = document.querySelectorAll('div.pagination ul li a');
        //Resetting all links to not active
        for (let j = 0; j < links.length; j += 1) {
          links[j].className = "";
        }
        //Changing class of active page link
        a.className = "active";
        showPage(list, i);
      });
      //Removing pagination or no result message
      page.removeChild(page.lastChild);
      //Appending pagination
      page.appendChild(pagesDiv);
    }
  } else {
    //Masking pagination or no result message when list.length is inferior to numberShown
    page.lastChild.style.display = "none";
  }
  return pagesDiv;
};

/**
createSearchBar function that return HTML elements for the search bar
**/
const createSearchBar = () => {
  const searchDiv = document.createElement('div');

  searchDiv.className = "student-search";
  searchInput.placeholder = "Search for students...";
  searchButton.textContent = "Search";

  searchDiv.appendChild(searchInput);
  searchDiv.appendChild(searchButton);
  return searchDiv;
};
//Inserting search bar
document.querySelector('.page-header').appendChild(createSearchBar());

/**
searchStudent function to match searched string with students names
**/
const searchStudent = string => {
  const searchResults = [];
  const searched = string.toLowerCase();

  for(let k = 0; k < studentsList.length; k +=1) {
    let name = studentsList[k].children[0].children[1].textContent.toLowerCase();
    //Checking for names matching searched value
    if(name.includes(searched)) {
      //Adding the student list itemw which name matched the searched value to a list
      searchResults.push(studentsList[k]);
    }
  }
  //Chekcing if the serch is not successful
  if (searchResults.length === 0) {
    //Masking all students list items
    showPage(searchResults, 1);
    //Creating the 'no result found' element
    const noResult = document.createElement('p');
    noResult.textContent = 'No student found.';
    //Adding and ID to this element so that it is easier to select
    noResult.id = 'noresult';
    //Remove pagination or no result message
    page.removeChild(page.lastChild);
    //Displaying the 'no result' message
    page.appendChild(noResult);
  //If search is successful (at least 1 result)
  } else {
    //Display search resultes
    showPage(searchResults, 1);
    //Append corresponding pagination
    appendPageLink(searchResults);
    return searchResults;
  }
};

//Calling showPage to initiate webpage on the first students page
showPage(studentsList, 1);
// Calling appendPageLink to create pagination of student list
appendPageLink(studentsList);

// Event handler for submitting the search
searchButton.addEventListener('click', () => {
  searchStudent(searchInput.value);
});

//Event handler to dynamically show the search results on key strokes in search input
searchInput.addEventListener('keyup', () => {
  searchStudent(searchInput.value);
});
