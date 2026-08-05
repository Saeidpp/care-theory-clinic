const menuButton = document.querySelector('.menu-toggle');
const nav = document.querySelector('.nav-links');

if (menuButton && nav) {
  menuButton.addEventListener('click', () => {
    const open = nav.classList.toggle('open');
    menuButton.setAttribute('aria-expanded', String(open));
  });

  nav.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => {
      nav.classList.remove('open');
      menuButton.setAttribute('aria-expanded', 'false');
    });
  });
}

document.querySelectorAll('#year').forEach(el => {
  el.textContent = new Date().getFullYear();
});

const items = document.querySelectorAll('.reveal');
if ('IntersectionObserver' in window) {
  const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.1 });
  items.forEach(item => observer.observe(item));
} else {
  items.forEach(item => item.classList.add('visible'));
}


async function loadBeforeAfterGallery() {
  const gallery = document.querySelector('#before-after-gallery');
  if (!gallery) return;

  const owner = gallery.dataset.githubOwner;
  const repo = gallery.dataset.githubRepo;
  const path = gallery.dataset.githubPath;
  const allowedExtensions = /\.(avif|gif|jpe?g|png|webp)$/i;

  const fallbackImages = [
    'assets/before-after/before-after-01.jpeg',
    'assets/before-after/before-after-02.jpeg',
    'assets/before-after/before-after-03.jpeg'
  ];

  const renderImages = (images) => {
    gallery.innerHTML = '';

    if (!images.length) {
      gallery.innerHTML = '<p class="gallery-empty">Before-and-after results will be added shortly.</p>';
      return;
    }

    images
      .sort((a, b) => a.name.localeCompare(b.name, undefined, { numeric: true }))
      .forEach((image, index) => {
        const figure = document.createElement('figure');
        figure.className = 'result-card reveal visible';

        const img = document.createElement('img');
        img.src = image.url;
        img.alt = `Care Theory Clinic before-and-after result ${index + 1}`;
        img.loading = 'lazy';
        img.decoding = 'async';

        const caption = document.createElement('figcaption');
        caption.textContent = 'Individual results may vary. Images published with permission.';

        figure.append(img, caption);
        gallery.appendChild(figure);
      });
  };

  try {
    const apiUrl = `https://api.github.com/repos/${owner}/${repo}/contents/${path}`;
    const response = await fetch(apiUrl, {
      headers: { Accept: 'application/vnd.github+json' }
    });

    if (!response.ok) throw new Error(`GitHub returned ${response.status}`);

    const files = await response.json();
    const images = files
      .filter(file => file.type === 'file' && allowedExtensions.test(file.name))
      .map(file => ({ name: file.name, url: file.download_url }));

    renderImages(images);
  } catch (error) {
    console.warn('Automatic gallery loading failed; using local fallback images.', error);
    renderImages(
      fallbackImages.map((url, index) => ({
        name: `before-after-${String(index + 1).padStart(2, '0')}.jpeg`,
        url
      }))
    );
  }
}

loadBeforeAfterGallery();
