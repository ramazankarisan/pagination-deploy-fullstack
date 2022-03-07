import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import NavigationBar from './components/NavigationBar';
import UsersList from './components/UsersList';

function App() {
  return (
    <div className="App">
      <NavigationBar />
      <UsersList />
    </div>
  );
}

export default App;
