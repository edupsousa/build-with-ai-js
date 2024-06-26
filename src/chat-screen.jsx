import { GoogleGenerativeAI } from "@google/generative-ai";
import { nanoid } from "nanoid";
import { useCallback, useLayoutEffect, useMemo, useRef, useState } from "react";

import PropTypes from "prop-types";
import Button from "react-bootstrap/Button";
import Container from "react-bootstrap/Container";
import Form from "react-bootstrap/Form";
import Navbar from "react-bootstrap/Navbar";
import Spinner from "react-bootstrap/Spinner";

function ChatNavBar({ apiKey, onLogout }) {
  const keyExcerpt = `...${apiKey.slice(-4)}`;

  return (
    <Navbar>
      <Container>
        <Navbar.Brand>Build With AI - JS</Navbar.Brand>
        <Navbar.Toggle />
        <Navbar.Collapse className="justify-content-end">
          <Navbar.Text>
            Chave: <span>{keyExcerpt}</span>
            <Button variant="link" onClick={onLogout}>
              Sair
            </Button>
          </Navbar.Text>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

ChatNavBar.propTypes = {
  apiKey: PropTypes.string.isRequired,
  onLogout: PropTypes.func.isRequired,
};

function Message({ fromUser, text, isLoading, isError }) {
  return (
    <div className={`px-3 py-2 rounded-bottom-4 ${fromUser ? 'align-self-end bg-body-secondary rounded-start-4' : 'align-self-start bg-dark-subtle rounded-end-4'}`}>
      <div>
        <strong>{fromUser ? "Você" : "Gemini"}</strong>
        {isLoading && <Spinner animation="border" size="sm" className="ms-2" />}
      </div>
      {isError 
        ? <div className="text-danger">Erro ao gerar resposta</div>
        : <div>{text}</div>
      }
    </div>
  );
}

Message.propTypes = {
  fromUser: PropTypes.bool.isRequired,
  text: PropTypes.string.isRequired,
  isLoading: PropTypes.bool,
  isError: PropTypes.bool,
};

function MessageList({ messages }) {
  const listElementRef = useRef(null);  

  useLayoutEffect(() => {
    listElementRef.current.scrollTop = listElementRef.current.scrollHeight;
  }, [messages]);

  return (
    <Container ref={listElementRef} className="flex-grow-1 overflow-y-scroll">
      <div className="mh-100 d-flex flex-column gap-2">
        {messages.map(({ id, ...message }) => (
          <Message key={id} {...message} />
        ))}
      </div>
    </Container>
  );
}

MessageList.propTypes = {
  messages: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired,
      fromUser: PropTypes.bool.isRequired,
      text: PropTypes.string.isRequired,
      isLoading: PropTypes.bool,
      isError: PropTypes.bool,
    })
  ).isRequired,
};

function MessageEditor({ onSend }) {

  const handleSend = useCallback(() => {
    const form = document.querySelector("form");
    const formData = new FormData(form);
    const newMessage = formData.get("newMessage");
    onSend(newMessage)
    form.reset();
  }, [onSend]);

  const submitOnEnter = useCallback((event) => {
    if (event.key === "Enter" && !event.shiftKey) {
      event.preventDefault();
      handleSend();
    }
  }, [handleSend]);

  return (
    <Container className="my-3">
      <Form className="d-flex gap-1">
        <Form.Group className="flex-grow-1">
          <Form.Control name="newMessage" as="textarea" placeholder="Digite sua mensagem..." onKeyDown={submitOnEnter} />
        </Form.Group>
        <Button onClick={handleSend}>Enviar</Button>
      </Form>
    </Container>
  );
}

MessageEditor.propTypes = {
  onSend: PropTypes.func.isRequired,
};

function useChatSession(apiKey) {
  return useMemo(() => {
    const genAI = new GoogleGenerativeAI(apiKey);
    const model = genAI.getGenerativeModel({ model: "gemini-pro" });
    return model.startChat({
      generationConfig: {
        maxOutputTokens: 256,
      },
    });
  }, [apiKey]);
}

const mockMessages = [
  { id: "1", fromUser: true, text: "Olá, Gemini!" },
  { id: "2", fromUser: false, text: "Olá, humano!" },
  { id: "3", fromUser: true, text: "Como você está?" },
  { id: "4", fromUser: false, text: "Estou bem, obrigado! E você?" },
  { id: "5", fromUser: true, text: "Estou bem também, obrigado!" },
  { id: "6", fromUser: false, text: "Que bom!" },
  { id: "8", fromUser: true, text: "Estou testando o Gemini!" },
  { id: "9", fromUser: false, text: "Que legal! Como estou me saindo?" },
  { id: "10", fromUser: true, text: "Você está indo muito bem!" },
  { id: "11", fromUser: false, text: "Obrigado! Estou aqui para ajudar.", isLoading: true },
];

function ChatScreen({ apiKey, updateApiKey }) {
  const [messageList, setMessageList] = useState(apiKey === '123' ? mockMessages : []);
  const chatSession = useChatSession(apiKey);

  const addToMessageList = useCallback((fromUser, message, isLoading = false) => {
    const id = nanoid();
    setMessageList((list) => [
      ...list,
      {
        id,
        fromUser,
        text: message,
        isLoading,
      },
    ]);
    return id;
  }, []);

  const updateMessage = useCallback((id, update) => {
    setMessageList((list) =>
      list.map((message) =>
        message.id === id
          ? {
              ...message,
              ...update,
            }
          : message
      )
    );
  }, []);

  const sendMessage = useCallback(async (message) => {
    addToMessageList(true, message);
    const promise = chatSession.sendMessage(message);
    const id = addToMessageList(false, 'Gerando resposta...', true);
    try {
      const {response} = await promise;
      const text = response.text();
      updateMessage(id, { text, isLoading: false });
    } catch (e) {
      console.log(e);
      updateMessage(id, { isLoading: false, isError: true });
    }
  }, [addToMessageList, chatSession, updateMessage]);
  
  const keyExcerpt = `...${apiKey.slice(-4)}`;

  return (
    <div className="h-100 d-flex flex-column">
      <ChatNavBar apiKey={keyExcerpt} onLogout={() => updateApiKey("")} />
      <MessageList messages={messageList} />
      <MessageEditor onSend={sendMessage} />
    </div>
  );
}

ChatScreen.propTypes = {
  apiKey: PropTypes.string.isRequired,
  updateApiKey: PropTypes.func.isRequired,
};

export default ChatScreen;
