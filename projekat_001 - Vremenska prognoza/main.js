const app = Vue.createApp({
    data() {
        return {
            city: "",
            weather: null,
            error: "",
            apiKey: "7c8eeb9c13a89a032328cb3959cf5c43"
        };
    },
    computed()  {   
        return {
            weatherIcon() {
                if (!this.weather) {
                    return "";
                }
                return `http://openweathermap.org/img/wn/${this.weather.weather[0].icon}.png`;
            }
        }
    },
    methods: {
        async fetchWeather() {
            if (this.city === "") {
                this.error = "Molimo unesite grad.";
                return;
            }
            this.error = "";
            this.weather = null;

            try{
                const response = await axios.get(
                    `https://api.openweathermap.org/data/2.5/weather?q=${this.city}&units=metric&lang=sr&appid=${this.apiKey}`
                );
                this.weather = response.data;
            } catch (error) {
                this.error = "Grad nije pronadjen.";
            }
        }
    }
});

app.mount("#app");