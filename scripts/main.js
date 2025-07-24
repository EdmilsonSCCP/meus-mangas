fetch('data/mangas.json')
  .then(res => res.json())
  .then(mangas => {
    const container = document.getElementById('manga-list');
    const searchInput = document.getElementById('search');

    function slugify(texto) {
      return texto
        .toLowerCase()
        .normalize("NFD").replace(/[\u0300-\u036f]/g, "") // Remove acentos
        .replace(/\s+/g, '')                             // Remove espaços
        .replace(/[^a-z0-9]/g, '');                      // Remove símbolos
    }

    function render(lista) {
      container.innerHTML = '';
      lista.forEach(m => {
        const cardLink = document.createElement('a');
        cardLink.href = `manga/${slugify(m.nome)}.html`;
        cardLink.className = 'manga-card';
        cardLink.style.textDecoration = 'none';
        cardLink.style.color = 'inherit';

        cardLink.innerHTML = `
          <img src="assets/capas/${m.imagem}" alt="${m.nome}" />
          <h3>${m.nome}</h3>
          <p><strong>Volumes:</strong> ${m.volumes}</p>
          <p><strong>Autor:</strong> ${m.autor}</p>
          <p><strong>Status:</strong> ${m.status}</p>
        `;

        container.appendChild(cardLink);
      });
    }

    searchInput.addEventListener('input', () => {
      const termo = searchInput.value.toLowerCase();
      const filtrados = mangas.filter(m => m.nome.toLowerCase().includes(termo));
      render(filtrados);
    });

    render(mangas);
  });
