import React, { Component } from 'react';

class Api extends Component {
  constructor(props) {
    super(props);

    this.state = {
       data: [],
       date: "",
       year: "",
       month: "",
       day: "",
    }
  }

  handleSubmit(event) {
   event.preventDefault();

   this.setState({
    date: `${this.state.day}/${this.state.month}/${this.state.year}`,
   });

   const apiUrl = `https://epic.gsfc.nasa.gov/api/natural/date/${this.state.year}-${this.state.month}-${this.state.day}`
    fetch(apiUrl)
    .then(res => res.json())
    .then(
     (result) => {
     this.setState({
         isLoaded: true,
         data: result
       })
     }
   ),
   (error) => {
     this.setState({
       isLoaded: true,
       error
     });
   }

 }

 updateYear(event) {
    this.setState({
      year: event.target.value
    })
  }

  updateDay(event) {
   this.setState({
     day: event.target.value
   })
 }

 updateMonth(event) {
    this.setState({
      month: event.target.value
    })
  }

  reset() {
    this.setState({
      date: "",
      year: "",
      month: "",
      day: "",
    })
  }

   getImg() {
    const theDate = this.state.date;
    let theDay = theDate.substring(0, 2);
    let theMonth = theDate.substring(3,5);
    let theYear = theDate.substring(6,10);

    if (this.state.date) {
      const firstInstance = this.state.data.map((item) => {
        return item.image;
      })
      const firstImg = firstInstance[0];
      const theImg = `https://epic.gsfc.nasa.gov/archive/natural/${theYear}/${theMonth}/${theDay}/png/${firstImg}.png`

        return (
          <div>
            <h2>Happy Earthday! {this.state.date}</h2>
            <img src={theImg} alt="NASA image"></img>
          </div>
        )
    }
  }

  render() {
     return (
       <div className="card-layout">
          <h1>Enter Birthdate</h1>
          <form className="input-form" onSubmit={this.handleSubmit.bind(this)}>
            <label className="input-label">
               Day (Format: DD)
               <input type="text" value={this.state.day} onChange={this.updateDay.bind(this)} name="day" />
            </label>
             <label className="input-label">
              Month (Format: MM)
              <input type="text" value={this.state.month} onChange={this.updateMonth.bind(this)}
                name="month" />
            </label>
             <label className="input-label">
               Year (Format: YYYY)
               <input type="text" value={this.state.year} onChange={this.updateYear.bind(this)} name="year"/>
            </label>
            <input className="submit-btn" type="submit" value="Submit"/>
          </form>
          <button className="reset-btn" onClick={this.reset.bind(this)}>Reset</button>
          <div className="card">
            {this.getImg()}
          </div>
       </div>
     )
   }
}

export default Api;
