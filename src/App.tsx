import Forecast from "./components/Forecast";
import Search from "./components/Search";
import useForecast from "./hooks/useForecast";

const App = (): JSX.Element /* ne dönceği */ => {
  const {
    term,
    options,
    forecast,
    handleChange,
    handleSubmit,
    handleOptionButton,
  } = useForecast();

  return (
    <div className="flex justify-center items-center bg-gradient-to-br from-sky-500  to-gray-300  sm:h-[100vh] h-screen  w-full">
      {forecast ? (
        <Forecast data={forecast} />
      ) : (
        <Search
          term={term}
          options={options}
          handleChange={handleChange}
          handleOptionButton={handleOptionButton}
          handleSubmit={handleSubmit}
        />
      )}
    </div>
  );
};

export default App;
