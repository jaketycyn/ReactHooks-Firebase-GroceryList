import React, { useState } from "react";
import * as firebase from "firebase/app";
import styled from "styled-components";

const StyledForm = styled.form`
  width: 100%;
  background-position: center;
  color: transparent; /* Hide button text */
  padding: 20px 70px;
  background-color: #fff;
  margin: 8px 0;
  box-sizing: border-box;

  input[type="text"] {
    border: 2px solid black;
    border-radius: 4px;
    -webkit-transition: width 0.4s ease-in-out;
    transition: width 0.4s ease-in-out;
  }
  input[type="text"]:focus {
    width: 100%;
    height: 15px;
  }
`;

export default function ItemForm() {
  const [value, setValue] = useState("");

  const handleSubmit = e => {
    e.preventDefault();

    let user = firebase.auth().currentUser;

    firebase
      .firestore()
      .collection("shopping-list-db")
      .add({
        //prop type of string and possibly number (ex: 3 chickens as an item)
        value,
        //prop type of list -> for icon styling purposes
        list: false,
        timestamp: new Date(),
        userId: user.uid
      })
      .then(() => {
        setValue("");
      });
    // just html from before displaying but not linked to Firebase
    // if (!value) return;
    // addItem(value);
    // setValue("");
  };

  return (
    <StyledForm onSubmit={handleSubmit}>
      <input
        type="text"
        value={value}
        placeholder={"Add to your List"}
        onChange={e => setValue(e.target.value)}
      />
    </StyledForm>
  );
}
