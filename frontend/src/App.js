import logo from './logo.svg';
import './App.css';
import FileUploader from './components/FileUploader';

const style = {
    backgroundColor: '#282c34',
    paddingTop: '40px',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    color: 'white',
    height: '100vh',
    width: '100vw',
}

function App() {
  return (
    <div style={style}>
        <h1> Auto PowerPoint Styler </h1>
        <FileUploader/>
    </div>
  );
}

export default App;
