
const apiKey = 'L3vkAHR1RZx6ycMWbsGzNucWccOq-ssQ3f7WVQKH9ng';
// let apiUrl = `https://api.unsplash.com/photos/random?client_id=${apiKey}&count=${count}`

fetch(`https://apis.scrimba.com/unsplash/photos/random?client_id=${apiKey}&orientation=landscape&query=nature`)
    .then(res => res.json())
    .then(data => {
        document.body.style.backgroundImage = `url(${data.urls.full})`
		document.getElementById("author").textContent = `${data.user.name}`
        return console.log(data)
    })
    .catch(err => {
        document.body.style.backgroundImage = `url(https://images.unsplash.com/photo-1588392382834-a891154bca4d?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1955&q=80
)`
		document.getElementById("author").textContent = `Kunal Shinde`
    })

fetch("https://api.coingecko.com/api/v3/coins/bitcoin")
    .then(res => {
        if (!res.ok) {
            throw Error("Something went wrong")
        }
        return res.json()
    })
    .then(data => {
        document.getElementById("crypto-top").innerHTML = `
            <img src=${data.image.small} />
            <span>${data.name}</span>
        `
        document.getElementById("crypto").innerHTML += `
            <p>〰 $${data.market_data.current_price.usd}</p>
            <p>⬆ $${data.market_data.high_24h.usd}</p>
            <p>⬇ $${data.market_data.low_24h.usd}</p>
        `
    })
    .catch(err => console.error(err))

function getCurrentTime() {
    const date = new Date()
    document.getElementById("time").textContent = date.toLocaleTimeString("en-us", {timeStyle: "short"})
}

setInterval(getCurrentTime, 1000)

const weather = document.getElementById('weather')

navigator.geolocation.getCurrentPosition(position => {
   fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${position.coords.latitude}&lon=${position.coords.longitude}&units=metric&appid=53b94744e13527b6fbb58163d327b44f`)
        .then(res => {
            if (!res.ok) {
                throw Error("Weather data not available")
            }
            return res.json()
        })
        .then(data => {
            const iconData = data.weather[0].icon
            const iconUrl = `http://openweathermap.org/img/wn/${iconData}@2x.png`
            const temp = Math.round(data.main.temp)
            const location = data.name
            weather.innerHTML = `
                <img src=${iconUrl} />
                <p class="weather-temp">${temp}°</p>
                <p class="weather-city">${location}</p>
            `
        })
        .catch(err => console.error(err))
});
