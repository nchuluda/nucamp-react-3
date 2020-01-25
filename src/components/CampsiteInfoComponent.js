import React, { Component } from 'react';
import { Card, CardImg, CardText, CardBody,  Breadcrumb, BreadcrumbItem, Button, Modal, ModalHeader, ModalBody, Col, Row, Label } from 'reactstrap';
import { Link } from 'react-router-dom';
import { Control, LocalForm, Errors } from 'react-redux-form';
import { Loading } from './LoadingComponent';
import { baseUrl } from '../shared/baseUrl';
import { FadeTransform, Fade, Stagger } from 'react-animation-components';


const maxLength = len => val => !val || (val.length <= len);
const minLength = len => val => val && (val.length >= len);

function RenderCampsite({campsite}) {
        return(
            <div className="col-md-5 m-1">
                <FadeTransform
                in
                transformProps={{
                    exitTransform: 'scale(0.5) translateY(-50%)'
                }}>   
                    <Card>
                        <CardImg top src={baseUrl + campsite.image} alt={campsite.name} />
                        <CardBody>
                        
                        <CardText>{campsite.description}</CardText>
                        </CardBody>
                    </Card>
                </FadeTransform>
            </div>        
        );
    }

function RenderComments({comments, postComment, campsiteId}) {
        if (comments) {
            return(
                    <div className="col-md-5 m-1">
                        <div className="row">
                        <h4>Comments</h4>
                        
                        </div>
                        <div className="row">
                            <Stagger in>
                            {comments.map(comment => {
                                return(
                                    <Fade in key={comment.id}>
                                    <div>
                                        <p>{comment.text}<br />{comment.author}, {new Intl.DateTimeFormat('en-US', { year: 'numeric', month: 'short', day: '2-digit'}).format(new Date(Date.parse(comment.date)))}</p>
                                        
                                    </div>
                                    </Fade>
                                );
                            })}
                            </Stagger>
                        </div>
                        <div className="row">
                        <CommentForm campsiteId={campsiteId} postComment={postComment} />
                        </div>
                    </div>
            );
        }
        return(<div />);
        }
    
    
function CampsiteInfo(props) {
    if (props.isLoading) {
        return (
        <div className="contianer">
            <div className="row">
                <Loading />
            </div>
        </div>
        );
    }
    if (props.errMess) {
        return (
            <div className="container">
                <div className="row">
                    <div className="col">
                        <h4>{props.errMess}</h4>
                    </div>
                </div>
            </div>
        );
    }
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
                        <RenderComments 
                        comments={props.comments}
                        postComment={props.postComment}
                        campsiteId={props.campsite.id}
                    />
                        
                    </div>
                    <div className="row">
                        
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
            isModalOpen: false,
        };
        this.toggleModal = this.toggleModal.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    toggleModal() {
        this.setState({
            isModalOpen: !this.state.isModalOpen
        });
    }

    handleSubmit(values) {
        this.toggleModal();
        this.props.postComment(this.props.campsiteId, values.rating, values.name, values.comment);
    }
    
    render() {
        return (
            <div className="container">
                <Button outline onClick={this.toggleModal}><i class="fa fa-pencil"></i> Submit Comment</Button>
                <Modal isOpen={this.state.isModalOpen} toggle={this.toggleModal}>
                 <ModalHeader toggle={this.toggleModal}>Submit Comment</ModalHeader>
                    <ModalBody>
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
                                    <Control.text model=".name" className="form-control" id="name" name="name" placeholder="Your Name"
                                        validators={{
                                            minLength: minLength(2),
                                            maxLength: maxLength(15)
                                        }} />
                                        <Errors 
                                        className="text-danger"
                                        model=".name"
                                        show="touched"
                                        component="div"
                                        messages={{
                                            minLength: 'Must be at least 2 characters',
                                            maxLength: 'Must be 15 characters or less'
                                        }}
                                    />
                                </Col>
                            </Row>
                            <Row className="form-group">
                                <Col>
                                    <Label htmlFor="comment">Comment</Label>
                                    <Control.textarea model=".comment" className="form-control" id="comment" name="comment" rows="6" />
                                </Col>
                            </Row>
                            <Row className="form-group">
                                <Col>
                                    <Button type="submit" color="primary" onClick={this.toggleModal}>Submit</Button>
                                </Col>
                            </Row>
                        </LocalForm>
                    </ModalBody>
                </Modal>
            </div>
        );
    }
}






export default CampsiteInfo;