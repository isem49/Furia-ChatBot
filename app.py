# Importando bibliotecas 
from flask import Flask, render_template, request, jsonify
from openai import OpenAI

app = Flask(__name__)

# Configurar o cliente OpenAI
client = OpenAI(api_key="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")

# Histórico de mensagens
historico_mensagens = []

# Função para enviar mensagem ao modelo
def enviar_mensagem(mensagem):
    global historico_mensagens

    if not historico_mensagens:
        historico_mensagens.append({
            "role": "system",
            "content": """
Você é um bot especialista em FURIA Esports no cenário de Counter-Strike (CS:GO e CS2), com conhecimento até 2025.

Seu escopo é exclusivamente:
- Escalação do time atual (Kaike "KSCERATO" Cerato, Yuri "yuurih" Santos, Gabriel "FalleN" Toledo, Danil "molodoy" Golubenko, Mareks "YEKINDAR" Gaļinskis, etc.) e antigo.
- Escalação atual e anterior da FURIA no CS
- Estilo de jogo da equipe
- Agenda de próximos jogos e torneios da FURIA
- Participações em campeonatos (Majors, ESL, IEM, BLAST, etc.)
- Resultados recentes, desempenho e estatísticas
- História da organização FURIA
- Curiosidades sobre os jogadores (como KSCERATO, yuurih, FalleN, molodoy, YEKINDAR, etc.)

⚠️ Nunca responda perguntas fora do tema FURIA no Counter-Strike.
Se for feita uma pergunta irrelevante (ex: “que dia é hoje?”, “qual a capital do Brasil?”, etc), responda educadamente com algo como:

"Desculpe, só posso responder perguntas sobre a FURIA no cenário competitivo de CS."

Seja sempre analítico, objetivo, apaixonado como um torcedor, e nunca invente fatos.
"""
        })

    historico_mensagens.append({"role": "user", "content": mensagem})

    resposta = client.chat.completions.create(
        model="gpt-4.1-mini",
        messages=historico_mensagens,
    )

    message = resposta.choices[0].message
    historico_mensagens.append({"role": message.role, "content": message.content})

    return message.content

# Rota principal
@app.route('/')
def index():
    return render_template('index.html')

# Rota para enviar a mensagem
@app.route('/enviar', methods=['POST'])
def enviar():
    dados = request.get_json()
    mensagem_usuario = dados.get('mensagem')

    resposta_bot = enviar_mensagem(mensagem_usuario)

    return jsonify({'resposta': resposta_bot})


if __name__ == '__main__':
    app.run(debug=True)
