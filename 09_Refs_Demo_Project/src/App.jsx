import NoProjectSelected from "./components/NoProjectSelected.jsx";
import NewProject from "./components/NewProject.jsx";
import SideBar from "./components/SideBar.jsx";

import { useState } from "react";
import SelectedProject from "./components/SelectedProject.jsx";

function App() {
  // holds the current state of the app regarding projects
  const [ projectsState, setProjectState ] = useState({
    selectedProjectId: undefined, // undefined means no project is selected and we're not adding an initial project
    projects: [],                 // initially there are no projects
    tasks: []
  });

  function handleAddTask(text) {
    setProjectState(prevState => {
      const taskId = Math.random();
      const newTask = {
        text: text,                   // input the text that was inputted in the NewTask component
        projectId: prevState.selectedProjectId,
        id: taskId,
      };

      return {
        ...prevState,
        // selectedProjectId: undefined, // just editing the task, and don't want to update the selected project ID
        tasks: [newTask, ...prevState.tasks]
      };
    });
  }

  function handleDeleteTask(id) {
    setProjectState(prevState => {
      return {
        ...prevState,
        tasks: prevState.tasks.filter(
          (task) => task.id !== id,
        )
      }
    })
  }

  function handleSelectProject(id) {
    setProjectState(prevState => {
      return {
        ...prevState,
        selectedProjectId: id,
      };
    });
  }

  function handleStartAddProject() {
    setProjectState(prevState => { // return the updated state
      return {
        ...prevState,
        selectedProjectId: null,   // setting this to null indicates that we're adding a new project
      };
    });
  }

  // go back to the starting screen
  function handleCancelAddProject() {
    setProjectState(prevState => {
      return {
        ...prevState,
        selectedProjectId: undefined,
      };
    });
  }

  function handleAddProject(projectData) {
    setProjectState(prevState => {
      const projectId = Math.random();
      const newProject = {
        ...projectData,
        id: projectId,
      };
      return {
        ...prevState,
        selectedProjectId: undefined, // written to fall back to the previous screen
        projects: [...prevState.projects, newProject]
      }
    });
  }
  
  function handleDeleteProject() {
    setProjectState(prevState => {
      return {
        ...prevState,
        selectedProjectId: undefined,
        // function should return true if an element should be kept, or false if it should be dropped
        // after, which will return a brand new array that only contains the elements that were not dropped
        projects: prevState.projects.filter((project) => project.id !== prevState.selectedProjectId )
      };
    });
  }

  // find -> takes a function as an argument, a function that will be executed for every element in the array
  // function should return true if we found the element we were looking for
  const selectedProject = projectsState.projects.find(project => project.id === projectsState.selectedProjectId);

  let content = (
  <SelectedProject
    project={selectedProject}
    onDelete={handleDeleteProject}
    onAddTask={handleAddTask}
    onDeleteTask={handleDeleteTask}
    tasks={projectsState.tasks}
  />
);

  if (projectsState.selectedProjectId === null) {
    content = <NewProject onAdd={handleAddProject} onCancel={handleCancelAddProject}/>
  } else if (projectsState.selectedProjectId === undefined) {
    content = <NoProjectSelected onStartAddProject={handleStartAddProject}/>
  }

  // const [ isContextVisible, setIsContextVisible ] = useState(false);
  const [ formData, setFormData ] = useState({
    title: '',
    description: '',
    dueDate: '',
  });

  // function handleAddProjectClick() {
  //   setIsContextVisible(true);
  // }

  // function handleInputChange(name, value) {
  //   setFormData((prevData) => ({
  //     ...prevData,
  //     [name]: value,
  //   }));
  // }

  return (
    // h-screen: takes up all the screen
    <main className="h-screen my-8 flex gap-8"> 
      <SideBar
        onStartAddProject={handleStartAddProject}
        projects={projectsState.projects}
        formData={formData}
        onSelectProject={handleSelectProject}
        selectedProjectId={projectsState.selectedProjectId} // this is written if we want to highlight when we press the task underneath the 'YOUR PROJECTS'
      />
      {content}
      {/* {isContextVisible ? (
        <NewProject formData={formData} onInputChange={handleInputChange} /> 
      ) : (
        <NoProjectSelected />
      )}
      <NoProjectSelected onStartAddProject={handleStartAddProject}/> */}
    </main>
  );
}

export default App;
