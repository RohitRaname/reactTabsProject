import { useEffect, useState } from "react";

const url = "https://course-api.com/react-tabs-project";

const App = () => {
  const [isError, setIsError] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [allData, setAllData] = useState([]);
  const [curData, setCurData] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        let tabsData = await fetch("https://course-api.com/react-tabs-project");
        tabsData = await tabsData.json();

        console.log("tabsData", tabsData);

        setAllData(() => tabsData);
        setCurData(() => tabsData[0]);
      } catch (err) {
        console.log(err);
        setIsError(true);
      }
      setIsLoading(false);
    };

    fetchData();
  }, []);

  const changeTab = (id) => {
    setCurData(allData.find((data) => data.id === id));
  };

  const { company, dates, duties, id, title } = curData;
  const tabs = allData.map((data) => ({
    id: data.id,
    company: data.company,
  }));

  if (isLoading) return <div className="loading"></div>;

  if (isError) return <div className="alert alert-danger">Failed to Load</div>;

  return (
    <>
      <main>
        <div className="jobs-center section-center">
          <div className="btn-container">
            {tabs.map((tab) => {
              const isCurTab = id === tab.id;

              return (
                <button
                  key={tab.id}
                  className={`tab job-btn ${isCurTab && "active-btn"}`}
                  onClick={() => changeTab(tab.id)}
                >
                  {tab.company}
                </button>
              );
            })}
          </div>

          <div className="job-info">
            <h2>{title}</h2>
            <p className="job-company">{company}</p>
            <p className="job-date">{dates}</p>
            <ul className="window-duties">
              {duties.map((duty) => (
                <li className="job-desc">
                  <svg
                    stroke="currentColor"
                    fill="currentColor"
                    stroke-width="0"
                    viewBox="0 0 448 512"
                    className="job-icon"
                    height="1em"
                    width="1em"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path d="M224.3 273l-136 136c-9.4 9.4-24.6 9.4-33.9 0l-22.6-22.6c-9.4-9.4-9.4-24.6 0-33.9l96.4-96.4-96.4-96.4c-9.4-9.4-9.4-24.6 0-33.9L54.3 103c9.4-9.4 24.6-9.4 33.9 0l136 136c9.5 9.4 9.5 24.6.1 34zm192-34l-136-136c-9.4-9.4-24.6-9.4-33.9 0l-22.6 22.6c-9.4 9.4-9.4 24.6 0 33.9l96.4 96.4-96.4 96.4c-9.4 9.4-9.4 24.6 0 33.9l22.6 22.6c9.4 9.4 24.6 9.4 33.9 0l136-136c9.4-9.2 9.4-24.4 0-33.8z"></path>
                  </svg>
                  <p>{duty}</p>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </main>
    </>
  );
};
export default App;
