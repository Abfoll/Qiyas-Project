import React, { useState } from "react";
import { CREATE_USER_MUTATION } from "../GraphQL/Mutations";
import { useMutation } from "@apollo/client/react";
import { LOAD_USERS } from "../GraphQL/Queries";

function Form() {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [submitError, setSubmitError] = useState("");

  const [createUser, { error }] = useMutation(CREATE_USER_MUTATION);

  const addUser = async () => {
    setSubmitError("");

    if (!firstName || !lastName || !email || !password) {
      setSubmitError("All fields are required, including password.");
      return;
    }

    try {
      await createUser({
        variables: {
          firstName: firstName,
          lastName: lastName,
          email: email,
          password: password,
        },
        refetchQueries: [{ query: LOAD_USERS }],
        awaitRefetchQueries: true,
      });
    } catch (mutationError) {
      setSubmitError(mutationError.message);
      console.log(mutationError);
    }
  };
  return (
    <div>
      <input
        type="text"
        placeholder="First Name"
        value={firstName}
        onChange={(e) => {
          setFirstName(e.target.value);
        }}
        required
      />
      <input
        type="text"
        placeholder="Last Name"
        value={lastName}
        onChange={(e) => {
          setLastName(e.target.value);
        }}
        required
      />
      <input
        type="text"
        placeholder="Email"
        value={email}
        onChange={(e) => {
          setEmail(e.target.value);
        }}
        required
      />
      <input
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) => {
          setPassword(e.target.value);
        }}
        required
      />
      <button onClick={addUser}> Create User</button>
      {submitError ? <p>{submitError}</p> : null}
      {error ? <p>{error.message}</p> : null}
    </div>
  );
}

export default Form;