import styled from "styled-components";

export const Form = styled.form`
  position: fixed;
  z-index: 999;
  width: 100%;
  height: 100%;
  display: ${props => (props.formOpen ? "grid" : "none")};
  justify-content: center;
  align-content: center;
  background-color: rgba(0, 0, 0, 0.3);

  .content {
    width: 300px;
    padding: 20px;
    display: flex;
    flex-direction: column;

    background-color: #fff;
    label {
      text-align: center;
      padding: 20px 0px;
      font-size: 1.3em;
    }
    input {
      border: solid 1px rgba(0, 0, 0, 0.1);
      border-radius: 5px;
      outline: none;
      height: 40px;
      margin-bottom: 20px;
      padding-left: 20px;
    }
    .buttons {
      display: grid;
      grid-template-columns: 1fr 1fr;
      grid-gap: 10px;
    }
    button {
      height: 40px;
      width: 100%;
      font-size: 1.2em;
      border: none;
      background-color: rgba(0, 0, 0, 0.3);
      color: #fff;
      border-radius: 3px;
      cursor: pointer;
    }
    button[type="submit"] {
      background-color: rgba(46, 204, 113, 1);
      color: #fff;
      cursor: pointer;
      border-radius: 3px;
    }
  }
`;
