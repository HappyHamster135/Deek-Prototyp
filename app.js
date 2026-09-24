(() => {
  'use strict';
  const $ = (selector) => document.querySelector(selector);
  const categoryNames = { pump: 'Pumpar & blandare', lift: 'Hissar & lyft', parts: 'Reservdelar & tillbehör' };
  let category = 'all';
  let expanded = false;
  let activeTrigger = null;
  const grid = $('#product-grid');
  const search = $('#search');
  const normalize = value => value.toLocaleLowerCase('sv').normalize('NFD').replace(/[\u0300-\u036f]/g, '');

  function renderProducts() {
    const term = normalize(search.value.trim());
    const filtered = PRODUCTS.filter(product => (category === 'all' || product.category === category) && normalize(`${product.title} ${product.short} ${product.description} ${categoryNames[product.category]}`).includes(term));
    const items = !expanded && category === 'all' && !term ? filtered.slice(0, 3) : filtered;
    grid.innerHTML = items.map(product => `<article class="product-card"><button class="product-open" data-product="${product.id}" aria-label="Visa ${product.title}"><span class="product-image"><img src="assets/${product.image}" alt="${product.title}" loading="lazy" width="500" height="360"></span><h3 class="product-title">${product.title}</h3><p class="product-category">${categoryNames[product.category].toUpperCase()}</p><p class="product-description">${product.short}</p><span class="circle-arrow" aria-hidden="true"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.4" stroke-linecap="round" stroke-linejoin="round"><path d="M4 12h16m-6-6 6 6-6 6"/></svg></span></button></article>`).join('');
    $('#result-count').textContent = filtered.length ? `Visar ${items.length} av ${filtered.length} produkter` : '0 produkter';
    $('#empty-state').hidden = filtered.length > 0;
    $('#show-all').hidden = category !== 'all' || Boolean(term);
    $('#show-all').innerHTML = expanded ? 'Visa färre produkter <span aria-hidden="true">↑</span>' : 'Visa alla produkter <span aria-hidden="true">↓</span>';
    document.querySelectorAll('[data-filter]').forEach(button => { const selected = button.dataset.filter === category; button.classList.toggle('active', selected); button.setAttribute('aria-pressed', String(selected)); });
  }
  function setCategory(value) { category = value; expanded = false; search.value = ''; renderProducts(); }
  function closeNavigation() { $('#navigation').classList.remove('open'); $('.menu-toggle').setAttribute('aria-expanded', 'false'); }
  function openDialog(dialog, trigger) {
    activeTrigger = trigger || document.activeElement;
    document.querySelectorAll('dialog[open]').forEach(item => item.close());
    dialog.showModal();
    document.body.classList.add('modal-open');
    dialog.scrollTop = 0;
  }
  function openProduct(id, trigger) {
    const product = PRODUCTS.find(item => item.id === id);
    if (!product) return;
    $('#product-detail').innerHTML = `<div class="product-detail-layout"><div class="detail-image"><img src="assets/${product.image}" alt="${product.title}"></div><div class="detail-copy"><p class="small-label">${categoryNames[product.category]}</p><h2 id="product-title">${product.title}</h2><p>${product.description}</p>${product.specs.length ? `<table aria-label="Tekniska uppgifter"><tbody>${product.specs.map(([key, value]) => `<tr><th scope="row">${key}</th><td>${value}</td></tr>`).join('')}</tbody></table>` : ''}<div class="detail-actions"><button class="button yellow" data-product-contact="${product.id}">Fråga om produkten <span aria-hidden="true">↗</span></button>${product.document ? `<a class="button outline" href="assets/docs/${product.document}" target="_blank" rel="noopener">${product.documentLabel || 'Öppna produktblad'} <span aria-hidden="true">↓</span></a>` : ''}</div></div></div>`;
    openDialog($('#product-dialog'), trigger);
  }
  function openContact(productId, trigger) {
    const product = PRODUCTS.find(item => item.id === productId);
    $('#contact-form').hidden = false; $('#draft').hidden = true;
    if (product) { $('#contact-form').elements.subject.value = product.category === 'parts' ? 'Reservdelar & service' : 'Prisförfrågan'; $('#contact-form').elements.message.value = `Hej! Jag vill veta mer om ${product.title}.\n\n`; }
    closeNavigation();
    openDialog($('#contact-dialog'), trigger);
  }
  document.addEventListener('click', event => {
    const productButton = event.target.closest('[data-product]');
    if (productButton) openProduct(productButton.dataset.product, productButton);
    const filterButton = event.target.closest('[data-filter]');
    if (filterButton) setCategory(filterButton.dataset.filter);
    const categoryLink = event.target.closest('[data-category]');
    if (categoryLink) setCategory(categoryLink.dataset.category);
    const contactButton = event.target.closest('[data-contact], [data-product-contact]');
    if (contactButton) openContact(contactButton.dataset.productContact, contactButton.closest('dialog') ? activeTrigger : contactButton);
    const closeButton = event.target.closest('[data-close]');
    if (closeButton) closeButton.closest('dialog').close();
    const infoButton = event.target.closest('[data-info]');
    if (infoButton) {
      closeNavigation();
      $('#info-content').innerHTML = `<p class="small-label">OM TUMAC</p><h2 id="info-title">Utrustning med<br>ett tydligt jobb.</h2><p>Tumacs sortiment omfattar pumpar, blandare, hissar och lyftutrustning för bygg och industri. Här kan du hitta produktinformation och dokument för att komma vidare med ditt projekt.</p><p>Kontakta Tumac för aktuellt sortiment, speciallösningar och uthyrning.</p><button class="button yellow" data-contact>Prata med oss <span aria-hidden="true">↗</span></button>`;
      openDialog($('#info-dialog'), infoButton);
    }
  });
  search.addEventListener('input', renderProducts);
  $('#reset-search').addEventListener('click', () => { setCategory('all'); search.focus(); });
  $('#show-all').addEventListener('click', () => { expanded = !expanded; renderProducts(); if (!expanded) $('#produkter').scrollIntoView({behavior:'smooth'}); });
  $('.menu-toggle').addEventListener('click', () => { const open = $('#navigation').classList.toggle('open'); $('.menu-toggle').setAttribute('aria-expanded', String(open)); });
  $('#navigation').addEventListener('click', event => { if (event.target.closest('a')) closeNavigation(); });
  document.addEventListener('keydown', event => { if (event.key === 'Escape') closeNavigation(); });
  document.querySelectorAll('dialog').forEach(dialog => {
    dialog.addEventListener('click', event => { if (event.target === dialog) { const rect = dialog.getBoundingClientRect(); if (event.clientX < rect.left || event.clientX > rect.right || event.clientY < rect.top || event.clientY > rect.bottom) dialog.close(); } });
    dialog.addEventListener('close', () => { if (!document.querySelector('dialog[open]')) { document.body.classList.remove('modal-open'); if (activeTrigger?.isConnected) activeTrigger.focus(); } });
  });
  $('#contact-form').addEventListener('submit', event => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const name = String(data.get('name')).trim(); const message = String(data.get('message')).trim();
    if (!name || !message) { const input = event.currentTarget.elements[!name ? 'name' : 'message']; input.setCustomValidity('Fyll i text, inte bara blanksteg.'); input.reportValidity(); input.addEventListener('input', () => input.setCustomValidity(''), { once:true }); return; }
    const body = `${message}\n\nNamn: ${name}\nFöretag: ${String(data.get('company')).trim() || '–'}\nE-post: ${data.get('email')}`;
    $('#draft-text').textContent = body;
    $('#mail-link').href = `mailto:info@tumac.se?subject=${encodeURIComponent('Förfrågan: ' + data.get('subject'))}&body=${encodeURIComponent(body)}`;
    $('#contact-form').hidden = true; $('#draft').hidden = false; $('#draft-title').focus();
  });
  $('#edit-draft').addEventListener('click', () => { $('#contact-form').hidden = false; $('#draft').hidden = true; $('#contact-form').elements.name.focus(); });
  $('#year').textContent = new Date().getFullYear();
  renderProducts();
})();
