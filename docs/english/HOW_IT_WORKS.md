# <samp>How does EON work? 🤔</samp>

<samp>You might be wondering how exactly does EON work? This documentation should clear up that question and also help whenever any changes or fixes are needed. 🛠️</samp>

<samp>Eon is a React Native application. 📱</samp>

<samp>Eon, on the newest version, only depends on one API in order to work. </samp>

# <samp>The Eon API 🌟</samp>

We use only one API, the [Eon API](https://github.com/saulojoab/eon-server), to handle all User and Manga data, which makes everything centered and easier to grasp.

### <samp>Where does the Manga data come from? 📚</samp>

<samp>We currently use the [Consumet Library](https://github.com/consumet/consumet.ts) for crawling manga information, such as titles, covers, pages, chapters, etc. </samp>

<samp>This is good because Consumet is community maintained, and the code is relatively simple. I myself have implemented some providers and contributed to the Consumet code. 💻</samp>

<samp>This means that anyone can fork, run, modify and use their own version of Consumet with Eon, and not depend on anything on my end. 🔧</samp>

### <samp>Where does the User data come from? 👤</samp>

<samp>For anything related to user data, such as login, favorites, logging, recommendations, etc, we use our own code on the API. 🔒</samp>

<samp>It is also open sourced, and the code is quite easy to understand. Its only purpose is to provide a better user experience, like storing what the user is currently reading, favorite mangas, checking what is the most read manga of the day, things like that. </samp>

<samp>We are currently using **_Fastify_** with a **_MongoDB_** database in order to store our data and run our server. 🚀 Fun fact, I made the original code for EON in 3 days as a personal challenge! That shows how fast and easy these techs are to work with. </samp>

<samp>Now, if you want to simply run an instance of Eon for yourself, you can argue there isn't really a need for this API. You could then just remove references for it and use Eon without any authentication. That's the magic of open source! ✨ However, for the main app, I think it's nice to focus on a fun user experience. </samp>

# <samp>The Code Structure 🏗️</samp>

### <samp>API 🔌</samp>

<samp>You can find the configuration for the API in `src/services`. That's where we define the API endpoints for use on the app. Also, if you look at the `requests` folder, you can check the requests we make for different parts of the app. 📂</samp>

<samp>There is still a lot of work to be done to make the code cleaner, but just know that if you want to run Eon as is, you need to run the API locally in order for it to work properly. 🖥️</samp>

### <samp>Architecture 🏛️</samp>

<samp>Currently, we are separating the Eon code using a main folder, with different files that all have a specific purpose. 📁</samp>

<samp>`ComponentName.service.ts` -> These files are React Hooks, and all component logic should be stored there. Anything that requires calculations, API fetching or data manipulation should be done there, exported, and imported on the main component file. 🔄</samp>

<samp>`ComponentName.style.tsx` -> These files are the styles for the component, using Styled Components. They are exported and used on the main file. 🎨</samp>

<samp>`ComponentName.type.ts` -> These files will store any types that are created for a specific component. They are exported and imported in the main file. 📝</samp>

<samp>`ComponentName.tsx` -> This is the main component file, containing the HTML structure and importing the service, style and types. 🏗️</samp>

<samp>You can take a look at the `screens` folder and you will get how it works. That is a good structure because the code is organized properly and it also allows changes in different files without conflicts. ✅</samp>
