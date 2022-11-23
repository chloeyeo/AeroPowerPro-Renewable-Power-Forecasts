import React from "react";

class PostRequest extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      postId: null,
    };
  }

  async componentDidMount() {
    // POST request using fetch with async/await
    const requestOptions = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        registered: True,
        password: document.getElementById("exampleInputPassword1").value,
        email: document.getElementById("exampleInputPassword1").value,
      }),
    };
    const response = await fetch(
      "http://localhost:8000/register_user/",
      requestOptions
    );
    const data = await response.json();
    this.setState({ postId: data.id });
  }
}

export { PostRequest };
