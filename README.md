# React + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react/README.md) uses [Babel](https://babeljs.io/) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

if you are cloning from github you will need the following:

You will need to add these dependencies in the client directory order for the app to work.

npm i vite
npm i npm


You will need to add these dependencies in the server directory order for the app to work.

npm i cors
npm i express
npm i nodemon -D

You will need to the following command in the client directory and server directory simultaneously. 

npm run dev

or if you like to expose the client directory to the network (mostly for dave to run it on pi):

npm run dev -- --host

