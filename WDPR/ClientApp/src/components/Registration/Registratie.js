import React, {useState} from "react";
import {FaRegCalendar} from 'react-icons/fa';
import axios from "axios";

function Login() {
    const wwVergeten = {
        color: '#8B0001',
        float: 'right'
    }

    const loginKnop = {
        backgroundColor: '#8B0001',
        borderRadius: '10px',
        width: '100%',
        border: '0px'
    }

    const [naam, setNaam] =useState("");
    const [datum, setDatum] =useState("");
    const [email, setEmail] =useState("");
    const [wachtwoord, setWachtwoord] =useState("");
    const [message, setMessage] =useState("");
    

    const handleChangeNaam = (value) => {
        setNaam(value);
    };
    const handleChangeWachtwoord = (value) => {
        setWachtwoord(value);
    };

    const handleChangeDatum = (value) => {
        setDatum(value);
    };

    let handleRegistratie = async (e) => {
        e.preventDefault();
        try {
            let res = await fetch("https://localhost:7260/api/Account/registreer", {
                headers: {'Content-Type': 'application/json'},
                method: "POST",
                mode:"cors",
                body: JSON.stringify({
                    UserName: naam,
                    Password : wachtwoord,
                }),
            });

            if (res.status === 200) {
                // setNaam("");
                // setWachtwoord("")
                setMessage("gebruiker is ingelogd");
            } else {
                setMessage("error " + res.status);
            }
        } catch (err) {
            console.log(err);
        }
    }


    return (
        <section>
        <div className="container py-5 h-100">
            <div className="row d-flex justify-content-center align-items-center h-100">
                <div className="card rounded-3" style={{padding: '0px'}} >
                <div className="row g-0">
                    
                    <div className="col-lg-6 d-flex  justify-content-md-center" style={{backgroundColor: '#F39A05'}}>
                    <img src={"img/Logo_theater_laak_V2 (1).png"}
                    style={{width: '400px'}} alt="Theater Laak logo"/>
                    </div>

                    <div className="col-lg-6">
                    <div className="card-body p-md-5 mx-md-4">

                        <div className="text-center">
                        <h1>Registreer</h1>
                        <img src={"img/Logo_theater_laak_V2 (1).png"}
                    style={{width: '185px'}} alt="Theater Laak logo"/>
                        </div>

                        <form onSubmit={handleRegistratie}>

                        <div className="input-group mb-4">
                            <div className="input-group-prepend">
                                <span className="input-group-text" id="Gebruikersnaam"><FaRegCalendar/></span>
                            </div>
                            <input type="text" id="form2Example11" className="form-control" name="naam" aria-describedby="Gebruikersnaam" placeholder="naam" onChange={(e) => handleChangeNaam(e.target.value)}/>
                        </div>

                        <div className="form-outline input-group mb-4">
                            <div className="input-group-prepend">
                            <span className="input-group-text" id="basic-addon1">@</span>
                            </div>
                            <input type="date" id="form2Example11" className="form-control" name="datum" placeholder="datum" onChange={(e) => handleChangeNaam(e.target.value)}/>
                        </div>

                        <div className="form-outline input-group mb-4">
                            <div className="input-group-prepend">
                            <span className="input-group-text" id="basic-addon1">@</span>
                            </div>
                            <input type="mail" id="form2Example11" className="form-control" name="email" placeholder="email" onChange={(e) => handleChangeNaam(e.target.value)}/>
                        </div>

                        <div className="form-outline input-group mb-4">
                            <div className="input-group-prepend">
                            <span className="input-group-text" id="basic-addon1">@</span>
                            </div>
                            <input type="password" id="form2Example11" className="form-control" name="wachtwoord" placeholder="wachtwoord" onChange={(e) => handleChangeNaam(e.target.value)}/>
                        </div>

                        <div className="form-outline input-group mb-4">
                            <div className="input-group-prepend">
                            <span className="input-group-text" id="basic-addon1">@</span>
                            </div>
                            <input type="password" id="form2Example11" className="form-control" name="herhaal wachtwoord" placeholder="herhaal wachtwoord" onChange={(e) => handleChangeNaam(e.target.value)}/>
                        </div>

                        <div className="text-center pt-1 mb-4 ">
                            <input type="submit" className='btn btn-primary' style={loginKnop} value="registreer"/>
                        </div>

                        

                        <div className="d-flex align-items-center justify-content-center pb-4">
                            <p className="mb-0 me-2">Al een account?</p>
                            <a href="/login"  style={{color: '#F39A05'}}>Log in</a>
                            
                        </div>
                        </form>
                        
                    </div>
                    </div>
                </div>
                </div>
            </div>
            </div>

        </section>
    );
}

export default Login;