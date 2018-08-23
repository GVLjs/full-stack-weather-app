import React, { Component } from "react";
import { withData } from "./shared";
import ReactDOM from "react-dom";
import ApolloClient from "apollo-boost";
import { Query, ApolloProvider } from "react-apollo";
import gql from "graphql-tag";
import styled from "styled-components";

import AppWidget from "./components/AppWidget";

const Container = styled.div`
	.bg-img {
		min-height: 100%;
		min-width: 1024px;
		width: 100%;
		height: auto;
		position: fixed;
		top: 0;
		left: 0;
	}
	.widget-wrapper {
		position: relative;
	}
	@media screen and (max-width: 1024px) {
		/* Specific to this particular image */
		img.bg-img {
			left: 50%;
			margin-left: -512px; /* 50% */
		}
	}
`;

const WEATHER_QUERY = gql`
	query WeatherQuery($lng: Float!, $lat: Float!) {
		weather(lng: $lng, lat: $lat) {
			summary
			icon
			temperature
			photo {
				regular
				color
				constrastColor
				credit
				link
				location
			}
			location {
				city
				state
				country
			}
		}
	}
`;

const client = new ApolloClient({ uri: "https://full-stack-weather.now.sh/" });

class App extends React.Component {
	state = {
		location: null
	};

	componentDidMount() {
		navigator.geolocation.getCurrentPosition(position => {
			this.setState({ location: position });
		});
	}

	render() {
		const { location } = this.state;

		if (!location) {
			return null;
		}

		return (
			<ApolloProvider client={client}>
				<Query
					query={WEATHER_QUERY}
					variables={{
						lat: location.coords.latitude,
						lng: location.coords.longitude
					}}>
					{({ loading, error, data }) => {
						if (loading) return "Loading...";
						if (error) return error.message;

						return (
							<Container>
								<img className="bg-img" src={data.weather.photo.regular} />
								<AppWidget data={data} />
							</Container>
						);
					}}
				</Query>
			</ApolloProvider>
		);
	}
}

export default withData(App);
