import './App.css';

export default function App() {

  // a variable represnting the JSON data that would track visitors to the site each week. There is an ID field to track each user, an IP field that could be used to identify visitors who came to the site in seperate sessions, and then a visits field that contains a list of individual visits, each of which has an associated date and a list of buttons clicked during that visit. By tracking the buttons clicked, we are similuting a way in which we could track how far along the sign-up process the vistor travelled.
  var user = [
    {
      "ID": "011",
      "IP": "000.000.0.00",
      "visits": [
        {
          "date": "07-14-2022",
          "clicked": ["btn1", "btn2"]
        },
        {
          "date": "07-16-2022",
          "clicked": ["btn1", "btn2", "btn3"]
        }
      ]
    },
    {
      "ID": "022",
      "IP": "111.111.1.11",
      "visits": [
        {
          "date": "07-10-2022",
          "clicked": []
        },
        {
          "date": "07-13-2022",
          "clicked": ["btn1"]
        },
        {
          "date": "07-16-2022",
          "clicked": ["btn1", "btn2", "btn3"]
        },
      ]
    },
    {
      "ID": "033",
      "IP": "222.222.2.22",
      "visits": [
        {
          "date": "07-16-2022",
          "clicked": ["btn1"]
        }
      ]
    },
    {
      "ID": "044",
      "IP": "333.333.3.33",
      "visits": [
        {
          "date": "07-16-2022",
          "clicked": ["btn1", "btn2"]
        }
      ]
    },
    {
      "ID": "055",
      "IP": "444.444.4.44",
      "visits": [
        {
          "date": "07-16-2022",
          "clicked": ["btn1", "btn2", "btn3"]
        }
      ]
    },
    {
      "ID": "066",
      "IP": "555.555.5.55",
      "visits": [
        {
          "date": "07-15-2022",
          "clicked": ["btn1"]
        }
      ]
    },
    {
      "ID": "077",
      "IP": "777.777.7.77",
      "visits": [
        {
          "date": "07-15-2022",
          "clicked": [""]
        }
      ]
    }
  ];

  // This function is to report values associated with the amount of click-throughs that occurred
  function clickThrough(user) {
    var data = {};
    var visitTracker = 0;
    var clickThruTracker = 0;
    var visitorClickThru = [];

    // Loop through the entirety of our list of visitors for the given week
    for (var i = 0; i < user.length; i++) {

      for (var j = 0; j < user[i].visits.length; j++) {
        // First, take the opportunity to track total number of visits
        visitTracker++;
        // Next we want to track the number of click-throughs and the associated visitor ID. By reaching "btn2" but not "btn3", we are simulating visitors beginning the sign-up process, but not completing it
        if (user[i].visits[j].clicked.includes("btn2") && !(user[i].visits[j].clicked.includes("btn3"))) {
          visitorClickThru.push(user[i].ID);
          clickThruTracker++;
        }
      }
    }

    let clickThruList = visitorClickThru.join(', ');

    data.visits = visitTracker;
    data.clickThrus = clickThruTracker;
    data.visitors = clickThruList;

    return data;
  }

  // This function will track the number of conversions
  function conversion(user) {
    var data = {};
    var conversionTracker = 0;
    var convertedVisitors = [];

    // Loop through each visitor
    for (var i = 0; i < user.length; i++) {
      // Track the conversions and associated IDs
      for (var j = 0; j < user[i].visits.length; j++) {
        if (user[i].visits[j].clicked.includes("btn3")) {
          conversionTracker++;
          convertedVisitors.push(user[i].ID);
        }
      }
    }

    let convertedList = convertedVisitors.join(', ');

    data.conversions = conversionTracker;
    data.convertedVisitors = convertedList;

    return data;
  }

  var clickthru = clickThrough(user);
  var conversion = conversion(user);
  var clickThruPercent = (clickthru.clickThrus / (user.length - conversion.conversions) * 100).toFixed(1);
  var conversionPercent = (conversion.conversions / (user.length) * 100).toFixed(1);

  return (
    <>
      <div style={{ height: "20px" }}>
        <p>Unique visitors:  {user.length}</p>
      </div>
      <div style={{ height: "20px" }}>
        <p>Total visits: {clickthru.visits}</p>
      </div>
      <div style={{ height: "20px" }}>
        <p>Total click-throughs: {clickthru.clickThrus}</p>
      </div>
      <div style={{ height: "20px" }}>
        <p>Percent click-through (without conversion): {clickThruPercent}%</p>
      </div>
      <div style={{ height: "20px" }}>
        <p>Click-through user IDs: {clickthru.visitors}</p>
      </div>
      <div style={{ height: "20px" }}>
        <p>Total conversions: {conversion.conversions}</p>
      </div>
      <div style={{ height: "20px" }}>
        <p>Percent full conversion: {conversionPercent}%</p>
      </div>
      <div style={{ height: "20px" }}>
        <p>Converted user IDs: {conversion.convertedVisitors}</p>
      </div>
    </>
  )
}
