import Footer from "../components/footer/Footer";
import FramedataTable from "../components/framedata-table/FramedataTable";
import Header from "../components/header/Header";
import "./App.sass";

function App() {
  return (
    <div>
      <Header />
      <main>
        <FramedataTable />
      </main>
      <Footer />
    </div>
  );
}

export default App;
