import React from 'react';
import './App.css';
import axios from 'axios';


class App extends React.Component {
  state = {
    restaurants: [],
    isLoading: true,
    errors: null
  };

  getRestaurants(){
    const config = { headers: {'user-key': '3164a19f6313abdd49c775da52d65d9c'} }; 
    axios
    .get('https://developers.zomato.com/api/v2.1/search?count=1&lat=40.785091&lon=-73.968285&radius=2000&cuisines=25&sort=rating&order=desc',config)
    .then(response =>
      response.data.results.map(restaurant => ({
        id: `${restaurant.id}`,
        name: `${restaurant.name}`,
        address: `${restaurant.location.address}`,
        locality_verbose: `${restaurant.location.locality_verbose}`,
        average_cost: `${restaurant.average_cost_for_two}`,
        pic: `${restaurant.featured_image}`,
        aggregate_rating: `${restaurant.user_rating.aggregate_rating}`,
        cuisines: `${restaurant.cuisines}`,
        phone_number: `${restaurant.phone_numbers}`
      }))
    )
    .then(restaurants => {
      this.setState({
        restaurants,
        isLoading: false
      });
    })
    .catch(error => this.setState({error,isLoading: false}));
  }

  componentDidMount() {
    this.getRestaurants();
  }
  
  render() {
    const {restaurants,isLoading} = this.state;
    return (
      <React.Fragment>
       <div>
        {!isLoading ? (
          restaurants.map(restaurant => {
            const { id,name, address, locality, average_cost,pic,aggregate_rating,cuisines,phone_number } = restaurant;
            return (
              <div key={id}>
                <p>{name}</p>
                <div>
                  <img src={pic} alt={name} />
                </div>
                <p>{address}</p>
                <p>{locality}</p>
                <p>{average_cost}</p>
                <p>{aggregate_rating}</p>
                <p>{cuisines}</p>
                <p>{phone_number}</p>
                <hr />

              </div>
            );
          })
        ) : (
          <p>Loading...</p>
        )}
      </div>
      </React.Fragment>
    );
  }
}



export default App;

