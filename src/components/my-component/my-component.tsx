import { Component, h, State } from '@stencil/core';

@Component({
  tag: 'my-component',
  styleUrl: 'my-component.css',
  shadow: true,
})
export class MyComponent {

  private DEGREE = '°';
  private CELSIUS = 'C';
  private FAHRENHEIT = 'F';  
  private inputValue: number;

  @State() temperature: number;

  @State() scale: string = this.CELSIUS;

  private handleInput = (event: Event) => {
    this.inputValue = (event.target as HTMLInputElement).valueAsNumber;
  }

  private handleSubmit = (event: Event) => {
    event.preventDefault();
    this.temperature = this.inputValue;
  }

  private celsiusToFahrenheit = (temperature: number) => {
    return (temperature * 9/5) + 32;
  }

  private fahrenheitToCelsius = (temperature: number) => {
    return (temperature - 32) * 5/9;
  }

  private changeScale = () => {
    if (this.scale === this.CELSIUS) {
      this.temperature = this.celsiusToFahrenheit(this.temperature);
      this.scale = this.FAHRENHEIT;
    } else if (this.scale === this.FAHRENHEIT) {
      this.temperature = this.fahrenheitToCelsius(this.temperature);
      this.scale = this.CELSIUS;
    }
  }

  private restart = () => {
    this.temperature = undefined;
  }

  private getInitialFormScreen = () => {
    return (
      <form onSubmit={this.handleSubmit}>
        <p>Choose a temperature (can be negative or positive):</p>
        <input type="number" placeholder="Enter a number" onChange={this.handleInput}/>
        <button>OK</button>
      </form>
    );
  }

  private getTemperatureScreen = () => {
    return (
      <div>
        <p>The temperature you choose is:</p>
        <p>{this.temperature.toFixed(2)} {this.DEGREE}{this.scale}</p>
        <button onClick={this.changeScale}>CHANGE SCALE</button>
        <button onClick={this.restart}>RESTART</button>
      </div>
    );
  }

  render() {
    return (
      <div>
        { 
          this.temperature ?
            this.getTemperatureScreen() :
            this.getInitialFormScreen()
        }
      </div>
    );
  }
}
