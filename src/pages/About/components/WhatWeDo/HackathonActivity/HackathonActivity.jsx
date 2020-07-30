import React from 'react';
import '../Activity/Activity.scss';
import './HackathonActivity.scss';

const HackathonActivity = (props) => {
  return (
    <div className="about-activity">
      <div className="about-activity-text">
        <h2 className="about-activity-title about-hackathonactivity-title">{props.title}</h2>
        <h2 className="about-hackathonactivity-subtitle">{props.subtitle}</h2>
        <p>{props.description[0]}</p>
        <p>{props.description[1]}</p>
        <p>{props.description[2]}</p>
      </div>

      {/*TODO: Make this a slideshow of hackathon images*/}
      <img className="about-activity-image" src={props.image} alt={props.imageAlt}/>
    </div>
  );
};

export default HackathonActivity;