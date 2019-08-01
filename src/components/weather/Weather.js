import React from "react";
import Moment from "moment";
import { Row, Col, Alert } from "reactstrap";
import Degrees from "./Degrees";

const Weather = ({ forecast, state, error, handleUnits }) => {
  const { city } = forecast;
  function formatDate(timestamp) {
    var day = Moment(timestamp * 1000).format("dddd");
    return day;
  }

  //Render
  return error !== "200" || !city || !forecast ? (
    <>
      <Alert color="warning">
        {error} | {forecast.message}
        <Col className="bd-highlight ">
          <h6>Please try a different zipcode.</h6>
        </Col>
      </Alert>
    </>
  ) : (
    <Row>
      <Col>
        <Row className="row bg-light mt-1">
          <Degrees onDegreesChange={handleUnits} selectedValue={"F"} />
          <Col className="p-4 col-md-12">
            <h1>{city.name}</h1>
            <h5>{state.forecastLength} day weather</h5>
          </Col>
        </Row>
        <Row>
          <Col>
            {forecast.list.map((item, idx) => (
              <Row key={item.dt} className="row bg-light mt-1">
                <Col className="col-md-12 d-flex p-3">
                  <div className="mr-auto p-2 bd-highlight">
                    <h5>{idx === 0 ? "Today" : formatDate(item.dt)}</h5>
                  </div>
                  <h1>{Math.round(item.temp.day)}&deg;</h1>
                  <div className="degrees">
                    <div className="p-2 bd-highlight">
                      <img
                        src={`https://openweathermap.org/img/w/${
                          item.weather[0].icon
                        }.png`}
                        alt="weather icon"
                      />
                    </div>
                    <div className="p-2 bd-highlight">
                      <strong>{item.weather[0].main}</strong> <br />{" "}
                      <span className="small">
                        {item.weather[0].description}
                      </span>
                    </div>
                    <div className="p-2 bd-highlight">
                      {Math.round(item.temp.max)}&deg; /{" "}
                      {Math.round(item.temp.min)} &deg;
                    </div>
                  </div>
                </Col>
              </Row>
            ))}
          </Col>
        </Row>
      </Col>
    </Row>
  );
};

export default Weather;
