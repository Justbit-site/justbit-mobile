const URL = 'https://ws.audioscrobbler.com/2.0/?method=geo.gettopartists&country=spain&api_key=e3600e6e9a6f5d84d4029f52750f5dd5&format=json'

export function getCompanies(){
  return fetch( URL )
    .then(response => response.json())
    .then(data => data.topartists.artist)
    .then(companies => companies.map(company => {
      return {
        name: company.name,
        image: company.image[3]['#text'],
        likes: 200,
        comments: 150
      }
    }))
}
