import React, { useState, useEffect } from "react";
import QrCode from './Kaartje';
import Footer from "../navFoot/Footer";
import NavBar from "../navFoot/navbar"
import Kaartje from "./Kaartje";
import { Navigate } from "react-router-dom";
import GetEndpoint from "../Admin/EndPointUtil";

function GebruikersPortaal() {
    const [kaartjes, setKaartjes] = useState([]);
    const [error, setError] = useState('');
    const [redirect, setRedirect] = useState("");

    useEffect(() => {
        // Get the email from the user's session
        const email = sessionStorage.getItem("gebruikersNaam");

        if (email == null) setRedirect("/inloggen");
        // Fetch the kaartjes when the component mounts
        fetch(GetEndpoint()+`Kaartje/kaartjeBijGebruiker/${email}`,{
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            }
        })
            .then(res => res.json())
            .then(data => {
                if (data.error) {
                    setError(data.error);
                    console.log('geen data');
                } else {
                    setKaartjes(data);
                    console.log(data);
                }
            })
            .catch(err => setError(err.message));
    }, []);

    const getKaartjes = () => {
        return(kaartjes.map(kaartje => {
            return (
                <div className="row ">
                    <Kaartje kaartje={kaartje} />
                </div>
            );
        }));
    }

    return redirect == "" ? (
        <>
            <NavBar/>
            <div className="container">
                <div className="row">
                <h1 className="text-center my-5">Kaartjes</h1>

                {kaartjes.length > 0 ? (
                    <div>
                        { getKaartjes() }
                    </div>
                ) : (
                    <p className="text-center">Er zijn nog geen kaartjes gekoppeld aan uw account</p>
                )}</div>
            </div>
            <Footer/>
        </>
    ) : (
            <Navigate to={redirect}/>
    );
}

export default GebruikersPortaal;