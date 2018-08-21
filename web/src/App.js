import React, { Component } from "react";
import { withData } from "./shared";
import ReactDOM from "react-dom";
import ApolloClient from "apollo-boost";
import { Query, ApolloProvider } from "react-apollo";
import gql from "graphql-tag";
import styled from "styled-components";

import AppWidget from "./components/AppWidget";

const query = gql`
	query Weather($lng: Float!, $lat: Float!) {
		weather(lng: $lng, lat: $lat) {
			summary
			icon
			precipIntensity
			temperature
			apparentTemperature
			photo {
				full
			}
			location {
				city
				state
				country
			}
		}
	}
`;

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

const client = new ApolloClient({
	uri: "https://full-stack-weather.now.sh"
});

function App() {
	return (
		<ApolloProvider client={client}>
			<Query query={query} variables={{ lat: 34.85075, lng: -82.39896 }}>
				{({ data, error, loading }) => {
					if (error) return error.message;
					if (loading) return "Loading...";

					return (
						<Container>
							<img className="bg-img" src={data.weather.photo.full} />
							<AppWidget data={data} />
						</Container>
					);
				}}
			</Query>
		</ApolloProvider>
	);
}

export default withData(App);
