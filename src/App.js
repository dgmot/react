import React, { Component } from 'react';
import './App.css';
import posed, { PoseGroup } from 'react-pose';
import ReactDOM from "react-dom";
import shuffle from './shuffle';

const Box = posed.div({
  hidden: { opacity: 0 },
  visible: { opacity: 1 }
});

const StartBtn = posed.div({
  pressable: true,
  hoverable: true,
  init: { scale: 1 },
  press: { scale: 0.6 },
  hover: { scale: 1.2 },
  hidden: { opacity: 0 , transition: { duration: 1000 } },
  visible: { opacity: 0.8, transition: { duration: 2000 } }
});

const NextLevelBtn = posed.div({
  pressable: true,
  hoverable: true,
  init: { scale: 1 },
  press: { scale: 0.6 },
  hover: { scale: 1.2 },
  hidden: { opacity: 0 , transition: { duration: 1000 } },
  visible: { 
    opacity: 0.7,
    transition: { duration: 2000}
  },
});


const Item = posed.li({
  hidden: { opacity: 0 , transition: { duration: 1000 } },
  visible: { opacity: 0.8, transition: { duration: 5000 } },
  pressable: true,
  hoverable: true,
  init: { scale: 1 },
  press: { scale: 0.6 },
  hover: { scale: 1.1 },
});

const initialShuffleState = [
  {id:1,display:"x",val:"x"}, {id:2,display:"",val:""}, 
  {id:3,display:"",val:""}, {id:4,display:"",val:""},
  {id:5,display:"",val:""}, {id:6,display:"",val:""} 
]

class App extends Component {

  constructor(props, context) {
    super(props, context)
    this.state = { 
      isVisibleDots: true, 
      isVisibleStartBtn: false,
      isVisibleShuffle: false,
      items: initialShuffleState,
      points: 6,
      totalScore: 0,
      playing: false,
      isVisibleNextLevelBtn: false,
      level: 1
    };
    this.onClickStartBtn = this.onClickStartBtn.bind(this)
    this.onClickShuffledItem = this.onClickShuffledItem.bind(this)
    this.onClickNextLevelBtn = this.onClickNextLevelBtn.bind(this)
  }

  componentDidMount() {
    this.boxesInterval = setInterval(() => {
      this.setState({ isVisibleDots: !this.state.isVisibleDots });
    }, 500);
    // ReactDOM.findDOMNode(this).querySelector('.nextLevelBtn').style.display = "flex"
    this.setState({isVisibleNextLevelBtn: true})
    setTimeout(()=> {
      const node = ReactDOM.findDOMNode(this);
      node.querySelector('.boxesContainer').style.display = "none"
      node.querySelector('.startBtn').style.display = "flex"
      clearInterval(this.boxesInterval)
      this.setState({isVisibleStartBtn: true})
    }, 3000)
  }

  prepCards(btnQuerySelector){
    console.log()
    this.setState(state => {
      const list = state.items.map((item, j) => {
          if (j === 0){
            item.display = "x"
            item.val = "x"
          }
          else{
            item.display = ""
            item.val = ""
          }
          return item;
      });
      return {
        list
      };
    });
    // console.log(this.state.items)
    let speed = 600;
    setTimeout(()=> {
      this.setState(state => {
        if(state.level === 2){
          speed = 170;
          state.points = 12
        }
        else if (state.level === 3){
          speed = 100;
          state.points = 18
        }
        const list = state.items.map((item, j) => {
            item.display = "?"
            return item;
        });
        return {
          list
        };
      });
    }, 3000)

    setTimeout(()=> {
      this.shuffleInterval = setInterval(() => {
        this.setState(state => {
          const items = shuffle(state.items)
          return{
            items
          }
        });
      }, speed);
    }, 5000)

    setTimeout(()=> {
      clearInterval(this.shuffleInterval)
      this.setState({playing: true})
      ReactDOM.findDOMNode(this).querySelector(btnQuerySelector).style.display = "none"
    }, 7000)
  }

  onClickStartBtn(){
    this.setState({isVisibleStartBtn:false, isVisibleShuffle:true});
    ReactDOM.findDOMNode(this).querySelector(".ul-shuffle").style.display = "flex"
    const btnQuerySelector = '.startBtn'
    this.prepCards(btnQuerySelector);
  }

  onClickNextLevelBtn(){
    this.setState(prevState => {
      return {
        isVisibleNextLevelBtn:false,
        level: prevState.level + 1
      }
    });
    // console.log(this.state.items)
    ReactDOM.findDOMNode(this).querySelector('.score').style.display = "none"
    const btnQuerySelector = '.nextLevelBtn'
    this.prepCards(btnQuerySelector);
  }
  
  onClickShuffledItem(clickedItemId, event){
    this.setState(state => {
      console.log("level: " + state.level)
      if (state.playing){
        const list = state.items.map((item) => {
            if(item.id === clickedItemId){
              item.display = item.val
              if (item.val === ""){
                if (state.points > 1){
                  if (state.level === 1){
                    state.points = state.points - 1;
                  }
                  else if (state.level === 2){
                    state.points = state.points - 2;
                  }
                  else if (state.level === 3){
                    state.points = state.points - 3;
                  }
                }
              }
              else{
                state.playing = false
                ReactDOM.findDOMNode(this).querySelector('.score').style.display = "flex"
                state.totalScore = state.totalScore + state.points
                if(state.level < 3){
                  ReactDOM.findDOMNode(this).querySelector('.nextLevelBtn').style.display = "flex"
                  state.isVisibleNextLevelBtn = true
                }
                else if(state.level === 3){
                  ReactDOM.findDOMNode(this).querySelector('.score').style.display = "none"
                  ReactDOM.findDOMNode(this).querySelector('.totalScore').style.display = "flex"
                }console.log(state.totalScore + " :" + state.points)
              }
            }
            return item;
        });
        return {
          list,
        };
      }
    });
    
  }

  render() {
    const {isVisibleDots} = this.state;
    const {isVisibleStartBtn} = this.state;
    const {isVisibleShuffle} = this.state;
    const {items} = this.state;
    const {points} = this.state;
    const {isVisibleNextLevelBtn} = this.state;
    const {level} = this.state;
    const {totalScore} = this.state;


    return (
      <div className="App">
        <div className="boxesContainer">
          <Box className="box" pose={isVisibleDots ? 'visible' : 'hidden'} />
          <Box className="box" pose={isVisibleDots ? 'visible' : 'hidden'} />
          <Box className="box" pose={isVisibleDots ? 'visible' : 'hidden'} />
        </div>
        <StartBtn className="startBtn" 
          onPressEnd={this.onClickStartBtn} 
          pose={isVisibleStartBtn ? 'visible' : 'hidden'}> Start 
        </StartBtn>
        <ul className="ul-shuffle">
          <PoseGroup pose={isVisibleShuffle ? 'visible' : 'hidden'}>
          {items.map(item => 
            <Item key={item.id} onPressEnd={this.onClickShuffledItem.bind(this, item.id)}>
              {item.display}
            </Item>
            )
          }
          </PoseGroup>
        </ul>
        {/* <div className="score">Score: {(points/(6*level) * 100).toFixed(2)}% </div> */}
        <div className="score">Score: {points}/{6*level} </div>
        <NextLevelBtn className="nextLevelBtn" 
          onPressEnd={this.onClickNextLevelBtn} 
          pose={isVisibleNextLevelBtn ? 'visible' : 'hidden'}> Next Level 
        </NextLevelBtn>
        <div className="totalScore">Total Score: {(totalScore/36 * 100).toFixed(2)}% </div>
      </div>
    );
  }
}

export default App;
