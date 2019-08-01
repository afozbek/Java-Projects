import React, { Component, Fragment } from "react";
import { Link } from "react-router-dom";
import axios from "../../axios-instance";

export default class RegisterForm extends Component {
    state = {
        jwttoken: "",
        message: "",
        input: {
            firstName: "",
            lastName: "",
            username: "",
            password: "",
            message: "",
            confirm: false
        }
    };

    inputChangeHandler = e => {
        let inputName = e.target.name;
        let value = e.target.value;

        this.setState(prevState => ({
            ...prevState,
            input: {
                ...prevState.input,
                [inputName]: value
            }
        }));
    };

    confirmChangeHandler = e => {
        let checked = e.target.checked;
        let name = e.target.name;

        this.setState(prevState => ({
            ...prevState,
            input: {
                ...prevState.input,
                [name]: checked
            }
        }));
    };

    componentDidMount() {
        const jwttoken = localStorage.getItem("jwttoken");

        if (!jwttoken) {
            this.props.history.push("/login");
        }

        this.setState({
            jwttoken
        });
    }

    formSubmitHandler = e => {
        e.preventDefault();

        const {
            firstName,
            lastName,
            username,
            password,
            confirm
        } = this.state.input;

        const responseData = {
            firstName,
            lastName,
            username,
            password,
            authorities: confirm ? ["ROLE_ADMIN", "ROLE_USER"] : ["ROLE_USER"]
        };

        axios
            .post("/admin/user", responseData, {
                headers: { Authorization: "Bearer " + this.state.jwttoken }
            })
            .then(res => {
                console.log(res.data);
                this.setState({
                    message: res.data.username + " successfully registered 😊"
                });

                this.props.history.push("/users");
            })
            .catch(err => {
                console.log(err);
                this.setState({ message: err.message });
            });
    };

    render() {
        return (
            <Fragment>
                <Link to="/users">See Users</Link>
                <Link to="/">Home Page</Link>
                <form className="form" onSubmit={this.formSubmitHandler}>
                    <div className="inner-container">
                        <h1 className="header">Add User</h1>
                        <div className="form-input">
                            <label htmlFor="firstName" className="form-label">
                                <span className="form-label-text">
                                    Firstname :
                                </span>
                                <input
                                    onChange={this.inputChangeHandler}
                                    className="form-text form-label-input"
                                    id="firstName"
                                    type="text"
                                    name="firstName"
                                    required
                                />
                            </label>
                        </div>
                        <div className="form-input">
                            <label htmlFor="lastName" className="form-label">
                                <span className="form-label-text">
                                    Lastname:
                                </span>
                                <input
                                    onChange={this.inputChangeHandler}
                                    className="form-text form-label-input"
                                    id="lastName"
                                    type="text"
                                    name="lastName"
                                    required
                                />
                            </label>
                        </div>
                        <div className="form-input">
                            <label htmlFor="username" className="form-label">
                                <span className="form-label-text">
                                    Username:
                                </span>
                                <input
                                    onChange={this.inputChangeHandler}
                                    className="form-text form-label-input"
                                    id="username"
                                    type="text"
                                    name="username"
                                    required
                                />
                            </label>
                        </div>

                        <div className="form-input">
                            <label htmlFor="password" className="form-label">
                                <span className="form-label-text">
                                    Password:
                                </span>
                                <input
                                    onChange={this.inputChangeHandler}
                                    className="form-text"
                                    id="password"
                                    type="password"
                                    name="password"
                                    required
                                />
                            </label>
                        </div>

                        <div className="form-input">
                            <label htmlFor="confirm" className="form-label">
                                <span className="form-label-text">
                                    Are you an admin:
                                </span>
                                <input
                                    onChange={this.confirmChangeHandler}
                                    className="form-text"
                                    id="confirm"
                                    type="checkbox"
                                    name="confirm"
                                />
                            </label>
                        </div>

                        <h2>{this.state.message}</h2>
                        <input
                            className="button"
                            type="submit"
                            value="REGISTER"
                        />
                    </div>
                </form>
            </Fragment>
        );
    }
}
