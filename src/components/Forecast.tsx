import {
  getHumidityValue,
  getPop,
  getSunTime,
  getVisibilityValue,
  getWindDirection,
} from "../helpers";
import { forecastType } from "../types";
import Sunrise from "./Icons/Sunrise";
import Sunset from "./Icons/Sunset";
import InfoSquare from "./InfoSquare";

type Props = {
  data: forecastType;
  backSearchPage: () => void;
};

const Degree = ({ temp }: { temp: number }): JSX.Element => (
  <span>
    {temp} <sup>o</sup>
  </span>
);

const Forecast = ({ data, backSearchPage }: Props): JSX.Element => {
  const today = data.list[0];

  return (
    <div className="w-full md:max-w-[500px] py-4 md:py-4 md:px-10  lg:px-24 h-full lg:h-auto bg-white bg-opacity-20 backdrop-blur-ls rounded drop-shadow-lg">
      <div className="mx-auto w-[300px] ">
        <section className="text-center">
          <h2 className="text-2xl font-black">
            {data.name}
            <span className="font-thin ml-2">{data.country}</span>
          </h2>
          <h1 className="text-4xl font-extrabold">
            <Degree temp={Math.round(today.main.temp)} />
          </h1>
          <p className="text-sm">
            {today.weather[0].main} {today.weather[0].description}
          </p>
          <p className="text-sm">
            <span className="font-bold">H:</span>{" "}
            <Degree temp={Math.ceil(today.main.temp_max)} />{" "}
            <span className="font-bold">L:</span>{" "}
            <Degree temp={Math.floor(today.main.temp_min)} />
          </p>
        </section>

        <section className="flex overflow-x-scroll mt-4 pb-2 mb-5">
          {data.list.map((item, index) => (
            <div
              className="inline-block text-center w-[50px] flex-shrink-0"
              key={index}>
              <p>{index === 0 ? "Now" : new Date(item.dt * 1000).getHours()}</p>
              <img
                alt={`weather-icon-${item.weather[0].description}`}
                src={`http://openweathermap.org/img/wn/${item.weather[0].icon}@2x.png`}
              />
              <p className="text-sm font-bold">
                <Degree temp={Math.round(item.main.temp)} />
              </p>
            </div>
          ))}
        </section>

        <section className="flex flex-wrap justify-between  text-zinc-700  ">
          <div className="w-[140px] text-xs font-bold flex flex-col items-center bg-white/20 bacdrop-blur-lg rounded drop-shadow-lg py-4 mb-5 ">
            <Sunrise /> <span className="mt-2">{getSunTime(data.sunrise)}</span>
          </div>
          <div className="w-[140px] text-xs font-bold flex flex-col items-center bg-white/20 bacdrop-blur-lg rounded drop-shadow-lg py-4 mb-5 ">
            <Sunset /> <span className="mt-2">{getSunTime(data.sunset)}</span>
          </div>

          <InfoSquare
            icon="wind"
            title="Wind"
            info={`${Math.round(today.wind.speed)} km/h`}
            description={`${getWindDirection(
              Math.round(today.wind.deg)
            )}, gusts 
            ${today.wind.gust.toFixed(1)} km/h`}
          />
          <InfoSquare
            icon="feels"
            title="Feels like"
            info={<Degree temp={Math.round(today.main.feels_like)} />}
            description={`Feels ${
              Math.round(today.main.feels_like) < Math.round(today.main.temp)
                ? "colder"
                : "warmer"
            }`}
          />
          <InfoSquare
            icon="humidity"
            title="Humidity"
            info={`${today.main.humidity} %`}
            description={getHumidityValue(today.main.humidity)}
          />
          <InfoSquare
            icon="pop"
            title="Precipitation"
            info={`${Math.round(today.pop * 100)}%`}
            description={`${getPop(today.pop)}, clouds at ${today.clouds.all}%`}
          />
          <InfoSquare
            icon="pressure"
            title="Pressure"
            info={`${today.main.pressure} hPa`}
            description={` ${
              Math.round(today.main.pressure) < 1013 ? "Lower" : "Higher"
            } than standard`}
          />
          <InfoSquare
            icon="visibility"
            title="Visibility"
            info={`${(today.visibility / 1000).toFixed()} km`}
            description={getVisibilityValue(today.visibility)}
          />
        </section>
        <div className="text-center">
          <button
            className="w-[100px] rounded-md border-2 border-zinc-200 transition-all hover:border-zinc-500 hover:text-zinc-500 text-zinc-700 bg-white/10 backdrop-blur-ls px-2 py-1 cursor-pointer"
            onClick={backSearchPage}>
            Back
          </button>
        </div>
      </div>
    </div>
  );
};

export default Forecast;
