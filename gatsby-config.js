module.exports = {
	siteMetadata: {
		title: `Rock Paper Scissors Pose Hand`,
		description: `Confront yourself against the posehand TensorflowJS model at Rock Paper Scissors game`,
		author: `Aurélien Dupays Dexemple`,
	},
	plugins: [
		`gatsby-plugin-react-helmet`,
		`gatsby-plugin-emotion`,
		`gatsby-plugin-chakra-ui`,
		`gatsby-transformer-sharp`,
		`gatsby-plugin-sharp`,
		{
			resolve: `gatsby-plugin-manifest`,
			options: {
				icon: `src/favicon/favicon.ico`
			}
		},
	],
}
