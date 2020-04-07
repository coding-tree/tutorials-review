import React from "react";
import { Link } from "react-router-dom";
import logoImg from "../img/logo.jpg";
import { Card, Logo, Form, Input, Button } from "../components/AuthForm";

const Signup = props => {
  return (
    <Card>
      <Logo src={logoImg} />
      <Form>
        <Input type="email" placeholder="email" />
        <Input type="password" placeholder="password" />
        <Input type="password" placeholder="password again" />
        <Button>Signup</Button>
      </Form>
      <Link to="/login">Already have an account?</Link>
    </Card>
  );
};

export default Signup;
