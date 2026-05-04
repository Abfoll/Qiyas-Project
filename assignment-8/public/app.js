const state = {
  users: {
    page: 1,
    limit: 5,
    totalPages: 1,
  },
  products: {
    page: 1,
    limit: 5,
    totalPages: 1,
    filters: {
      type: '',
      minPrice: '',
      maxPrice: '',
    },
  },
};

async function fetchJSON(url) {
  const response = await fetch(url);
  if (!response.ok) {
    throw new Error('Request failed');
  }
  return response.json();
}

function renderUsers(result) {
  const list = document.getElementById('userList');
  const info = document.getElementById('usersPageInfo');
  const meta = document.getElementById('usersMeta');

  list.innerHTML = '';
  result.data.forEach((user) => {
    const item = document.createElement('li');
    item.textContent = `${user.name} | ${user.email} | ${user.city}`;
    list.appendChild(item);
  });

  info.textContent = `Page ${result.meta.page} of ${result.meta.totalPages}`;
  meta.textContent = `Showing ${result.meta.count} of ${result.meta.total} users`;

  document.getElementById('usersPrev').disabled = !result.meta.hasPrev;
  document.getElementById('usersNext').disabled = !result.meta.hasNext;

  state.users.page = result.meta.page;
  state.users.totalPages = result.meta.totalPages;
}

function renderProducts(result) {
  const list = document.getElementById('productList');
  const info = document.getElementById('productsPageInfo');
  const meta = document.getElementById('productsMeta');

  list.innerHTML = '';
  result.data.forEach((product) => {
    const item = document.createElement('li');
    item.textContent = `${product.name} | ${product.type} | PKR ${product.price}`;
    list.appendChild(item);
  });

  info.textContent = `Page ${result.meta.page} of ${result.meta.totalPages}`;
  meta.textContent = `Showing ${result.meta.count} of ${result.meta.total} products`;

  document.getElementById('productsPrev').disabled = !result.meta.hasPrev;
  document.getElementById('productsNext').disabled = !result.meta.hasNext;

  state.products.page = result.meta.page;
  state.products.totalPages = result.meta.totalPages;
}

async function loadStats() {
  const stats = await fetchJSON('/api/stats');
  document.getElementById('totalUsers').textContent = String(stats.userCount);
  document.getElementById('totalProducts').textContent = String(stats.productCount);
}

async function loadUsers() {
  const { page, limit } = state.users;
  const result = await fetchJSON(`/api/users?page=${page}&limit=${limit}`);
  renderUsers(result);
}

function buildProductQuery() {
  const { page, limit, filters } = state.products;
  const params = new URLSearchParams({
    page: String(page),
    limit: String(limit),
  });

  if (filters.type) {
    params.set('type', filters.type);
  }

  if (filters.minPrice) {
    params.set('minPrice', filters.minPrice);
  }

  if (filters.maxPrice) {
    params.set('maxPrice', filters.maxPrice);
  }

  return params.toString();
}

async function loadProducts() {
  const query = buildProductQuery();
  const result = await fetchJSON(`/api/products?${query}`);
  renderProducts(result);
}

function setupEvents() {
  document.getElementById('usersPrev').addEventListener('click', async () => {
    if (state.users.page > 1) {
      state.users.page -= 1;
      await loadUsers();
    }
  });

  document.getElementById('usersNext').addEventListener('click', async () => {
    if (state.users.page < state.users.totalPages) {
      state.users.page += 1;
      await loadUsers();
    }
  });

  document.getElementById('productsPrev').addEventListener('click', async () => {
    if (state.products.page > 1) {
      state.products.page -= 1;
      await loadProducts();
    }
  });

  document.getElementById('productsNext').addEventListener('click', async () => {
    if (state.products.page < state.products.totalPages) {
      state.products.page += 1;
      await loadProducts();
    }
  });

  document.getElementById('productFilterForm').addEventListener('submit', async (event) => {
    event.preventDefault();

    state.products.filters.type = document.getElementById('typeFilter').value;
    state.products.filters.minPrice = document.getElementById('minPriceFilter').value.trim();
    state.products.filters.maxPrice = document.getElementById('maxPriceFilter').value.trim();
    state.products.page = 1;

    await loadProducts();
  });

  document.getElementById('clearFilters').addEventListener('click', async () => {
    document.getElementById('typeFilter').value = '';
    document.getElementById('minPriceFilter').value = '';
    document.getElementById('maxPriceFilter').value = '';

    state.products.filters = {
      type: '',
      minPrice: '',
      maxPrice: '',
    };
    state.products.page = 1;

    await loadProducts();
  });
}

async function init() {
  setupEvents();

  try {
    await Promise.all([loadStats(), loadUsers(), loadProducts()]);
  } catch (error) {
    console.error(error);
    alert('Unable to load data. Check the server and refresh the page.');
  }
}

init();
