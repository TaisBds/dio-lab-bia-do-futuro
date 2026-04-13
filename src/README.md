# Código da Aplicação

Esta pasta contém o código do seu agente financeiro desenvolvido com React e Vite.

## Estrutura Sugerida

```
src/ 
├── main.tsx # Ponto de entrada da aplicação
├── app/ 
  ├── App.tsx # Componente principal da aplicação
   ├── components/ # Componentes reutilizáveis (UI e lógica) 
      ├── ui/ # Componentes de interface (botões, inputs, etc.) 
       └── figma/ # Componentes importados ou adaptados do Figma 
├── styles/
   ├── index.css # Estilos globais
   ├── tailwind.css # Configuração do Tailwind 
   ├── theme.css # Tema da aplicação 
   └── fonts.css # Fontes utilizadas
   
```

## Exemplo de requirements.txt

```
streamlit
openai
python-dotenv
pandas

```

## Como Rodar

```bash

# Instalar dependências
npm install

# Rodar o projeto
npm run dev

A aplicação estará disponível em:
http://localhost:5173

```
