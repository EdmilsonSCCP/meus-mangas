const fs = require('fs');
const path = require('path');

// Lê os dados dos mangás
const mangas = JSON.parse(fs.readFileSync(path.join(__dirname, '../data/mangas.json'), 'utf8'));
// Lê os dados de capítulos
const capitulos = JSON.parse(fs.readFileSync(path.join(__dirname, '../data/capitulos.json'), 'utf8'));

// Função para gerar o nome do arquivo sem espaços, acentos ou símbolos
function slugify(texto) {
  return texto
    .toLowerCase()
    .normalize('NFD').replace(/[\u0300-\u036f]/g, '') // Remove acentos
    .replace(/\s+/g, '') // Remove espaços
    .replace(/[^a-z0-9]/g, ''); // Remove símbolos
}

// Diretório de saída
const outDir = path.join(__dirname, '../manga');
if (!fs.existsSync(outDir)) {
  fs.mkdirSync(outDir);
}

mangas.forEach(manga => {
  const lista = capitulos[manga.nome] || [];
  const slug = slugify(manga.nome);
  let html = `<!DOCTYPE html>
<html lang="pt-BR">
<head>
  <meta charset="UTF-8" />
  <title>${manga.nome}</title>
  <link rel="stylesheet" href="../style/style.css" />
</head>
<body>
  <h1>${manga.nome} - Capítulos</h1>
  <ul>`;

  lista.forEach(cap => {
    html += `\n    <li>Capítulo ${cap.capitulo} - ${cap.titulo}</li>`;
  });

  html += `
  </ul>
  <p><a href="../index.html">← Voltar para a lista de mangás</a></p>
</body>
</html>`;

  fs.writeFileSync(path.join(outDir, `${slug}.html`), html, 'utf8');
  console.log(`✅ Página gerada: manga/${slug}.html`);
});
