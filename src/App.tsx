import styled from 'styled-components';
import './App.css';
import Header from './components/Header';
import UsersTable from './components/UsersTable';

const Layout = styled.div`
  padding: 34px 25px;
  display: flex;
  flex-direction: column;
  gap:34px;
`

function App() {
  return (
    <Layout>
      <Header />
      <UsersTable />
    </Layout>
  );
}

export default App;
