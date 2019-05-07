import React, { Component, Fragment } from "react";
import MapGL, { Marker } from "react-map-gl";
import axios from "../../config/axios";

import "mapbox-gl/dist/mapbox-gl.css";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import UsersList from "../../components/UsersList";
import { Form } from "./styles";

import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import * as UserActions from "../../store/actions/users";

class Map extends Component {
  state = {
    viewport: {
      width: window.innerWidth,
      height: window.innerHeight,
      latitude: -7.226418090739143,
      longitude: -39.32690245818993,
      zoom: 10
    },
    formOpen: false,
    inputValue: "",
    latitude: 0,
    longitude: 0
  };

  componentDidMount() {
    console.log(process.env.MAP_API_KEY);

    toast.configure({
      autoClose: 8000,
      draggable: false
    });
    window.addEventListener("resize", this._resize);
    this._resize();
  }

  componentWillUnmount() {
    window.removeEventListener("resize", this._resize);
  }

  _resize = () => {
    this.setState({
      viewport: {
        ...this.state.viewport,
        width: window.innerWidth,
        height: window.innerHeight
      }
    });
  };

  handleMapClick = e => {
    const [longitude, latitude] = e.lngLat;
    this.setState({ longitude, latitude, formOpen: true });
  };

  handleAddUser = async e => {
    e.preventDefault();

    try {
      const data = await axios
        .get(this.state.inputValue)
        .then(resp => resp.data);

      if (data && data.id > 0) {
        toast("Um novo usuário foi inserido", {
          type: toast.TYPE.INFO,
          autoClose: 5000
        });

        const User = {
          id: data.id,
          name: data.name,
          full_name: data.login,
          avatar_url: data.avatar_url,
          latitude: this.state.latitude,
          longitude: this.state.longitude
        };

        this.setState({
          longitude: 0,
          latitude: 0,
          formOpen: false,
          inputValue: ""
        });
        this.props.addUser(User);
      } else {
        toast("Esse usuário não existe", {
          type: toast.TYPE.ERROR
        });
      }
    } catch (error) {
      toast("Aconteceu algum erro", {
        type: toast.TYPE.ERROR
      });
    }
  };
  closeForm = e => {
    e.preventDefault();
    this.setState({ formOpen: false });
  };

  render() {
    return (
      <Fragment>
        <ToastContainer />
        <UsersList />
        <Form onSubmit={this.handleAddUser} formOpen={this.state.formOpen}>
          <div className="content">
            <label>Adicionar novo usuario</label>
            <input
              type="text"
              placeholder="Usuario do github"
              onChange={e => this.setState({ inputValue: e.target.value })}
              value={this.state.inputValue}
            />
            <div className="buttons">
              <button type="button" onClick={this.closeForm}>
                Cancelar
              </button>
              <button type="submit">Salvar</button>
            </div>
          </div>
        </Form>
        <MapGL
          {...this.state.viewport}
          onClick={this.handleMapClick}
          mapStyle="mapbox://styles/mapbox/basic-v9"
          mapboxApiAccessToken={
            process.env.MAP_API_KEY
          }
          onViewportChange={viewport => this.setState({ viewport })}
        >
          {this.props.users.map(user => (
            <Marker
              key={user.id}
              latitude={user.latitude}
              longitude={user.longitude}
              onClick={this.handleMapClick}
              captureClick={true}
            >
              <img
                style={{
                  borderRadius: 100,
                  width: 48,
                  height: 48
                }}
                src={user.avatar_url}
              />
            </Marker>
          ))}
        </MapGL>
      </Fragment>
    );
  }
}

const mapStateToProps = state => ({
  users: state.users,
  addUser: state.addUser
});

const mapDispatchToProps = dispatch =>
  bindActionCreators(UserActions, dispatch);

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Map);
