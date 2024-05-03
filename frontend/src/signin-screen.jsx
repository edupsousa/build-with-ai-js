import Button from "react-bootstrap/Button";
import Container from "react-bootstrap/Container";
import Form from "react-bootstrap/Form";
import PropTypes from "prop-types";

function SignInScreen({updateApiKey}) {
  
  const storeApiKey = (event) => {
    event.preventDefault();
    const formData = new FormData(event.target);
    const apiKey = formData.get('apiKey').trim();
    if (apiKey.length) {
      updateApiKey(apiKey);
    }
  }

  return (
    <Container className="h-100 d-flex justify-content-center align-items-center">
      <Form style={{maxWidth: '600px'}} onSubmit={storeApiKey}>
        <Form.Group className="mb-3">
          <Form.Label>Chave de API do Google AI</Form.Label>
          <Form.Control name="apiKey" type="text" placeholder="Informe sua chave..." autoComplete="off" />
          <Form.Text>
            <small>
            Sua chave de API será usada para realizar requisições à API do GeminiAI. 
            Ela será armazenada temporariamente somente em seu navegador e não será compartilhada com terceiros.<br />
            Se você não possuir uma chave, <a href="https://aistudio.google.com/app/apikey" target="_blank">clique aqui para criar.</a>
            </small>
          </Form.Text>
        </Form.Group>
        <div className="text-end">
        <Button variant="primary" type="submit" className="px-5">
          Entrar
        </Button>
        </div>
      </Form>
    </Container>
  )
}

SignInScreen.propTypes = {
  updateApiKey: PropTypes.func.isRequired,
};

export default SignInScreen;