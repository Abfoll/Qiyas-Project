const bookTableBody = document.querySelector('[data-book-table-body]');
const bookCountElement = document.querySelector('[data-book-count]');
const searchInput = document.querySelector('[data-search-books]');
const emptyState = document.querySelector('[data-empty-state]');
const notice = document.querySelector('[data-notice]');
const bookForm = document.querySelector('[data-book-form]');
const modal = document.querySelector('[data-book-modal]');
const modalTitle = document.querySelector('[data-modal-title]');
const submitButton = document.querySelector('[data-submit-button]');
const addButton = document.querySelector('[data-open-add-modal]');
const closeButtons = document.querySelectorAll('[data-close-modal]');
const editingIdField = document.querySelector('[data-editing-id]');

const bookFields = {
  title: document.querySelector('[name="title"]'),
  author: document.querySelector('[name="author"]'),
  category: document.querySelector('[name="category"]'),
  quantity: document.querySelector('[name="quantity"]')
};

let books = [];
let filterText = '';

function showNotice(message, isError = false) {
  if (!notice) return;
  notice.textContent = message;
  notice.classList.toggle('error', isError);
  notice.hidden = false;
}

function hideNotice() {
  if (!notice) return;
  notice.hidden = true;
  notice.textContent = '';
  notice.classList.remove('error');
}

function openModal(book = null) {
  modal.classList.add('open');
  document.body.style.overflow = 'hidden';

  if (book) {
    modalTitle.textContent = 'Update Book';
    submitButton.textContent = 'Save Changes';
    editingIdField.value = book.id;
    bookFields.title.value = book.title;
    bookFields.author.value = book.author;
    bookFields.category.value = book.category;
    bookFields.quantity.value = book.quantity;
    return;
  }

  modalTitle.textContent = 'Add New Book';
  submitButton.textContent = 'Add Book';
  editingIdField.value = '';
  bookForm.reset();
}

function closeModal() {
  modal.classList.remove('open');
  document.body.style.overflow = '';
}

function createActionButton(label, symbol, onClick) {
  const button = document.createElement('button');
  button.className = 'icon-btn';
  button.type = 'button';
  button.setAttribute('aria-label', label);
  button.textContent = symbol;
  button.addEventListener('click', onClick);
  return button;
}

function renderBooks() {
  const filteredBooks = books.filter((book) => {
    const haystack = `${book.title} ${book.author} ${book.category}`.toLowerCase();
    return haystack.includes(filterText);
  });

  bookCountElement.textContent = filteredBooks.length;
  bookTableBody.innerHTML = '';

  if (filteredBooks.length === 0) {
    emptyState.hidden = false;
    return;
  }

  emptyState.hidden = true;

  filteredBooks.forEach((book) => {
    const row = document.createElement('tr');

    row.innerHTML = `
      <td><strong>${book.title}</strong></td>
      <td>${book.author}</td>
      <td><span class="pill">${book.category}</span></td>
      <td>${book.quantity}</td>
      <td></td>
    `;

    const actionsCell = row.lastElementChild;
    const editButton = createActionButton(`Edit ${book.title}`, '✎', () => openModal(book));
    const deleteButton = createActionButton(`Delete ${book.title}`, '🗑', async () => {
      const confirmed = window.confirm(`Delete "${book.title}" from the library?`);
      if (!confirmed) return;

      await deleteBook(book.id);
    });

    actionsCell.append(editButton, deleteButton);
    bookTableBody.appendChild(row);
  });
}

async function loadBooks() {
  const response = await fetch('/api/books');
  books = await response.json();
  renderBooks();
}

async function submitBook(event) {
  event.preventDefault();

  const payload = {
    title: bookFields.title.value.trim(),
    author: bookFields.author.value.trim(),
    category: bookFields.category.value.trim(),
    quantity: Number(bookFields.quantity.value)
  };

  if (!payload.title || !payload.author || !payload.category || !Number.isInteger(payload.quantity) || payload.quantity < 0) {
    showNotice('Complete every field with a whole number quantity.', true);
    return;
  }

  const editingId = editingIdField.value;
  const isEditing = Boolean(editingId);
  const method = isEditing ? 'PUT' : 'POST';
  const endpoint = isEditing ? `/api/books/${editingId}` : '/api/books';

  const response = await fetch(endpoint, {
    method,
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(payload)
  });

  const result = await response.json();

  if (!response.ok) {
    showNotice(result.message || 'Something went wrong.', true);
    return;
  }

  await loadBooks();
  closeModal();
  showNotice(isEditing ? 'Book updated successfully.' : 'Book added successfully.');
}

async function deleteBook(id) {
  const response = await fetch(`/api/books/${id}`, { method: 'DELETE' });
  const result = await response.json();

  if (!response.ok) {
    showNotice(result.message || 'Unable to delete the book.', true);
    return;
  }

  await loadBooks();
  showNotice('Book deleted successfully.');
}

addButton?.addEventListener('click', () => {
  hideNotice();
  openModal();
});

closeButtons.forEach((button) => {
  button.addEventListener('click', closeModal);
});

modal?.addEventListener('click', (event) => {
  if (event.target === modal) {
    closeModal();
  }
});

bookForm?.addEventListener('submit', submitBook);

searchInput?.addEventListener('input', (event) => {
  filterText = event.target.value.toLowerCase().trim();
  renderBooks();
});

window.addEventListener('keydown', (event) => {
  if (event.key === 'Escape' && modal?.classList.contains('open')) {
    closeModal();
  }
});

if (bookTableBody) {
  loadBooks().catch(() => {
    showNotice('Unable to load books from the server.', true);
  });
}