# Requisitos do Sistema de Chatbot FURIA Esports

## Requisitos Funcionais

### RF01 - Interação com o Usuário via Chat
**Descrição:** O sistema deve permitir que o usuário envie mensagens e receba respostas do chatbot sobre o time FURIA no cenário de Counter-Strike.

**Critérios de Aceitação:**
- O usuário deve conseguir enviar mensagens por meio de uma interface web.
- O chatbot deve responder exclusivamente sobre o time FURIA Esports em CS:GO e CS2.
- As mensagens devem ser exibidas de forma sequencial em formato de chat.

### RF02 - Personalidade e Restrições do Chatbot
**Descrição:** O chatbot deve responder com uma linguagem compatível com a torcida da FURIA e se recusar a responder perguntas fora do escopo definido.

**Critérios de Aceitação:**
- O chatbot deve ter uma personalidade envolvente, vibrante e torcedora.
- Perguntas fora do tema FURIA Esports devem ser recusadas de forma educada.
- O comportamento do chatbot deve seguir o prompt de sistema configurado.

### RF03 - Comunicação com a API da OpenAI
**Descrição:** O sistema deve se comunicar com a API da OpenAI para processar as mensagens e retornar as respostas.

**Critérios de Aceitação:**
- A aplicação deve enviar o histórico de mensagens para a API e exibir a resposta gerada.
- A chave de API deve ser usada para autenticar a comunicação (preferencialmente por variável de ambiente).
- O sistema deve controlar corretamente os papéis 'user' e 'assistant' nas mensagens.

### RF04 - Armazenamento Temporário do Histórico
**Descrição:** O sistema deve armazenar o histórico da conversa temporariamente durante a sessão do usuário.

**Critérios de Aceitação:**
- O histórico deve manter a ordem e o contexto das mensagens.
- Deve ser possível seguir uma conversa sem reinicialização da sessão.
- O histórico deve ser descartado ao encerrar a aplicação ou reiniciar o servidor.

### RF05 - Interface Web do Chatbot
**Descrição:** O sistema deve possuir uma interface web acessível para interação com o chatbot.

**Critérios de Aceitação:**
- A interface deve conter um campo de entrada de texto e botão de envio.
- As mensagens devem ser exibidas alternadamente entre usuário e bot.
- A interface deve ser compatível com navegadores modernos.

## Requisitos Não Funcionais

### RNF01 - Desempenho
**Descrição:** O sistema deve responder em tempo adequado para manter uma experiência fluida de conversa.

**Critérios de Aceitação:**
- O tempo de resposta após o envio da mensagem deve ser inferior a 10 segundos (exceto em picos da API).
- O backend deve ser leve o suficiente para execução local ou em hospedagens simples.

### RNF02 - Segurança
**Descrição:** O sistema deve proteger a chave da API da OpenAI e os dados do usuário.

**Critérios de Aceitação:**
- O sistema não deve registrar dados pessoais dos usuários.

### RNF03 - Usabilidade
**Descrição:** O sistema deve ser simples, intuitivo e fácil de usar.

**Critérios de Aceitação:**
- A interface deve permitir iniciar uma conversa com no máximo 2 cliques.
- O design deve ser compatível com dispositivos móveis (responsivo).
- O usuário deve entender facilmente o propósito do chatbot ao acessá-lo.

### RNF04 - Manutenibilidade
**Descrição:** O sistema deve ser de fácil manutenção e extensão.

**Critérios de Aceitação:**
- O código deve seguir boas práticas de organização e nomenclatura.
- A aplicação deve permitir ajustes no prompt e nos parâmetros da API sem alterações drásticas.
- O sistema deve ser documentado com instruções de instalação e uso.

### RNF05 - Escalabilidade
**Descrição:** O sistema deve permitir expansão para múltiplos bots ou usuários simultâneos.

**Critérios de Aceitação:**
- A estrutura deve permitir adaptação para multichat em sessões distintas.
- A aplicação deve poder ser hospedada em ambiente escalável (Heroku, Render, etc.).

