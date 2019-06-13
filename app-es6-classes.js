// Variables
const bookForm = document.getElementById('book-form');
const list = document.getElementById('book-list');
const uiTitle = document.getElementById('title');
const uiAuthor = document.getElementById('author');
const uiIsbn = document.getElementById('isbn');

// Constructor Classes

class Book {
  constructor(title, author, isbn) {
    this.title = title;
    this.author = author;
    this.isbn = isbn;
  }
}

class UI {
  // show alerts when called
  showAlert(mssg, className) {
    const div = document.createElement('div');
    div.className = `alert ${className}`;
    div.appendChild(document.createTextNode(mssg));
    const container = document.querySelector('.container');
    const form = document.getElementById('book-form');
    container.insertBefore(div, form);
    // timeout after 3 seconds
    setTimeout(function() {
      document.querySelector('.alert').remove();
    }, 3000);
  }

  addBookToList(book) {
    const row = document.createElement('tr');
    row.innerHTML = `
    <td>${book.title}</td>
    <td>${book.author}</td>
    <td>${book.isbn}</td>
    <td><a href="#" class="delete">X</a></td>
  `;
    list.appendChild(row);
  }

  clearFields() {
    uiTitle.value = '';
    uiAuthor.value = '';
    uiIsbn.value = '';
  }

  deleteBook(target) {
    if (target.className === 'delete') {
      target.parentElement.parentElement.remove();
    }
  }
}

// Event Listener for Add Book
bookForm.addEventListener('submit', function(e) {
  // get user-entered form values
  const title = uiTitle.value,
    author = uiAuthor.value,
    isbn = uiIsbn.value;

  // Instantiate a new Book
  const book = new Book(title, author, isbn);

  // Instantiate userInterface
  const userInterface = new UI();

  // Validate entries
  if (title === '' || author === '' || isbn === '') {
    // Error alert
    userInterface.showAlert('Please fill in all of the fields', 'error');
  } else {
    // Add book to list
    userInterface.addBookToList(book);

    // show success
    userInterface.showAlert('Book Added!', 'success');

    // Clear form entry fields
    userInterface.clearFields();
  }

  e.preventDefault();
});

// Event Listener for delete
list.addEventListener('click', function(e) {
  // Instantiate userInterface
  const userInterface = new UI();

  userInterface.deleteBook(e.target);
  userInterface.showAlert('Book removed', 'success');

  e.preventDefault();
});

// TODO fix issue where multiple alerts can be inserted (my preference would be to have new messages blink in and override the previous message).
// TODO event listener for delete message - does that pop up if I click anywhere???
