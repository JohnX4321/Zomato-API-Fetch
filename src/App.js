import React from 'react';
//import logo from './logo.svg';
import './App.css';
//import collections from './data.json'
import CustomModal from "./CustomModal";

var {Card,Modal,Button}=require('react-bootstrap');




//var Columns=require('react-columns');
var data=null;
var API_KEY='';





export default class App extends React.Component{

    constructor(props) {
        super(props);
        this.handleClick=this.handleClick.bind(this);
        this.state={modalShow: false,coll: [],filtered: [],modalVal: null};
        this.handleChange=this.handleChange.bind(this);
    }




  //fetch(request).then(res=>res.json())
    //  .then(data=>{console.log(data)})
      //.catch(error=>console.log(error));

  //var data=JSON.parse(collections)


    //var data=collections.collections;



    componentWillMount() {
        var request=new Request("https://developers.zomato.com/api/v2.1/collections?city_id=280&count=20",{
            headers: new Headers({
                'Content-type': 'application/json',
                'user-key': API_KEY
            })
        });

        fetch(request).then(res=>res.json())
            .then(resp=>{this.setState({coll: resp.collections,filtered: resp.collections})})
            .catch(error=>console.log(error));
        //data=JSON.parse(data);
        console.log(this.state.coll);
    }

    componentDidMount() {

        console.log(this.state.coll)
    }

    componentWillReceiveProps(nextProps) {
        this.setState({
            filtered: nextProps.items
        });
    }

    handleChange(e) {

        let currrentList=[],newList=[];

        if (e.target.value!=="") {
            currrentList=this.state.coll;
            newList=currrentList.filter(item=> {
                const lc=item.collection.title.toLowerCase();
                const filter=e.target.value.toLowerCase();
                return lc.includes(filter);
            });
        }  else {
            newList=this.state.coll;
        }


        this.setState({
            filtered: newList
        })

    }

    handleClick(e) {
        console.log(e.target.value);
        //return(<CustomModal props={this}/>);

    }




    render() {

        //console.log(data);
        //var data=collections.collections;

        let modalClose=()=>this.setState({modalShow: false})

        return (


            <div className="App">


                <form class="navbar-form" role="search">
                    <div class="form-group">
                        <input type="search" class="form-control"  className="input" onChange={this.handleChange} placeholder="Search" />
                    </div>
                    <button type="submit" class="btn btn-primary">
                        <span class="glyphicon glyphicon-search"></span>
                    </button>
                </form>

                <div className="card-columns">

                    {this.state.filtered.map((item, index) => {

                            console.log(item.collection);

                            return (


                                <Card style={{width: '30rem', height: '28rem'}} key={index}>

                                    <Card.Img variant="top" src={item.collection.image_url}
                                              style={{width: '28rem', height: '16rem'}}/>
                                    <Card.Body>
                                        <Card.Title>{item.collection.title}</Card.Title>
                                        <Card.Text>{item.collection.description}</Card.Text>

                                    </Card.Body>
                                    <Card.Footer>
                                        <button id="btn" className="btn btn-primary" onClick={()=>this.setState({modalShow: true,modalVal: JSON.stringify(item.collection)})} value={index}>More Info</button>
                                    </Card.Footer>

                                </Card>
                            )
                        }
                    )};



                </div>

                <MyVerticallyCenteredModal show={this.state.modalShow} onHide={modalClose} data={this.state.modalVal}/>


            </div>






        );
    }
}

class MyVerticallyCenteredModal extends React.Component {
    constructor(props) {
        super(props);
    }



    render() {

        if (this.props.data != null) {

            let hey = JSON.parse(this.props.data);

            console.log(hey.title);


            return (

                <Modal
                    {...this.props}
                    size="lg"
                    aria-labelledby="contained-modal-title-vcenter"
                    centered
                    aria-hidden="true"
                    tabIndex="-1"
                    data-backdrop="false"
                    data-background="false"
                    animation={false}
                    fade="false"
                    //style={{width: "200px", display: "block",position: "fixed"}}
                    dialogClassName='my-dialog'
                    className='my-dialog'

                >

                    <Modal.Header closeButton>
                        <Modal.Title>{hey.title}</Modal.Title>
                    </Modal.Header>

                    <Modal.Body>
                        <p>{hey.description}</p>
                        <a href={hey.url} >Click here for more detail</a>
                    </Modal.Body>
                    <Modal.Footer>
                        <Button onClick={this.props.onHide}>Close</Button>
                    </Modal.Footer>
                </Modal>
            );
        } else
            return null;
    }
}




