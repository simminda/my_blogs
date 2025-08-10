// Blog metadata
const blogs = [
  { 
    id: 1, 
    title: "The Joy of Coding", 
    preview: "Why coding is more than just typing...", 
    file: "blogs/joy-of-coding.html",
    tags: ["Creativity", "Programming", "Mindset"]
  },
  { 
    id: 2, 
    title: "Interfaces", 
    preview: "Level up your front-end styling...", 
    file: "blogs/interfaces.html",
    tags: ["Interfaces", "Java", "Programming"]
  },
  { 
    id: 3, 
    title: "Concurrency", 
    preview: "Some common interview questions...", 
    file: "blogs/concurrency.html",
    tags: ["Java", "Programming"]
  }
];

const blogListEl = document.getElementById('blogList');
const blogContentEl = document.getElementById('blogContent');
const body = document.body;
const toggleBtn = document.getElementById('themeToggle');

// Load blogs into list
blogs.forEach(blog => {
  const div = document.createElement('div');
  div.className = 'blog-list-item';
  
  // Build tags HTML
  const tagsHTML = blog.tags.map(tag => 
    `<span class="tag-pill">${tag}</span>`
  ).join(' ');

  div.innerHTML = `
    <strong>${blog.title}</strong><br>
    <small>${blog.preview}</small>
    <div class="mt-1">${tagsHTML}</div>
  `;
  
  div.addEventListener('click', () => loadBlog(blog.id));
  blogListEl.appendChild(div);
});

// Load blog file
function loadBlog(id) {
  const blog = blogs.find(b => b.id === id);
  if (!blog) return;

  fetch(blog.file)
    .then(res => res.text())
    .then(data => {
      blogContentEl.innerHTML = data;
      localStorage.setItem('selectedBlog', id);
      highlightActiveBlog(id);
    })
    .catch(err => {
      blogContentEl.innerHTML = `<p>Error loading blog.</p>`;
    });
}

// Highlight active blog
function highlightActiveBlog(id) {
  document.querySelectorAll('.blog-list-item').forEach((el, index) => {
    el.classList.toggle('active', blogs[index].id === id);
  });
}

// Restore theme from localStorage
const savedTheme = localStorage.getItem('theme');
if (savedTheme) {
  body.setAttribute('data-bs-theme', savedTheme);
  toggleBtn.textContent = savedTheme === 'light' ? '🌙 Dark Mode' : '☀️ Light Mode';
}

// Restore selected blog
const savedBlogId = localStorage.getItem('selectedBlog');
if (savedBlogId) {
  loadBlog(parseInt(savedBlogId));
}

// Save scroll position before unload
window.addEventListener('beforeunload', () => {
  localStorage.setItem('scrollPosition', window.scrollY);
});

// Restore scroll position on load
window.addEventListener('load', () => {
  const scrollPosition = localStorage.getItem('scrollPosition');
  if (scrollPosition) {
    window.scrollTo(0, parseInt(scrollPosition, 10));
  }
});

// Dark mode toggle
toggleBtn.addEventListener('click', () => {
  const currentTheme = body.getAttribute('data-bs-theme');
  const newTheme = currentTheme === 'light' ? 'dark' : 'light';
  body.setAttribute('data-bs-theme', newTheme);
  toggleBtn.textContent = newTheme === 'light' ? '🌙 Dark Mode' : '☀️ Light Mode';
  localStorage.setItem('theme', newTheme);
});
