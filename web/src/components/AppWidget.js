import React, { Component } from "react";
import ReactDOM from "react-dom";
import styled from "styled-components";
import Skycons from "react-skycons";

const AppWidgetWrapper = styled.div`
	& {
		max-width: 450px;
		padding: 40px;
	}
	.widget-wrapper pre {
		color: white;
	}
	.weather-icon {
		max-width: 200px;
		width: 100%;
		height: auto;
		margin-left: -40px;
	}
	p {
		color: white;
		font-family: "Rutan";
		text-shadow: 0px 0px 10px rgba(150, 150, 150, 0.35);
	}
	.location {
		font-size: 15px;
		font-weight: 600;
		text-transform: uppercase;
		letter-spacing: 2.5px;
		margin: 0px 0px 5px;
	}
	.summary {
		font-size: 15px;
		font-weight: 300px;
		margin: 0px;
	}
	.temp {
		font-size: 220px;
		font-weight: 200;
		margin: 0px;
	}
	.temp:after {
		content: "\\02DA";
	}
`;

class AppWidget extends React.Component {
	render() {
		const { data } = this.props;
		const icon = data.weather.icon.replace(/-/g, "_").toUpperCase();

		return (
			<AppWidgetWrapper>
				<div className="widget-wrapper">
					<Skycons
						color="white"
						icon={icon}
						autoplay={false}
						className="weather-icon"
					/>
					<p className="location">
						{data.weather.location.city}, {data.weather.location.state}
					</p>

					<p className="summary">{data.weather.summary}</p>

					<p className="temp">{Math.round(data.weather.temperature)}</p>
				</div>
			</AppWidgetWrapper>
		);
	}
}

export default AppWidget;
