const URL = "https://api.messengerbot.si";
const URL_TEMP = "http://localhost:7800";
var data = QUIZ_QUESTIONS
var urlParams = new URLSearchParams(window.location.search);

var loaded = false;
function closeWebview(){
  if(loaded){

    MessengerExtensions.requestCloseBrowser(function success() {
          console.log("Window will be closed!");
        }, function error(err) {
          console.log(err);
        });
  }else{
    alert("Webview can be viewed only on mobile devices on messenger app 113+. Please use it on mobile device and/or update your messenger app");
  }
}

class Greeting extends React.Component {
  constructor(props) {
    super(props);
    this.count = 0;
    this.state = {
      question : data[this.count].question, 
      top_pic : data[this.count].top_pic,
      bottom_pic : data[this.count].bottom_pic
    }
  }

  sendData(data){
    axios.post( URL + '/kzs/quiz-broadcast?userId=' + urlParams.get('userId'), data)
    .then(function (response) {
      console.log(response.data);
    })
    .catch(function (error) {
      console.log(error);
    });
  }

  handleClick(anwser) {
    data[this.count].anwser = anwser;
    if(this.count+1 !== data.length){
      this.count += 1;
      this.setState({
        question : data[this.count].question, 
        top_pic : data[this.count].top_pic,
        bottom_pic : data[this.count].bottom_pic
      })
    }else{
      this.sendData(data);
      closeWebview();
    }
  }

  render() {
    return (
      <div>
        {this.state.question}<br/>
        <image onClick={() => this.handleClick("top")} src={this.state.top_pic} /><br/>

        <image onClick={() => this.handleClick("bottom")} src={this.state.bottom_pic} /><br/>
      
      </div>
    );
  }
}

ReactDOM.render(
  <Greeting />,
  document.getElementById('app')
);

window.extAsyncInit = function() {
  console.log("Messenger extensions are ready!");
  loaded = true;
  MessengerExtensions.getSupportedFeatures(function success(result) {
    let features = result.supported_features;
    console.log(features);
    if(features.includes("context")){
      loaded = true;
    }
    }, function error(err) {
      console.log(err);
  });
};

