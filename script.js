// Project data - edit this array to add your projects.
// Each project object: { title, description, tags:[], live, demo, github, category, isMain }
// If a URL is missing, the corresponding button will be disabled.
const projects = [
  {
    title: "Fully Voice Controlled Videos Streaming Platform",
    description: "Built a fully voice-controlled video streaming platform enabling hands-free playback and navigation with voice search, page navigation (Home, History, Music, Playlists, Settings, Sign-in/Sign-up/Logout), scrolling, playback control (play/pause, volume, speed, seek ±10s, fullscreen, Picture-in-Picture), and voice-based commenting, liking, and subscribing through robust voice recognition and intent parsing.",
    tags: ["MERN", "Real-Time Speech Processing"],
    live: "https://voice-controll-streaming-platform.onrender.com/",
    demo: "https://youtu.be/n8WbZHy4rmg?si=DGHjB9JFn77nrCIG",
    github: "https://github.com/vivekanand04/voice-controll-streaming-platform",
    category: "web",
  
  },
  {
    title: "AI-Powered Healthcare Discovery Platform ",
    description: "Developed an AI-driven healthcare platform that lets patients and researchers discover personalized trials, publications, and experts via natural language input, featuring AI-based condition recognition, auto research summaries, smart meeting logic, real-time chat, and secure collaboration.",
    tags: [ "PostgrSQL", "Express", "React", "NLP"],
    live: "https://curalink-frontend-h970.onrender.com/",
    demo: "https://curalink-frontend-h970.onrender.com/",
    github: "https://github.com/vivekanand04/AI-Powered-Healthcare-Discovery-Platform-",
    category: "web",
  
  },
  {
    title: "Game4Sell – Platform for Selling Self-Built Games",
    description: "Co-developed a web-based e-commerce platform to sell 12+ self-built interactive games designed exclusively for children, enhancing learning and entertainment through user-centered design and Agile iterative development.",
    tags: ["React", "Frontend"],
    live: "https://game4sell.vercel.app/",
    demo: "https://game4sell.vercel.app/",
    github: "https://github.com/vivekanand04/Game4Sell",
    category: "web",
  
  }
];

function el(sel){return document.querySelector(sel)}
const projectsRoot = el('#projects');
const template = el('#card-template');

function render(filterText='', filterCategory='all'){
  projectsRoot.innerHTML = '';
  const q = filterText.trim().toLowerCase();
  let list = projects.filter(p=>{
    if(filterCategory !== 'all' && p.category !== filterCategory) return false;
    if(!q) return true;
    return (p.title + ' ' + p.description + ' ' + (p.tags||[]).join(' ')).toLowerCase().includes(q);
  });

  // Put main projects first
  // list = list.sort((a,b)=> ((b.isMain?1:0) - (a.isMain?1:0)));

  if(list.length === 0){
    projectsRoot.innerHTML = '<p style="color:var(--muted)">No projects found — try clearing filters.</p>';
    return;
  }

  list.forEach(p=>{
    const node = template.content.cloneNode(true);
    const card = node.querySelector('.card');
    const titleEl = node.querySelector('.card-title');
    const descEl = node.querySelector('.card-desc');
    const tagsEl = node.querySelector('.card-tags');
    const liveBtn = node.querySelector('.btn-live');
    const demoBtn = node.querySelector('.btn-demo');
    const ghBtn = node.querySelector('.btn-gh');
    // const badge = node.querySelector('.main-badge');

    // // Main project visual
    // if(p.isMain){
    //   card.classList.add('main');
    //   badge.style.display = 'inline-block';
    // }

    titleEl.textContent = p.title;
    descEl.textContent = p.description;
    // clear tags (template reused)
    tagsEl.innerHTML = '';
    (p.tags||[]).forEach(t=>{
      const s = document.createElement('span');
      s.className = 'tag';
      s.textContent = t;
      tagsEl.appendChild(s);
    });

    // Live button
    if(p.live){
      liveBtn.setAttribute('href', p.live);
      liveBtn.style.opacity = '';
      liveBtn.style.pointerEvents = '';
    } else {
      liveBtn.removeAttribute('href');
      liveBtn.style.opacity = '0.5';
      liveBtn.style.pointerEvents = 'none';
    }

    // Demo (YouTube) button
    if(p.demo){
      demoBtn.setAttribute('href', p.demo);
      demoBtn.style.opacity = '';
      demoBtn.style.pointerEvents = '';
    } else {
      demoBtn.removeAttribute('href');
      demoBtn.style.opacity = '0.5';
      demoBtn.style.pointerEvents = 'none';
    }

    // GitHub button
    if(p.github){
      ghBtn.setAttribute('href', p.github);
      ghBtn.style.opacity = '';
      ghBtn.style.pointerEvents = '';
    } else {
      ghBtn.removeAttribute('href');
      ghBtn.style.opacity = '0.5';
      ghBtn.style.pointerEvents = 'none';
    }

    projectsRoot.appendChild(node);
  });
}

el('#search').addEventListener('input', ev=>{
  render(ev.target.value, el('#filter').value);
});
el('#filter').addEventListener('change', ev=>{
  render(el('#search').value, ev.target.value);
});

// initial render
render();
