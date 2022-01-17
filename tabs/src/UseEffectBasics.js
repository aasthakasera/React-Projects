import React, { useState, useEffect } from "react";
import ButtonContainer from './ButtonContainer.js'
import JobInfo from './JobInfo.js'

const url = "https://course-api.com/react-tabs-project";

function UseEffectBasics() {
  const [loading, setLoading] = useState(true);
  const [jobs, setJobs] = useState([]);
  const [id, setId] = useState(0);

  const fetchJobs = async () => {
    const reponse = await fetch(url);
    const newJobs = await reponse.json();
    setJobs(newJobs);
    setLoading(false);
  };

  useEffect(() => {
    fetchJobs();
  }, []);

  if (loading) {
    return (
      <section className="section loading">
        <h1>Loading...</h1>
      </section>
    );
  }

  const changeValue = (index) => {
    setId(index);
  }

  const { company, dates, duties, title } = jobs[id];
  return (
    <section className="section">
      <div className="title">
        <h3>Experience</h3>
        <div className="underline"></div>
      </div>

      <div className="jobs-center">
          <ButtonContainer 
            jobs={jobs}
            value={id}
            action={changeValue}
          />

          <JobInfo
            title={title}
            company={company}
            duties={duties}
            dates={dates}
          />
      </div>
    </section>
  );
}

export default UseEffectBasics;
