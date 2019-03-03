import React, { Component } from 'react';
import './App.css';
import posed, { PoseGroup } from 'react-pose';
import ReactDOM from "react-dom";
import shuffle from './shuffle';

const Box = posed.div({
  hidden: { opacity: 0 },
  visible: { opacity: 1 }
});

const Circle = posed.div({
  pressable: true,
  hoverable: true,
  init: { scale: 1 },
  press: { scale: 0.6 },
  hover: { scale: 1.2 },
  hidden: { opacity: 0 , transition: { duration: 1000 } },
  visible: { opacity: 0.8, transition: { duration: 2000 } }
});

const Item = posed.li({
  // You can make a custom transition for the flip-powered
  // shuffling animation by overriding `flip`. You can even
  // add other properties to animate while the flip animation
  // is in progress. Uncomment the following code to try it out!
  // flip: {
  //   scale: 1,
  //   transition: {
  //     scale: {
  //       type: 'spring',
  //       velocity: 10
  //     },
  //     default: {
  //       type: 'spring'
  //     }
  //   }
  // }
  hidden: { opacity: 0 , transition: { duration: 1000 } },
  visible: { opacity: 0.8, transition: { duration: 2000 } },
  pressable: true,
  hoverable: true,
  init: { scale: 1 },
  press: { scale: 0.6 },
  hover: { scale: 1.1 },
});

class App extends Component {

  constructor(props, context) {
    super(props, context)
    this.state = { 
      isVisibleDots: true, 
      isVisibleCircle: false,
      isVisibleShuffle: false,
      items: [{id:1,pref:"",val:"a"}, {id:2,pref:"",val:"b"}, {id:3,pref:"",val:"c"}, 
              {id:4,pref:"",val:"d"}, {id:5,pref:"",val:"e"}, {id:6,pref:"",val:"f"}, 
              {id:7,pref:"",val:"g"}, {id:8,pref:"",val:"k"}]
    };
    this.pressEnd = this.pressEnd.bind(this)
  }

  componentDidMount() {
    this.boxesInterval = setInterval(() => {
      this.setState({ isVisibleDots: !this.state.isVisibleDots });
    }, 500);

    setTimeout(()=> {
      const node = ReactDOM.findDOMNode(this);
      node.querySelector('.boxesContainer').style.display = "none"
      clearInterval(this.boxesInterval)
      this.setState({isVisibleCircle: true})
    }, 3000)
  }

  pressEnd(){
    this.setState({isVisibleCircle:false, isVisibleShuffle:true});
    setTimeout(()=> {
      this.shuffleInterval = setInterval(() => {
        this.setState({
          items: shuffle(this.state.items)
        });
      }, 200);
    }, 2000)
    
    setTimeout(()=> {
      clearInterval(this.shuffleInterval)
      ReactDOM.findDOMNode(this).querySelector('.circle').style.display = "none"
      this.setState({
        items: shuffle(this.state.items)
      });
      this.setState(state => {
        const list = state.items.map((item, j) => {
            item.val = "?"
            return item;
        });
        return {
          list,
        };
      });
    }, 5000)
  }
  
  presonClickShuffledItemsEnd(){
      this.setState(state => {
        const list = state.items.map((item, j) => {
            item.val = "?"
            return item;
        });
        return {
          list,
        };
      });
  }

  render() {
    const { isVisibleDots } = this.state;
    const {isVisibleCircle} = this.state;
    const {isVisibleShuffle} = this.state;
    const { items } = this.state;

    return (
      <div className="App">
        <div className="App-header">
          {/* <img src={logo} className="App-logo" alt="logo" /> */}
        </div>
        <div className="boxesContainer">
          <Box className="box" pose={isVisibleDots ? 'visible' : 'hidden'} />
          <Box className="box" pose={isVisibleDots ? 'visible' : 'hidden'} />
          <Box className="box" pose={isVisibleDots ? 'visible' : 'hidden'} />
        </div>
          <Circle className="circle" 
          onPressEnd={this.pressEnd} 
          pose={isVisibleCircle ? 'visible' : 'hidden'}> Start </Circle>
        <ul className="ul-shuffle">
          <PoseGroup pose={isVisibleShuffle ? 'visible' : 'hidden'}>
          {items.map(item => <Item key={item.id} onClick={this.onClickShuffledItem} >{item.val}</Item>)}
          </PoseGroup>
        </ul>
      </div>
    );
  }
}

export default App;
