import Form from "./components/Form";
import { connect } from "react-redux";
import Filtering from "./components/Table";
import addUser from "./actions";
const App = (props) => {
  console.log("in App", props)
  return (
    <div className="App">
      <Form />
      <Filtering />
    </div>
  );
};

export default connect()(App);
