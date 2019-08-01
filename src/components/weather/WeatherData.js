import React, { useState, useEffect, useRef } from "react";
import WeatherAPI from "openweather-apis";
import Weather from "./Weather";
import {
  Button,
  Form,
  FormGroup,
  Label,
  Input,
  Container,
  Row,
  Col
} from "reactstrap";

const WeatherData = () => {
  const initialState = {
    apiKey: `${process.env.REACT_APP_KEY}`,
    loading: true,
    forecastLength: 5,
    lang: "en",
    units: "imperial",

    error: ""
  };
  const [state] = useState(initialState);
  const zipRef = useRef();
  const [zipcode, setZipcode] = useState("01843");
  const [units, setUnits] = useState(true);
  // const [coord, setCoord] = useState(`426, -711`);
  const [forecast, setForecast] = useState({});
  const [error, setError] = useState("error");
  const [loading, setLoading] = useState(true);
  const handleSubmit = e => {
    e.preventDefault();
    fetchData(zipcode);
    // console.log(forecast);
  };
  const handleUnits = () => {
    setUnits(!units);
    let unit = units ? "metric" : "imperial";
    fetchData(zipcode, unit);
  };

  // API

  function fetchData(zipCode, units = "imperial") {
    WeatherAPI.setAPPID(state.apiKey);
    WeatherAPI.setLang(state.lang);
    WeatherAPI.setUnits(units);
    if (zipCode) WeatherAPI.setZipCode(zipcode);
    // WeatherAPI.setCoordinate(coord);
    WeatherAPI.getWeatherForecastForDays(5, (err, obj) => {
      setForecast(obj);
      setError(obj.cod);
      setLoading(false);
    });
  }
  useEffect(() => {
    fetchData(zipcode);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="wrapper-body">
      <div className="container">
        <Container>
          <Row className="justify-content-center">
            <Col md="10  bg-light p-4">
              <Form
                className="form-inline justify-content-center"
                onSubmit={e => handleSubmit(e)}
              >
                <FormGroup>
                  <Label for="exampleEmail" className="small text-muted pr-2">
                    Enter Zipcode
                  </Label>
                  <Input
                    className="form-control mr-4 mb-2"
                    ref={zipRef}
                    placeholder={"zipcode"}
                    onChange={e => setZipcode(e.target.value)}
                  />
                  <Button className="btn btn-primary mb-2">Submit</Button>
                </FormGroup>
              </Form>
            </Col>
          </Row>
          <Row className="justify-content-center">
            <Col md="10" className="">
              {forecast && !loading && (
                <Weather
                  forecast={forecast}
                  state={state}
                  error={error}
                  handleUnits={handleUnits}
                />
              )}
            </Col>
          </Row>
        </Container>
      </div>
    </div>
  );
};

export default WeatherData;
