function About() {
  return (
    <section className="about">
      <h1>About this project</h1>

      <h2>Why we built it</h2>
      <p>
        Finding your way around a new campus is one of the first challenges
        freshers face. This site puts the official campus map online and lets
        you click on any place to see what it is and how to get there.
      </p>

      <h2>How it was built</h2>
      <ul>
        <li>React (function components, props, useState, useEffect)</li>
        <li>React Router for the Home, Map and About pages</li>
        <li>Plain CSS: Flexbox, Grid, CSS variables and media queries</li>
      </ul>
      <p>
        There is no backend or database. All the place information is stored
        in one JavaScript file in the project.
      </p>

      <h2>Team</h2>
      <p>
        Made by Babar Haneef and Syeda Ilha as a course project for
        Web Programming ITL202, NIT Srinagar.
      </p>

      <h2>Map credit</h2>
      <p>
        The campus map was created by Ibrahim Salaria and Samreen Sariya Jabal,
        Department of Civil Engineering, NIT Srinagar.
      </p>
    </section>
  );
}

export default About;
