import Footer from "./components/Footer";
import FramedataTable from "./components/FramedataTable";
import Header from "./components/Header";

function App() {
  return (
    <div className="min-h-dvh">
      <Header />
      <main>
        <FramedataTable />
      </main>
      <Footer />
    </div>
  );
}

export default App;
