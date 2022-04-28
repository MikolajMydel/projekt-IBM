import React from "react";
import CharacterForm from "./Components/CharacterForm/CharacterForm.js";

class App extends React.Component {
  state = {
    data: null,

  };

  componentDidMount(){
    this.callBackendAPI()
    .then( res => this.setState({"data": res.express }))
    .catch( err => console.log(err) );
  }

  callBackendAPI = async() => {
    const response = await fetch("/express-backend");
    const body = await response.json();

    if (response.status !== 200)
      throw Error(body.message);

    return body;
  }
  render(){
    return (
      <>
        <CharacterForm />
      </>
    );
  }
}

export default App;
