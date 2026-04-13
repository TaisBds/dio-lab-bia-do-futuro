# Base de Conhecimento

## Dados Utilizados

| Arquivo | Formato | Utilização no Agente |
|---------|---------|---------------------|
| `transacoes.csv` | CSV | Registrar e analisar gastos do usuário |
| `historico_atendimento.csv` | CSV | Manter contexto e continuidade das interações |
| `perfil_investidor.json` | JSON | Personalizar respostas com base no perfil financeiro |
| `produtos_financeiros.json` | JSON | Uso opcional para sugestões simples dentro do escopo |

---

## Adaptações nos Dados

> Você modificou ou expandiu os dados mockados? Descreva aqui.

O arquivo produtos_financeiros.json foi mantido na base de dados, porém não é utilizado diretamente pelo agente, pois o foco do projeto está no controle de gastos e simulação financeira, e não em recomendação de investimentos.

## Adaptações nos Dados

Os dados mockados foram analisados e ajustados para garantir melhor qualidade e compatibilidade com o sistema.

As principais adaptações incluem:

- Correção de problemas de codificação (encoding) nos arquivos CSV, garantindo a exibição correta de palavras como "Salário", "Farmácia" e "Combustível"

- Validação das categorias de gastos, mantendo organização em:
  - alimentação
  - moradia
  - transporte
  - lazer
  - saúde

- Uso do perfil do usuário para personalização das respostas, considerando renda, objetivos e metas financeiras

- Manutenção dos dados de produtos financeiros para uso opcional, respeitando o escopo do agente
---


## Estratégia de Integração

### Como os dados são carregados?
> Descreva como seu agente acessa a base de conhecimento.
Os dados são carregados no backend no início da execução da aplicação.

- Os arquivos CSV (`transacoes.csv` e `historico_atendimento.csv`) são lidos e armazenados em memória para consultas rápidas
- Os arquivos JSON (`perfil_investidor.json`) são utilizados para fornecer contexto sobre o usuário
- O sistema pode atualizar os dados dinamicamente conforme novas interações ocorrem

### Como os dados são usados no prompt?

Os dados não são incluídos diretamente no system prompt completo.

A estratégia utilizada é baseada em consulta dinâmica:

- O system prompt define o comportamento do agente
- O backend processa a mensagem do usuário e consulta os dados necessários
- Os resultados (como total de gastos ou simulações) são calculados antes e enviados como contexto para o agente

---

## Exemplo de Contexto Montado

Dados do Cliente:

Nome: Usuário
Perfil: Iniciante
Objetivo: Organizar gastos e economizar

Resumo Financeiro:

Total gasto no mês: R$ 1.250
Maior categoria: Alimentação (R$ 500)

Últimas transações:

02/04: Mercado - R$ 120
03/04: Ifood - R$ 45
05/04: Uber - R$ 30
06/04: Streaming - R$ 25

Simulação:

Economia mensal: R$ 200
Projeção em 12 meses: R$ 2.400
```
