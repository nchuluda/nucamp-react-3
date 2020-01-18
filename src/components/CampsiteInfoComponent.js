import React, { Component } from 'react';
import { Card, CardImg, CardImgOverlay, CardText, CardBody, CardTitle, Breadcrumb, BreadcrumbItem, Button, Modal, ModalHeader, ModalBody, ModalFooter, Col, Row, Label } from 'reactstrap';
import { Link } from 'react-router-dom';
import { Control, LocalForm } from 'react-redux-form';



function RenderCampsite({campsite}) {
        return(
            <div className="col-md-5 m-1">
                <Card>
                    <CardImg top src={campsite.image} alt={campsite.name} />
                    <CardBody>
                    
                    <CardText>{campsite.description}</CardText>
                    </CardBody>
                </Card>
            </div>        
        );
    }

function RenderComments({comments}) {
        if (comments) {
            return(
                    <div className="col-md-5 m-1">
                        <div className="row">
                        <h4>Comments</h4>
                        </div>
                        <div className="row">
                        {comments.map(comment => {
                            return(
                                <div key={comment.id}>
                                    <p>{comment.text}<br />{comment.author}, {new Intl.DateTimeFormat('en-US', { year: 'numeric', month: 'short', day: '2-digit'}).format(new Date(Date.parse(comment.date)))}</p>
                                    
                                </div>
                            );
                        })}
                        </div>
                        <div className="row">
                            <CommentButton />
                        </div>
                    </div>
            );
        }
        return(<div />);
        }
    
    
function CampsiteInfo(props) {
        if (props.campsite) {
            return (
                <div className="container">
                    <div className="row">
                        <div className="col">
                            <Breadcrumb>
                                <BreadcrumbItem><Link to="/directory">Directory</Link></BreadcrumbItem>
                                <BreadcrumbItem active>{props.campsite.name}</BreadcrumbItem>
                                <hr />
                            </Breadcrumb>
                            <h2>{props.campsite.name}</h2>
                            <hr />
                        </div>
                    </div>
                    <div className="row">
                        <RenderCampsite campsite={props.campsite} />
                        <RenderComments comments={props.comments} />
                        
                    </div>
                    <div className="row">
                        <CommentForm />
                    </div>
                </div>
            );
        }
    return (
        <div />
    );
}

class CommentForm extends Component {
    constructor(props) {
        super(props);

        this.state = {
            rating: '',
            name: '',
            comment: '',
            touched: {
                rating: false,
                name: false,
                comment: false,
            }
        };
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleSubmit(values) {
        console.log("Current state is: " +JSON.stringify(values));
        alert("Current state is: " +JSON.stringify(values));
    }
    
    render() {
        return (
            <div className="container">
                
                    <LocalForm onSubmit={values => this.handleSubmit(values)}>
                        <Row className="form-group">
                            <Col>
                                <Label htmlFor=".rating">Rating</Label>
                                <Control.select model=".rating" className="form-control" name="rating">
                                    <option>1</option>
                                    <option>2</option>
                                    <option>3</option>
                                    <option>4</option>
                                    <option>5</option>
                                </Control.select>
                            </Col>
                        </Row>
                        <Row className="form-group">
                            <Col>
                                <Label htmlFor=".name">Your Name</Label>
                                <Control.text model=".name" className="form-control" id="name" name="name" placeholder="Your Name" />
                            </Col>
                        </Row>
                        <Row className="form-group">
                            <Col>
                                <Label htmlFor="comment">Comment</Label>
                                <Control.textarea model=".feedback" className="form-control" id="feedback" name="feedback" rows="6" />
                            </Col>
                        </Row>
                        <Row className="form-group">
                            <Col>
                                <Button type="submit" color="primary">Submit</Button>
                            </Col>
                        </Row>
                    </LocalForm>
            </div>
        );
    }
}

class CommentButton extends Component {
    render() {
        return (
            <Button outline><i class="fa fa-pencil"></i> Submit Comment</Button>
        );
    }
}

class CommentModal extends Component {


    render() {
        return (
            <div>
            <Modal>
                <ModalHeader>Submit Comment</ModalHeader>
                <ModalBody>
                    <CommentForm />
                </ModalBody>
            </Modal>
            </div>
        );
    }
}


export default CampsiteInfo;