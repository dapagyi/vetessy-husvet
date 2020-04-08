import React, { Component } from 'react';
import { borderUrl } from './BorderHelper';

// const randomTestElement = (v: string[]): string => {
//   return v[Math.floor(Math.random() * v.length)];
// };

// const testTitles = [
//   'Tojásleves gazdagon',
//   'Zöldségleves',
//   'Tárkonyos raguleves',
//   'Lencsefőzelék',
//   'Chilis bab',
//   'Palacsinta',
//   'Paradicsomleves',
//   'Paprikás krumpli',
//   'Bolognai spagetti',
//   'Gyümölcsleves',
//   'Tejbegríz',
//   'Brassói',
// ];
// const testColors = ['#72bf44', '#5c3896', '#f39200', '#0075bf', '#da0812', '#5b2919', '#009a93'];

export class Border extends Component<{ backgroundColor: string }> {
  render(): JSX.Element {
    return (
      <div className="App">
        <div
          style={{
            backgroundImage: `url(${borderUrl(this.props.backgroundColor)})`,
            width: 'fit-content',
            backgroundSize: 'contain',
            backgroundRepeat: 'no-repeat',
            // margin: '20px',
            margin: 'auto',
          }}
        >
          {this.props.children}
        </div>
      </div>
    );
  }
}

export class HeaderBorder extends Component<{ text: string; backgroundColor: string; fontSize: number }> {
  render(): JSX.Element {
    return (
      <Border backgroundColor={this.props.backgroundColor}>
        <p
          style={{
            margin: '0 20px 0 20px',
            padding: '10px 0 15px 0',
            color: 'white',
            fontFamily: 'Patrick Hand',
            fontSize: `${this.props.fontSize}px`,
          }}
        >
          {this.props.text}
        </p>
      </Border>
    );
  }
}
