# <samp>Como o EON funciona? 🤔</samp>

<samp>Você provavelmente deve estar se perguntando como exatamente o EON funciona? Essa documentação servirá para esclarecer essas dúvidas e ajudar a entender qualquer mudanças ou correções necessárias. 🛠️</samp>

<samp>Eon é uma aplicação React Native. 📱</samp>

<samp>Eon, nesta nova versão, depende de uma única API para funcionar. </samp>

# <samp>A API do Eon 🌟</samp>

<samp> Nós usamos apenas uma API, a [Eon API](https://github.com/saulojoab/eon-server), que lida com todos os dados de Usuário e Mangás, o que faz tudo ser centralizado e mais fácil de entender. </samp>

### <samp>De onde os dados de Mangá vem? 📚</samp>

⚠️ <samp>**NOTA: Essa seção descreve a arquitetura original. A biblioteca Consumet foi removida por DMCA. O aplicativo não está funcional no momento.**</samp>

<samp>Originalmente, nós usávamos uma biblioteca para buscar informações dos mangás de vários provedores, como: títulos, capas, páginas, capítulos, etc. </samp>

<samp>A infraestrutura que alimentava isso foi afetada por takedowns de direitos autorais, e estamos explorando alternativas viáveis. 🔧</samp>

### <samp>De onde os dados dos Usuários vem? 👤</samp>

<samp>Nós usamos nosso próprio código da API para qualquer coisa relacionada aos dados do Usuário, como: login, favoritos, registros, recomendações, etc.🔒</samp>

<samp>A API também é Open Source e o código é bastante fácil de entender. Seu próposito é oferecer uma melhor experiência de usuário, como: armazenar o que o usuário está lendo no momento, mangás favoritos, verificar qual é o mangá mais lido do dia, entre outras coisas. </samp>

<samp>Atualmente usamos o **_Fastify_** com o banco de dados **_MongoDB_** onde nós armazenamos os dados e rodamos nosso servidor. 🚀 Curiosidade, como desafio pessoal, eu fiz o código original do EON em 3 dias! Isso serviu para mostrar como essas tecnologias são realmente rápidas e fáceis de trabalhar. </samp>

<samp>Agora, caso você queira rodar uma instância do EON por conta própria, você não precisa necessáriamente dessa API. Nesse caso, você pode apenas remover as referências e usar o EON sem qualquer autenticação. Essa é a mágica do Open Source (Código Aberto)! ✨ No entanto, para o aplicativo principal, acho interessante focar em uma experiência de usuário divertida. </samp>

# <samp>A Estrutura do Código 🏗️</samp>

### <samp>API 🔌</samp>

<samp>Você consegue achar a configuração da API no diretório `src/services`. É ai onde definimos os endpoints para usar no app. Também, se você quiser dar uma olhada na pasta dos `requests`, você consegue checar as requisições que fizemos para diferentes partes do app. 📂</samp>

<samp>Ainda há bastante trabalho a ser feito para tornar o código limpo, mas estas são as informações essenciais para rodar o Eon na versão Atual. É necessário ter a API configurada localmente para que tudo funcione corretamente. 🖥️</samp>

### <samp>Arquitetura 🏛️</samp>

<samp>Atualmente, nós separamos o código do Eon usando uma pasta principal "main", com diferentes arquivos para propósitos diferentes . 📁</samp>

<samp>`ComponentName.service.ts` -> Esses arquivos são os **React Hooks**, e todos os componentes lógicos que deverão ser armazenados. Qualquer um dos cálculos de requisição, busca de dados da API ou manipulação de dados deverão ser feito ali, exportados, e importados no componente principal. 🔄</samp>

<samp>`ComponentName.style.tsx` -> Esses arquivos são os estilos dos componentes, usando o **Styled Components**. Eles são exportados e usados pelo arquivo principal. 🎨</samp>

<samp>`ComponentName.type.ts` -> Esse arquivo vai armazenar quaisquer tipos criados para componentes específicos. Eles são importados e exportados para o aquivo principal. 📝</samp>

<samp>`ComponentName.tsx` -> Esse é o principal aquivo dos componentes, ele contêm a estrutura HTML e importa todos os serviços, estilos e tipos. 🏗️</samp>

<samp>Você pode dar uma olhada na pasta `screens` para entender como isso funciona. Essa é uma boa estrutura, pois o código está devidamente organizado e permite alterações em arquivos diferentes sem gerar conflitos. ✅</samp>
