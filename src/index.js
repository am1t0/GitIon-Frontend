import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { createBrowserRouter,RouterProvider } from 'react-router-dom';
import LandingPage from './Components/LandingPage';
import RegisterPage from './Components/Register';
import Login from './Components/Login';
import Home from './Components/Home';
import Todo from './Components/Todo/Todo.js';
import CreateTeam from './Components/Team/CreateTeam.js';
import Team from './Components/Team/Team.js';
import TeamIntro from './Components/Team/TeamIntro.js';
import {Provider} from 'react-redux'
import CreateProject from './Components/Project/CreateProject.js';
import ProjectIntro from './Components/Project/ProjectIntro.js';
import Project from './Components/Project/Project.js';
import ProjectTasks from './Components/Project/ProjectTasks.js';
import ProjectDocs from './Components/Project/ProjectDocs.js';
import FolderShow from './Components/FolderShow.js';
import store from './Data_Store/Store/Store.js';
import Repo from './Components/Repo/Repo.js';
import FileFolderContent from './Components/FileFolderContent.js';

const root = ReactDOM.createRoot(document.getElementById('root'));

const router = createBrowserRouter([
  {
    path:'/',element: <App/> , children:[
      {path:'/',element:<Home/> , children:[
        { path: '/', element: <LandingPage /> },
        { path: '/Todos', element: <Todo /> },
        {path:'/create-team',element: <CreateTeam/>}
      ]},
      // {path:'/', element: <LandingPage />},
      {path:'/register',element: <RegisterPage/>},
      {path:"/login",element:<Login /> },
      {path:'/:teamName',element:<Team/> ,children:[
        {path:'/:teamName',element:<TeamIntro/>},
        {path:'/:teamName/create-project',element:<CreateProject/>},
      ]},
      {path:'/project/:projectName',element:<Project/>,children:[
        {path:'/project/:projectName/docs',element:<ProjectDocs/>},
        {path:'/project/:projectName/:folderName',element:<FolderShow/>},
      ]},
      {path:'/project/:projectName/content/:path', element: <Repo/>}
    ]
  },
  
])
root.render(
  <Provider store={store}>
      <RouterProvider router={router}>
    <App />
    </RouterProvider>
    </Provider>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
