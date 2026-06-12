// ==========================================================================
// ANIMAÇÃO DE REVEAL AO SCROLL
// ==========================================================================
const cards = document.querySelectorAll('.card, .music-card, .look-card');

function revealCards(){
  cards.forEach(card => {
    const cardTop = card.getBoundingClientRect().top;
    if(cardTop < window.innerHeight - 80){
      card.classList.add('show');
    }
  });
}

if(cards.length > 0) {
  window.addEventListener('scroll', revealCards);
  window.addEventListener('load', revealCards);
}

// ==========================================================================
// BOTÃO VOLTAR AO TOPO
// ==========================================================================
const topo = document.querySelector('.topo');
if(topo){
  topo.style.opacity = '0';
  topo.style.pointerEvents = 'none';
  topo.style.transition = '.4s';

  window.addEventListener('scroll', ()=>{
    if(window.scrollY > 300){
      topo.style.opacity = '1';
      topo.style.pointerEvents = 'all';
    } else {
      topo.style.opacity = '0';
      topo.style.pointerEvents = 'none';
    }
  });
}

// ==========================================================================
// CABEÇALHO SCROLLED
// ==========================================================================
const header = document.querySelector('header');
if(header) {
  window.addEventListener('scroll', ()=>{
    if(window.scrollY > 50){
      header.classList.add('scrolled');
    } else {
      header.classList.remove('scrolled');
    }
  });
}

// ==========================================================================
// FORMULÁRIO DE CONTATO
// ==========================================================================
const form = document.getElementById('contactForm');
const statusMsg = document.getElementById('status');
if(form && statusMsg){
  form.addEventListener('submit', function(e){
    e.preventDefault();
    const nome = document.getElementById('nome').value;
    statusMsg.textContent = 'Obrigado pela mensagem, ' + nome + '! ✨';
    form.reset();
  });
}

// ==========================================================================
// LÓGICA INTERATIVA DA LOJA (CARRINHO)
// ==========================================================================
let totalCart = 0;
const cartItemsElement = document.getElementById('cart-items');
const totalValElement = document.getElementById('total-val');
const btnClear = document.getElementById('btn-clear');
const btnAddList = document.querySelectorAll('.btn-add');

function updateTotalDisplay() {
  if(totalValElement) {
    totalValElement.textContent = `R$ ${totalCart.toFixed(2).replace('.', ',')}`;
  }
}

if (cartItemsElement) {
  btnAddList.forEach(button => {
    button.addEventListener('click', () => {
      const name = button.getAttribute('data-name');
      const price = parseFloat(button.getAttribute('data-price'));

      const emptyMsg = cartItemsElement.querySelector('.empty-cart');
      if (emptyMsg) emptyMsg.remove();

      const li = document.createElement('li');
      li.className = 'cart-item';
      li.title = 'Clique para remover este item';
      li.innerHTML = `<span>❌ ${name}</span> <span>R$ ${price.toFixed(2).replace('.', ',')}</span>`;
      
      li.addEventListener('click', () => {
        li.remove();
        totalCart -= price;
        if (totalCart < 0.01) totalCart = 0;
        updateTotalDisplay();

        if (cartItemsElement.children.length === 0) {
          cartItemsElement.innerHTML = '<li class="empty-cart">Seu carrinho está vazio...</li>';
        }
      });

      cartItemsElement.appendChild(li);
      totalCart += price;
      updateTotalDisplay();
    });
  });

  if (btnClear) {
    btnClear.addEventListener('click', () => {
      cartItemsElement.innerHTML = '<li class="empty-cart">Seu carrinho está vazio...</li>';
      totalCart = 0;
      updateTotalDisplay();
    });
  }
}

// ==========================================================================
// GERADOR DE CONFETES LARANJAS (HOME)
// ==========================================================================
const container = document.getElementById('confetti-container');
if (container) {
  container.style.position = 'relative';

  setInterval(() => {
    const confetti = document.createElement('div');
    confetti.classList.add('confetti');
    confetti.style.left = Math.random() * 100 + '%';
    
    const size = Math.random() * 6 + 6;
    confetti.style.width = size + 'px';
    confetti.style.height = size + 'px';
    
    const colors = ['#ff7300', '#ff9100', '#ffaa00', '#e65c00'];
    confetti.style.background = colors[Math.floor(Math.random() * colors.length)];
    confetti.style.animationDuration = Math.random() * 2 + 2.5 + 's';

    container.appendChild(confetti);

    setTimeout(() => { confetti.remove(); }, 4500);
  }, 350);
}

// ==========================================================================
// FILTRO DE ERAS INTERATIVO (BIOGRAFIA)
// ==========================================================================
const filterButtons = document.querySelectorAll('.filter-btn');
const bioParagraphs = document.querySelectorAll('.bio-paragraph');

if (filterButtons.length > 0 && bioParagraphs.length > 0) {
  filterButtons.forEach(button => {
    button.addEventListener('click', () => {
      filterButtons.forEach(btn => btn.classList.remove('active'));
      button.classList.add('active');

      const filterValue = button.getAttribute('data-filter');

      bioParagraphs.forEach(para => {
        const era = para.getAttribute('data-era');

        if (filterValue === 'all' || filterValue === era) {
          para.classList.remove('hide');
          setTimeout(() => {
            para.style.opacity = '1';
            para.style.transform = 'translateY(0)';
          }, 10);
        } else {
          para.classList.add('hide');
          para.style.opacity = '0';
          para.style.transform = 'translateY(10px)';
        }
      });
    });
  });
}

// ==========================================================================
// LIGHTBOX (GALERIA)
// ==========================================================================
const lookCards = document.querySelectorAll('.look-card');
const lightbox = document.getElementById('lightbox');
const lightboxImg = document.getElementById('lightbox-img');
const lightboxClose = document.getElementById('lightbox-close');
const lightboxCaption = document.getElementById('lightbox-caption');

if (lookCards.length > 0 && lightbox) {
  lookCards.forEach(card => {
    card.addEventListener('click', () => {
      const img = card.querySelector('img');
      const title = card.querySelector('.overlay h3');

      if (img) {
        lightboxImg.src = img.src;
        lightboxCaption.textContent = title ? title.textContent : '';
        lightbox.classList.add('active');
      }
    });
  });

  if(lightboxClose) {
    lightboxClose.addEventListener('click', () => { lightbox.classList.remove('active'); });
  }

  lightbox.addEventListener('click', (e) => {
    if (e.target === lightbox) { lightbox.classList.remove('active'); }
  });
}
