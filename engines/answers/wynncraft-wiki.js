const { requestJSON } = require('../../parser')

const wynncraftRegex = /^(?:wynn(?:craft)?)?\s*?([^<>]+?)\s*(?:wynn(?:craft)?)?$/i


async function request(query) {
	const regexMatch = query.match(wynncraftRegex)
	if (!regexMatch) return {}
	const wynncraftQuery = regexMatch[1]
	const summaryJson = await requestJSON('https://wynncraft.gamepedia.com/api.php?format=json&action=query&prop=extracts&exintro&explaintext&redirects=1&titles=' + encodeURIComponent(wynncraftQuery))
	const pages = summaryJson.query.pages
	const pageId = Object.keys(pages)[0]
	const article = pages[pageId]
	if (article.missing !== undefined) return {}
	return {
		sidebar: {
			title: 'Wynncraft - ' + article.title,
			content: article.extract,
			image: '/wynncraft.webp',
			url: 'https://wynncraft.gamepedia.com/' + article.title.replace(' ', '_')
		}
	}
}

module.exports = { request }