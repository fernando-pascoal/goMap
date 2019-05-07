import React, { Fragment } from "react";
import { Container, Item, Info, Icons } from "./styled";
import "font-awesome/css/font-awesome.css";

import PropTypes from "prop-types";
import { bindActionCreators } from "redux";
import * as UserActions from "../../store/actions/users";

import { connect } from "react-redux";

const UsersList = ({ users, removeUser }, props) => {
  if (users.length) {
    return (
      <Fragment>
        <Container>
          {users.map(user => (
            <Item key={user.id}>
              <img src={user.avatar_url} alt="imagem do usuario" />
              <Info>
                <h1>{user.name}</h1>
                <h3>{user.full_name}</h3>
              </Info>
              <Icons>
                <i className="fa fa-close" onClick={_ => removeUser(user.id)} />
                <i className="fa fa-angle-right" />
              </Icons>
            </Item>
          ))}
        </Container>
      </Fragment>
    );
  } else {
    return (
      <Fragment>
        <Container hide />
      </Fragment>
    );
  }
};

UsersList.propTypes = {
  users: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number,
      avatar_url: PropTypes.string,
      name: PropTypes.string,
      full_name: PropTypes.string,
      lngLat: PropTypes.array
    })
  ).isRequired
};

const mapStateToProps = state => ({
  users: state.users,
  removeUser: state.removeUser
});

const mapDispatchToProps = dispatch =>
  bindActionCreators(UserActions, dispatch);

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(UsersList);
