// Using Geolocation and the DarkSky API

import React, { useState, useEffect, useCallback } from "react";
import { Button, Row, Col, Alert } from "reactstrap";
// import axios from "axios";
import data from "./data";
import Timeline from "./Timeline";

const DarkWeather = ({ city }) => {
  console.log(city);

  // Location

  const getLocation = useCallback(() => {
    if (navigator.geolocation) {
      // loader.show();
      navigator.geolocation.getCurrentPosition(function(position) {
        console.log(position);
      });
      return;
    } else {
      let err_message =
        "O no:( Geolocation is not supported for this Browser/OS version.";
      return displayError(err_message);
    }
  });

  // Error Handling
  function getError(err) {
    let err_message = "";
    switch ((err.code, err_message)) {
      case err.PERMISSION_DENIED:
        err_message =
          "O no:( Looks like you did not allow your current location to be shared.";
        break;
      case err.POSITION_UNAVAILABLE:
        err_message =
          "O no:( Location information is unavailable. Try reloading the page.";
        break;
      case err.TIMEOUT:
        err_message = "O no:( The request timed out. Try reloading the page.";
        break;
      case err.UNKNOWN_ERROR:
        err_message =
          "Oops we don't know what happened:( Try reloading the page.";
        break;
      default:
        break;
    }
    displayError(err_message);
  }

  function displayError(err_message) {
    return (
      <>
        <Alert color="warning">{err_message}</Alert>
      </>
    );
  }
  const options = {
    //enableHighAccuracy: true,
    timeout: 10000
  };

  useEffect(() => {
    return () => {
      getLocation();
    };
  }, [getLocation]);

  //Render
  return (
    <>
      <Row>
        <Col>{getLocation()}</Col>
      </Row>
      <Row className="row bg-light mt-1">
        <Col className="p-4">
          {<h1>{city.city.name}</h1>}
          <h5>3 day weather</h5>
          <p>temperature: {data.currently.temperature}</p>
          <p>Feels like: {data.currently.temperature}</p>
          <p>humidity: {data.currently.humidity}</p>
          <p>Low: {data.daily.data[0].temperatureLow}</p>
          <p>High: {data.daily.data[0].temperatureHigh}</p>
          <p>{data.hourly.summary}</p>
          <p>{data.daily.summary}</p>
        </Col>
      </Row>
    </>
  );
};

export default DarkWeather;

// useEffect(() => {
//   return navigator.geolocation.getCurrentPosition(function(position) {
//     // console.log(position);
//     setCoord(`${position.coords.latitude}, ${position.coords.longitude}`);
//     // console.log(coord);
//   });
//   // eslint-disable-next-line react-hooks/exhaustive-deps
// }, [coord]);

{
  /* <Button color="danger" className="mt-4" onClick={e => e}>
          use my location
        </Button>
         {useLocation && forecast && <DarkWeather city={forecast} />} */
}
