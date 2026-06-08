const navToggle = document.querySelector(".nav-toggle");
const siteNav = document.querySelector(".site-nav");
const navMenu = document.querySelector(".nav-menu");
const navMenuButton = document.querySelector(".nav-menu-button");
const searchDialog = document.querySelector("[data-search-dialog]");
const searchOpen = document.querySelector("[data-search-open]");
const searchClose = document.querySelector("[data-search-close]");
const searchInput = document.querySelector("[data-search-input]");
const searchResults = document.querySelector("[data-search-results]");
const contactForm = document.querySelector("[data-contact-form]");
const formStatus = document.querySelector("[data-form-status]");

const pages = [
  { title: "Trang chủ", url: "#home", text: "Portfolio Lê Ngọc Khánh học công nghệ AI" },
  { title: "Về Portfolio", url: "#about-portfolio", text: "Giới thiệu mục tiêu hệ thống hóa kiến thức lưu giữ sản phẩm học tập" },
  { title: "Về mình", url: "#about-me", text: "Giới thiệu Lê Ngọc Khánh khoa học dữ liệu trí tuệ nhân tạo học tập" },
  { title: "Chương 1", url: "assets/pdfs/chapter-1.pdf", text: "Máy tính thiết bị ngoại vi công cụ học tập PDF" },
  { title: "Chương 2", url: "assets/pdfs/chapter-2.pdf", text: "Dữ liệu thông tin đánh giá nguồn PDF" },
  { title: "Chương 3", url: "assets/pdfs/chapter-3.pdf", text: "Trí tuệ nhân tạo AI mô hình dữ liệu PDF" },
  { title: "Chương 4", url: "assets/pdfs/chapter-4.pdf", text: "Giao tiếp hợp tác môi trường số PDF" },
  { title: "Chương 5", url: "assets/pdfs/chapter-5.pdf", text: "Sáng tạo nội dung số trình bày PDF" },
  { title: "Chương 6", url: "assets/pdfs/chapter-6.pdf", text: "An toàn liêm chính học thuật trích dẫn AI PDF" },
  { title: "Tổng kết", url: "#summary", text: "Nhìn lại hành trình tư duy số" },
  { title: "Kết nối", url: "#contact", text: "Liên hệ gửi lời nhắn" },
];

navToggle?.addEventListener("click", () => {
  const isOpen = siteNav.classList.toggle("is-open");
  navToggle.setAttribute("aria-expanded", String(isOpen));
});

navMenuButton?.addEventListener("click", () => {
  const isOpen = navMenu.classList.toggle("is-open");
  navMenuButton.setAttribute("aria-expanded", String(isOpen));
});

document.addEventListener("click", (event) => {
  if (!navMenu?.contains(event.target)) {
    navMenu?.classList.remove("is-open");
    navMenuButton?.setAttribute("aria-expanded", "false");
  }
});

siteNav?.addEventListener("click", (event) => {
  if (event.target.matches("a")) {
    siteNav.classList.remove("is-open");
    navToggle?.setAttribute("aria-expanded", "false");
  }
});

function renderSearchResults(query = "") {
  if (!searchResults) {
    return;
  }

  const normalizedQuery = query.trim().toLowerCase();
  const matches = normalizedQuery
    ? pages.filter((page) => `${page.title} ${page.text}`.toLowerCase().includes(normalizedQuery))
    : pages;

  searchResults.innerHTML = matches.length
    ? matches
        .map((page) => {
          const target = page.url.endsWith(".pdf") ? ' target="_blank" rel="noopener"' : "";
          return `<a href="${page.url}"${target} data-search-link>${page.title}<br><small>${page.text}</small></a>`;
        })
        .join("")
    : "<p>Không tìm thấy nội dung phù hợp.</p>";
}

function openSearch() {
  if (!searchDialog) {
    return;
  }

  searchDialog.removeAttribute("hidden");
  renderSearchResults();
  requestAnimationFrame(() => searchInput?.focus());
}

function closeSearch() {
  if (!searchDialog) {
    return;
  }

  searchDialog.setAttribute("hidden", "");
  if (searchInput) {
    searchInput.value = "";
  }
}

searchOpen?.addEventListener("click", openSearch);
searchClose?.addEventListener("click", closeSearch);
searchInput?.addEventListener("input", () => renderSearchResults(searchInput.value));
searchResults?.addEventListener("click", (event) => {
  if (event.target.closest("[data-search-link]")) {
    closeSearch();
  }
});

document.addEventListener("keydown", (event) => {
  if (event.key === "Escape" && searchDialog && !searchDialog.hidden) {
    closeSearch();
  }
});

searchDialog?.addEventListener("click", (event) => {
  if (event.target === searchDialog) {
    closeSearch();
  }
});

contactForm?.addEventListener("submit", (event) => {
  event.preventDefault();
  const formData = new FormData(contactForm);
  const name = String(formData.get("name") || "").trim();
  formStatus.textContent = `Cảm ơn ${name || "bạn"}, lời nhắn đã được ghi nhận trong bản mẫu.`;
  contactForm.reset();
});
