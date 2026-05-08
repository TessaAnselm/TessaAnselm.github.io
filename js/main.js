async function loadComponent(id, file) {
  const res = await fetch(`components/${file}`);
  const html = await res.text();
  document.getElementById(id).innerHTML = html;
}

Promise.all([
  loadComponent('nav-placeholder',        'nav.html'),
  loadComponent('hero-placeholder',       'hero.html'),
  loadComponent('story-placeholder',      'story.html'),
  loadComponent('projects-placeholder',   'projects.html'),
  loadComponent('experience-placeholder', 'experience.html'),
  loadComponent('skills-placeholder',     'skills.html'),
  loadComponent('education-placeholder',  'education.html'),
  loadComponent('contact-placeholder',    'contact.html'),
]);
