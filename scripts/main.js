fetch('data/mangas.json')
  .then(res => res.json())
  .then(mangas => {
    const container = document.getElementById('manga-list');
    const searchInput = document.getElementById('search');

    function render(lista) {
      container.innerHTML = '';
      lista.forEach(m => {
        const card = document.createElement('div');
        card.className = 'manga-card';
        card.innerHTML = `
          <img src="assets/capas/${m.imagem}" alt="${m.nome}" />
          <h3>${m.nome}</h3>
          <p><strong>Volumes:</strong> ${m.volumes}</p>
          <p><strong>Autor:</strong> ${m.autor}</p>
          <p><strong>Status:</strong> ${m.status}</p>
        `;
        container.appendChild(card);
      });
    }

    searchInput.addEventListener('input', () => {
      const termo = searchInput.value.toLowerCase();
      const filtrados = mangas.filter(m => m.nome.toLowerCase().includes(termo));
      render(filtrados);
    });

    render(mangas);
  });

