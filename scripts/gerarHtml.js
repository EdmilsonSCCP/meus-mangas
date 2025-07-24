const fs = require('fs');
const path = require('path');

// Lê os dados dos mangás
const mangas = JSON.parse(fs.readFileSync(path.join(__dirname, '../data/mangas.json'), 'utf8'));
// Lê os dados de capítulos
const capitulos = JSON.parse(fs.readFileSync(path.join(__dirname, '../data/capitulos.json'), 'utf8'));

// Diretório de saída
const outDir = path.join(__dirname, '../manga');
if (!fs.existsSync(outDir)) {
  fs.mkdirSync(outDir);
}

mangas.forEach(manga => {
  const lista = capitulos[manga.nome] || [];
  const slug = manga.nome.toLowerCase().replace(/\s+/g, '');
  let html = `<!DOCTYPE html>
<html lang="pt-BR">
<head>
  <meta charset="UTF-8" />
  <title>${manga.nome}</title>
</head>
<body>
  <h1>${manga.nome}</h1>
  <ul>`;

  lista.forEach(cap => {
    html += `\n    <li>Capítulo ${cap.numero} - ${cap.titulo}</li>`;
  });

  html += `\n  </ul>
</body>
</html>`;

  fs.writeFileSync(path.join(outDir, `${slug}.html`), html, 'utf8');
  console.log(`Página gerada: ${slug}.html`);
});
