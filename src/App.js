import Form from "./components/Form";
import { connect } from "react-redux";
import Filtering from "./components/Table";

const App = () => {
  return (
    <div className="App">
      <Form />
      <Filtering />
    </div>
  );
};

export default connect()(App);
