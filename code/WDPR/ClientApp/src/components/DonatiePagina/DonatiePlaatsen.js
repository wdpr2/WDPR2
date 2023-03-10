import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';

const DonatiePlaatsen = () => {

    const loginKnop = {
        backgroundColor: '#8B0001',
        borderRadius: '10px',
        width: '100%',
        border: '0px'
    }

    const [hoeveelheid, setHoeveelheid] = useState('');
    const [tekst, setTekst] = useState('');
    const jwtToken = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiI3ZTc4MDcwYy1kYjk2LTQ2ZmItOWE4MC01MWM3ZjIwY2MzNTQiLCJqdGkiOiIxYzZjNzIwMS1lNmU0LTQ0MzItODRmNS0yMWFhZTllY2U5MGUiLCJpYXQiOiIwMS8yMi8yMDIzIDEwOjQxOjQ5IiwiVXNlcklkIjoiN2U3ODA3MGMtZGI5Ni00NmZiLTlhODAtNTFjN2YyMGNjMzU0IiwiRW1haWwiOiJ2b2xlZ2E5NTU1QHRpbmduLmNvbSIsImV4cCI6MTk5MDAwMzMwOSwiaXNzIjoiSWtEb25lZXIiLCJhdWQiOiIqIn0.mapxr6gQjgLHq161mVw1B69fV4orZgK-1lsd57AFBm8';
    const doel = 62;
    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await fetch('https://ikdoneer.azurewebsites.net/api/donatie', {
                method: 'POST',
                headers: {
                    'Authorization': 'Bearer ' + jwtToken,
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    Doel: doel,
                    Hoeveelheid: hoeveelheid,
                    Tekst: tekst
                })
            });
            const data = await response.json();
            console.log(data);
            alert('Bedankt voor uw donatie!!');
        } catch (error) {
            console.log(error);
            alert('Error making donation. Please try again.');
        }
    }

    return (
        <div class="wrapper">
        <div class="container">

        <div className="row align-items-center justify-content-center g-0">
            <div className="col-12 col-md-8 col-lg-4">
            <div className="card shadow-sm">
                <div className="card-body">
                <div className="mb-4">
                    <h2>Donatie Pagina</h2>
                    <p className="mb-2">Elke cent telt</p>
                </div>
                <form onSubmit={handleSubmit}>
                    <div className="mb-3">
                    <label htmlFor="hoeveelheid" className="form-label">hoeveelheid:</label>
                    <input type="number" className="form-control" value={hoeveelheid} onChange={e => setHoeveelheid(e.target.value)} required/>
                    </div>
                    <div className="mb-3">
                    <label htmlFor="wachtwoord" className="form-label">Tekst:</label>
                    <textarea rows="2" className="form-control" value={tekst} onChange={e => setTekst(e.target.value)} />
                    </div>
                    <div className="mb-3 d-grid">
                    <button type="submit" className="btn btn-primary" style={loginKnop}>Doneer</button>
                    </div>
                </form>

                </div>
            </div>
            </div>
        </div>
        </div>
        </div>


    );
}

export default DonatiePlaatsen;