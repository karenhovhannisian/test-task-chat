import React, {useState, useEffect} from "react";
import { Button, Modal, ModalBody, ModalFooter, Label, Input, FormGroup, Form, FormFeedback, FormText} from 'reactstrap';
import FirebaseApi from "../api";
import {useSession} from "../hooks/useSession";


const AuthModal = () => {
    const { user } = useSession();
    const [open, setOpen] = useState(true);
    const [authMode, setAuthMode] = useState(1); // Show Sign up at first
    const [email, setEmail] = useState("");
    const [emailError, setEmailError] = useState(null);
    const [password, setPassword] = useState("");

    useEffect(() => {
        if(user && user.email && open){
            setOpen(false)
        }

    },[user]);

    const onAuth = () => {
        if(authMode){ // Register
            FirebaseApi.signUp({email, password })
                .then(() => setOpen(false))
                .catch(() => setEmailError(true) )
        } else {
            FirebaseApi.signIn({email, password })
                .then(() => setOpen(false))
                .catch(() => setEmailError(true) )
        }

    };

    const changeAuthMode = () => {
        setAuthMode(!authMode)
    };

    return (
        <div>
            <Modal returnFocusAfterClose={open} isOpen={open}>
                <ModalBody>
                     <Form>
                        <FormText>{authMode ? "Register": "Login"}</FormText>
                        <FormGroup>
                            <Label for="email">Email</Label>
                            <Input invalid={emailError} type="email" value={email} onChange={({target}) => setEmail(target.value)} />
                            <FormFeedback>Wrong Email</FormFeedback>
                        </FormGroup>
                        <FormGroup>
                            <Label for="password">Password</Label>
                            <Input value={password}
                                   invalid={emailError}
                                   onChange={({target}) => setPassword(target.value)}
                                   type={"password"}
                            />
                            <FormFeedback>Wrong Password</FormFeedback>

                        </FormGroup>
                    </Form>
                </ModalBody>
                <FormText
                    style={{textAlign: "center", cursor: "pointer"}}
                    onClick={changeAuthMode}> {authMode ? "Already have an account ?" : "Don't have an account?"}
                </FormText>
                <ModalFooter>
                    <Button color="primary" onClick={onAuth}>{authMode ? "Register": "Login"} & Start Chat</Button>
                </ModalFooter>
            </Modal>
        </div>
    )
};

export default AuthModal
