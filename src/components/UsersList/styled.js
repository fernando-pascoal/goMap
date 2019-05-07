import styled from "styled-components";

export const Container = styled.div`
  padding: 20px;
  padding-top: 0;
  display: flex;
  flex-direction: column;
  height: 90vh;
  width: 300px;
  position: fixed;
  top: 5vh;
  left: ${props => (props.hide ? "-100%" : "30px")};
  transition: 1s;
  background: #fff;
  z-index: 2;
  box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.5);
`;

export const Item = styled.div`
  padding: 20px 0px;
  display: grid;
  grid-template-columns: 60px 150px auto;
  border-bottom: solid 1px rgba(0, 0, 0, 0.1);
  width: 100%;

  img {
    height: 60px;
    width: 60px;
    border-radius: 50%;
  }
  h1 {
    font-size: 1em;
  }
  h3 {
    font-size: 0.9em;
    color: rgba(0, 0, 0, 0.3);
  }
`;

export const Info = styled.div`
  display: grid;
  justify-content: center;
  align-content: center;
  width: 100%;
`;

export const Icons = styled.div`
  display: grid;
  grid-template-columns: 50px auto;
  align-content: center;
  justify-content: center;

  .fa-close {
    font-size: 1.5em;
    color: rgba(214, 69, 65, 1);
    cursor: pointer;
  }
  .fa-angle-right {
    font-size: 1.5em;
    color: rgba(0, 0, 0, 0.2);
  }
`;
