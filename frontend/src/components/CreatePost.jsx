import { useState } from "react";
import api from "../api/axios";
import { Card, Form, Button } from "react-bootstrap";

const CreatePost = ({ refresh }) => {
  const [text, setText] = useState("");
  const [image, setImage] = useState("");

  const submit = async () => {
    await api.post("/posts", { text, image });
    setText("");
    setImage("");
    refresh();
  };

  return (
    <Card className="p-3 mt-3">
      <Form.Control
        placeholder="What's on your mind?"
        value={text}
        onChange={e => setText(e.target.value)}
      />
      <Form.Control
        placeholder="Image URL (optional)"
        className="mt-2"
        value={image}
        onChange={e => setImage(e.target.value)}
      />
      <Button className="mt-2" onClick={submit}>
        Post
      </Button>
    </Card>
  );
}

export default CreatePost;
