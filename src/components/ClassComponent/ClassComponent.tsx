import React from 'react';

class ClassComponent extends React.Component<{ name: string }> {
  
  constructor(props: any) {
    super(props);
    console.log('Constructor reached');
  }
  
  state = {
    name: 'Mundo'
  }

  componentDidMount() {
    console.log('Component did mount reached');
  }

  componentDidUpdate() {
    console.log('Component did update reached');
  }

  render() {
    console.log('Render reached');

    return <div>
      <p>Name: { this.state.name }</p>
      <button onClick={
        () => {
          this.setState( { name: 'Daniel' } );
        }
      } >Click me</button>
    </div>
  }
}

export default ClassComponent;