import React from 'react';
import './App.css';
import axios from 'axios';
import logo from './unnamed.png';

class App extends React.Component {
  state = {
    restaurants: [],
    isLoading: true,
    latitude: 40.785091,
    longitude: -73.968285,
    errors: null
  };

  getRestaurants = (pos) => {
    this.setState({
      latitude:pos.coords.latitude,
      longitude:pos.coords.longitude
    })
    const config = { headers: {'user-key': '3164a19f6313abdd49c775da52d65d9c'} }; 
    axios
    .get('https://developers.zomato.com/api/v2.1/search?count=20&lat='+this.state.latitude+'&lon='+this.state.longitude+'&radius=2000&sort=rating&order=desc',config)
    .then(response => {
      this.setState({
        restaurants: response.data.restaurants,
        isLoading: false
      });
    })
    .catch(error => this.setState({error,isLoading: false}));
  }

  submit(){
    if("geolocation" in navigator) {
      navigator.geolocation.getCurrentPosition(this.getRestaurants);
    }
  }

  componentDidMount() {
    this.submit();
  }



  render() {
    return (
      <React.Fragment>
       <div className="App"> 
        <img src={logo} className="appLogo"/>
        <p className="Bar"> </p> 
        <h1 className="Titulo">Lunch Picker</h1>
        </div>
       
        <div >{(() => {
          if (this.state.isLoading) {
           return (
            <div className="Error">
              <h2>Can't Fetch your Location</h2>
            </div>
           )
          }
          else{
            return ((this.state.restaurants || []).map(item => (
              <div key={item.restaurant.R.res_id}>
                <div className="ListElements">
                    <img src={item.restaurant.thumb} alt={item.restaurant.name}/>
                  <div className="Data">
                    <p className="Name">{item.restaurant.name}</p>
                    <div className="items">
                      <p className="subt">Address:</p> 
                      <p>&nbsp;{item.restaurant.location.address}</p>
                    </div>
                    <div className="items">
                      <p className="subt">Type of Cuisine: </p> 
                      <p>&nbsp;{item.restaurant.cuisines}</p>
                    </div>
                    <div className="items">
                      <p className="subt">Average Cost For Two:: </p>
                      <p>&nbsp;{item.restaurant.average_cost_for_two}{item.restaurant.currency}</p>
                    </div>
                    <div className="items">
                      <p className="subt">Rating: </p>
                      <p>&nbsp;{item.restaurant.user_rating.aggregate_rating}</p>  
                    </div>
                  </div>
                </div>
              </div>
            )))
          }
        })()}
        </div>
      </React.Fragment>
    );
  }
}



export default App;

