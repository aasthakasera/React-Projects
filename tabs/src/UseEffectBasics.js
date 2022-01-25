import React, { useState, useEffect } from "react";
import ButtonContainer from './ButtonContainer.js'
import JobInfo from './JobInfo.js'

const url = "https://course-api.com/react-tabs-project";
//const url = "https://course";

function UseEffectBasics() {
  const [loading, setLoading] = useState(true);
  const [jobs, setJobs] = useState([]);
  const [id, setId] = useState(0);

  // const fetchJobs = () => {
  // .then(response => response.json())
  // .then(user => fetch(url))
  // .then(response => response.json())

  // }

  const fetchJobs = async() => {
    const response = fetch(url);
      console.log(response);
      const newJobs = await response;
      console.log("newJob : ", newJobs.json());
      setJobs(newJobs);
         setLoading(false);
    // try {
    //   const response = await fetch(url);
    //   console.log(response);
    //   const response2 = fetch(url);
    //   console.log(response2);
    
   
    // } catch (err){
    //   if (err instanceof TypeError) {
    //     alert( "JSON Error: " + err.message );
    //   } else {
    //     throw err; // rethrow (*)
    //   }
      // alert( "Our apologies, the data has errors or url is broken, we'll try to request it one more time." );
      // alert( err.name );
      // alert( err.message );
   // }
    //catch
  };
  //

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
