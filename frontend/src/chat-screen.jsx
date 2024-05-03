import Button from "react-bootstrap/Button";
import Container from "react-bootstrap/Container";
import Form from "react-bootstrap/Form";
import Navbar from "react-bootstrap/Navbar";
import { auth } from "./firebase";


function Message() {
  return (
    <li>
      <div>
        <strong>Usuário</strong>
      </div>
      <div>
        Mensagem
      </div>
    </li>
  );
}

function ChatScreen() {
  const {displayName} = auth.currentUser;

  return (
    <div className="h-100 d-flex flex-column">
      <Navbar>
        <Container>
          <Navbar.Brand>Build With AI - JS</Navbar.Brand>
          <Navbar.Toggle />
          <Navbar.Collapse className="justify-content-end">
            <Navbar.Text>
              Usuário: <span>{displayName}</span>
              <Button variant="link">Sair</Button>
            </Navbar.Text>
          </Navbar.Collapse>
        </Container>
      </Navbar>
      <Container className="flex-grow-1 overflow-y-scroll">
        <ul className="mh-100">
          <Message />
          <Message />
          <Message />
          <Message />
          <Message />
          <Message />
          <Message />
          <Message />
          <Message />
          <Message />
          <Message />
          <Message />
        </ul>
      </Container>
      <Container className="mb-4">
        <Form className="d-flex gap-1">
          <Form.Group className="flex-grow-1">
            <Form.Control as="textarea" placeholder="Digite sua mensagem..." />
          </Form.Group>
          <Button>Enviar</Button>
        </Form>
      </Container>
    </div>
  );
}

export default ChatScreen;
