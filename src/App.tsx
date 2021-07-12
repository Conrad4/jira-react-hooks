import React from 'react';
import './App.css';
import { ProjectListScreen } from './screens/project-list';
import { TryUseArray } from "./tryUseArray";

function App() {
  return (
    <div className="App">
      <ProjectListScreen/>
      <TryUseArray/>
    </div>
  );
}

export default App;
