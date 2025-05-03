# <samp>Como o EON funciona? 🤔</samp>

<samp>Você provavelmente deve estar se perguntando como exatamente o EON funciona? Essa documentação servirá para esclarecer essas dúvidas e ajudar a entender qualquer mudanças ou resoluções necessárias. 🛠️</samp>

<samp>Eon é uma aplicação React Native. 📱</samp>

<samp>Eon, nesta nova versão, depende de uma única API para funcionar. </samp>

# <samp>A API do Eon 🌟</samp>

Nós usamos apenas uma API, a [Eon API](https://github.com/saulojoab/eon-server), lindando com todos os dados de Usuário e Mangas, o que faz tudo ser centralizado e mais fácil de entender.

### <samp>De onde os dados do Manga vem? 📚</samp>

<samp>Atualmente nós usamos [Consumet Library](https://github.com/consumet/consumet.ts) para buscar as informações do manga, títulos, capas, páginas, capítulos, etc. </samp>

<samp>Isso é legal pois Consumet é mantido pela comunidade, e o código é relativamente simples. Eu mesmo já implementei alguns componentes e contribuí para o código da Consumet. 💻</samp>

<samp>Isso significa que qualquer um pode fazer fork, rodar, modificar e usar nossa versão do Consumet com Eon, e não dependender de nada além disso. 🔧</samp>

### <samp>De onde os dados de Usuário vem? 👤</samp>

<samp>Para qualquer coisa relacionada aos dados de Usuários, sendo login, favoritos, registros, recomendações, etc, nós usamos nosso próprio código da API. 🔒</samp>

<samp>Sendo também de código aberto, e o código fácil de entender. Essa é o único propósito dos serviços terem uma melhor exemperiência de usuário, como contar qual é a continuação do manga do usuário, mangas favoritos, mostrar qual é o manga mais lido do dia, e coisas desse jeito. </samp>

<samp>Atualmente usamos o **_Fastify_** com o  **_MongoDB_** Banco de Dados onde nós armazenamos os dados e rodamos nosso servidor. 🚀 Curiosidade, como desafio pessoal, eu fiz o código original do EON em 3 dias! Isso serviu para mostrar como essas tecnologias são realmente rápidas e fáceis de trabalhar. </samp>

<samp>Agora, se você quiser rodar uma instância do EON por si mesmo, e falar que não precisa necessáriamente dessa API. Nesse caso, você pode apenas remover as referências e usar o EON sem qualquer autenticação. Essa é a mágica do Open Source (Código Aberto)! ✨ Por tanto, para o aplicativo principal, Eu acho que isso é bom para foco na diversão da experiência de usuário. </samp>

# <samp>A Estrutura do Código 🏗️</samp>

### <samp>API 🔌</samp>

<samp>Você consegue achar a configuração da API no diretório `src/services`. É ai onde definimos os endpoints para usar o app. Também, se você quiser dar uma olhada na pasta dos `requests`, você consegue checar as requisições que fizemos para diferentes partes do app. 📂</samp>

<samp>Ainda há muito trabalho para deixar o código limpo, mas isso é o que você precisa saber para querer rodar o Eon do jeito atual, você precisa ter a API configurada localmente para que isso funcione corretamente. 🖥️</samp>

### <samp>Arquitetura 🏛️</samp>

<samp>Atualmente, nós separamos o código do Eon usando uma pasta principal "main", com diferentes arquivos para propósitos diferentes . 📁</samp>

<samp>`ComponentName.service.ts` -> Esses arquivos são os **React Hooks**, e todos os componentes lógicos que deverão ser armazenados. Qualquer um dos cálculos de requisição, busca de dados da API ou manipulação de dados deverão ser feito ali, exportados, e importados no componente principal. 🔄</samp>

<samp>`ComponentName.style.tsx` -> Esses arquivos são os estilos dos componentes, usando o **Styled Components**. Eles são exportados e usados pelo arquivo principal. 🎨</samp>

<samp>`ComponentName.type.ts` -> Esse arquivo vai armazenar quaisquer tipos criados para componentes específicos. Eles são importados e exportados par ao aquivo principal. 📝</samp>

<samp>`ComponentName.tsx` -> Esse é o principal aquivo dos componentes, ele contêm a estrutura HTML e importa todos os serviços, estilos e tipos. 🏗️</samp>

<samp>Você consegue dar uma olhada na pasta `screens` e conseguirá entender como isso funciona. Essa é uma boa estrutura porque o código está organizado propriámente e isso também permite mudanças em diferentes arquivos sem que tenha conflitos nos arquivos. ✅</samp>
