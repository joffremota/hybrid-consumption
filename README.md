# Hybrid Consumption

Aplicativo open source para calcular e comparar consumo de carros hibridos plug-in, com foco inicial no fluxo de leitura do app da BYD.

## Funcionalidades

- Calculo de `kWh totais` e `litros totais` a partir de medias por 100 km.
- Comparativo de participacao eletrica vs combustivel por equivalencia energetica.
- Historico local salvo no navegador.
- Perfil inicial preparado para leituras do BYD King.

## Desenvolvimento

```bash
npm install
npm run dev
```

## Testes

```bash
npm run test
```

## Publicacao

O repositório inclui workflow para publicar no GitHub Pages. Ao criar o repo, habilite Pages com origem em GitHub Actions.

## Subir para o GitHub

```bash
git init -b main
git add .
git commit -m "Initial commit"
git remote add origin https://github.com/SEU_USUARIO/hybrid-consumption.git
git push -u origin main
```

Depois do primeiro push:

- crie o repositorio `hybrid-consumption` no GitHub
- confirme em `Settings > Pages` que a origem esta em `GitHub Actions`
- o workflow `.github/workflows/deploy.yml` publica automaticamente a cada push na branch `main`
