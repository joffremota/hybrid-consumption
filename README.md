# Hybrid Consumption

Hybrid Consumption e um utilitario open source para estimar e comparar o consumo
de carros hibridos plug-in usando as medias mostradas pelo carro ou pelo app da
montadora.

O caso de uso inicial deste projeto e o BYD King, mas a interface foi montada
para funcionar tambem com leituras genericas de PHEV.

## Acesso rapido

- App publicado no GitHub Pages:
  `https://joffremota.github.io/hybrid-consumption/`
- Repositorio:
  `https://github.com/joffremota/hybrid-consumption`

## Objetivo

O objetivo do projeto e responder, de forma simples, perguntas como:

- quantos kWh foram consumidos no periodo
- quantos litros foram consumidos no periodo
- qual foi a participacao relativa de eletricidade e combustivel
- como comparar uma leitura acumulada com uma leitura de trecho

Isso e util quando o app da montadora mostra somente indicadores em
`kWh/100 km` e `L/100 km`, mas nao deixa claro o total consumido nem a
participacao energetica de cada fonte.

## Como a ferramenta funciona

Voce informa:

- distancia do periodo em km
- consumo eletrico em `kWh/100 km`
- consumo de combustivel em `L/100 km`
- tipo da leitura: acumulada ou trecho
- observacoes opcionais

A ferramenta calcula:

- `kWh totais = km * (kWh/100 km) / 100`
- `litros totais = km * (L/100 km) / 100`
- `kWh/km`
- `L/km`
- energia equivalente total
- participacao eletrica vs combustivel

Por padrao, o comparativo usa equivalencia energetica de `8.9 kWh/L`, mas esse
valor pode ser alterado nas configuracoes.

## De onde vem o `8.9 kWh/L`

O valor padrao foi definido como referencia energetica baseada no padrao
`EPA / MPGe` usado nos EUA para comparar eletricidade e gasolina.

A conta e:

- `33.7 kWh` por `1 galao americano` de gasolina
- `1 galao americano = 3.785 L`
- `33.7 / 3.785 = 8.9 kWh/L` aproximadamente

No app, esse numero e usado apenas para colocar eletricidade e combustivel em
uma base energetica comum.

Importante:

- isso nao representa custo equivalente
- isso nao representa rendimento equivalente do motor
- isso nao e uma medicao especifica do BYD King
- para gasolina brasileira, o valor por litro pode variar conforme a composicao
  do combustivel e o criterio adotado

Por isso o campo continua editavel e o app permite ajuste manual.

## Uso com BYD King

Para o BYD King, a ideia e copiar manualmente os numeros que aparecem no app,
por exemplo:

- `AEC cumulativo`
- `Energia ult. 50 km`

Se o app mostrar algo como:

- distancia: `374 km`
- eletrico: `1.9 kWh/100 km`
- combustivel: `5.0 L/100 km`

a ferramenta converte isso em totais estimados e mostra a divisao energetica do
periodo.

## Funcionalidades atuais

- calculo de `kWh totais` e `litros totais`
- comparativo de participacao eletrica vs combustivel
- historico local salvo no navegador com `localStorage`
- edicao e exclusao de medicoes
- perfil inicial preparado para BYD King
- publicacao automatica no GitHub Pages

## Como usar no navegador

1. Acesse `https://joffremota.github.io/hybrid-consumption/`
2. Escolha o perfil do veiculo
3. Informe distancia, media eletrica e media de combustivel
4. Clique em `Calcular e salvar`
5. Veja os totais e o comparativo no painel de resultados
6. Consulte ou edite o historico salvo localmente no navegador

## Desenvolvimento local

### Requisitos

- Node.js 20+
- npm 10+

### Rodar em modo de desenvolvimento

```bash
npm install
npm run dev
```

### Gerar build de producao

```bash
npm run build
```

### Executar testes

```bash
npm run test
```

## Publicacao

O projeto inclui workflow em `.github/workflows/deploy.yml` para publicar no
GitHub Pages via GitHub Actions.

Configuracao esperada no GitHub:

- `Settings > Pages`
- `Source: GitHub Actions`

Cada push na branch `main` deve gerar um novo deploy.

## Licenca

Este projeto esta licenciado sob a MIT License. Veja [LICENSE](./LICENSE).
