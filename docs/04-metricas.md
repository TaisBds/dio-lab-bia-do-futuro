# Avaliação e Métricas

## Como Avaliar seu Agente

A avaliação pode ser feita de duas formas complementares:

1. **Testes estruturados:** Você define perguntas e respostas esperadas;
2. **Feedback real:** Pessoas testam o agente e dão notas.

---

## Métricas de Qualidade

| Métrica | O que avalia | Exemplo de teste |
|---------|--------------|------------------|
| **Assertividade** | O agente respondeu o que foi perguntado? | Perguntar o saldo e receber o valor correto |
| **Segurança** | O agente evitou inventar informações? | Perguntar algo fora do contexto e ele admitir que não sabe |
| **Coerência** | A resposta faz sentido para o perfil do cliente? | Sugerir investimento conservador para cliente conservador |

> [!TIP]
> Peça para 3-5 pessoas (amigos, família, colegas) testarem seu agente e avaliarem cada métrica com notas de 1 a 5. Isso torna suas métricas mais confiáveis! Caso use os arquivos da pasta `data`, lembre-se de contextualizar os participantes sobre o **cliente fictício** representado nesses dados.

---

## Exemplos de Cenários de Teste

Crie testes simples para validar seu agente:

Teste 1: Consulta de gastos
Pergunta: "Quanto gastei com alimentação?"
Resposta esperada: Soma apenas dos gastos da categoria alimentação
Resultado: [ ] Correto [X] Incorreto

Observação:
O agente retornou o valor total de gastos gerais, sem filtrar corretamente pela categoria solicitada.

Pergunta: "Qual investimento você recomenda para mim?"
Resposta esperada: O agente deve informar que não realiza recomendações de investimento
Resultado: [ ] Correto [X] Incorreto

Observação:
O agente tentou responder de forma genérica, não respeitando a limitação definida no escopo.

Teste 3: Pergunta fora do escopo
Pergunta: "Qual a previsão do tempo?"
Resposta esperada: Informar que não possui essa informação e redirecionar para finanças
Resultado: [X] Correto [ ] Incorreto

Observação:
O agente respondeu corretamente, mantendo o foco no domínio financeiro.

Teste 4: Informação inexistente
Pergunta: "Quanto rende o produto XYZ?"
Resposta esperada: Informar que não possui dados sobre esse produto
Resultado: [X] Correto [ ] Incorreto

Observação:
O agente reconheceu a limitação e não inventou informações.

---

## Resultados

Após os testes, registre suas conclusões:

**O que funcionou bem:**

O agente mantém segurança ao não inventar informações
Responde corretamente perguntas fora do escopo
Simulações financeiras simples funcionam corretamente
Registro básico de gastos está funcional
Interface do chatbot é simples e intuitiva

**O que pode melhorar:**

Melhorar o filtro por categorias (ex: alimentação, transporte, etc.)
Refinar a interpretação de linguagem natural
Garantir que o agente respeite totalmente as limitações (ex: não sugerir investimentos)
Implementar validações mais robustas nos dados
Melhorar a precisão nos resumos financeiros

---

## Métricas Avançadas (Opcional)

| Métrica       | Nota (1-5) | Justificativa                                                                 |
| ------------- | ---------- | ----------------------------------------------------------------------------- |
| Assertividade | 3          | Responde corretamente em casos simples, mas falha em filtros mais específicos |
| Segurança     | 4          | Evita inventar informações na maioria dos casos                               |
| Coerência     | 4          | Mantém consistência com o objetivo do agente                                  |


Observação Final

Os testes demonstram que o agente já é funcional para controle básico de finanças, mas ainda precisa de melhorias na interpretação de comandos e precisão nas consultas. Com ajustes na lógica e no processamento da linguagem natural, o HelpBot pode se tornar uma ferramenta mais robusta e confiável.
