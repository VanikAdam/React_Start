import React, { memo } from 'react';
import images from './../pic/Pic';
import style from './Task.module.css'
import { Card, Form } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faWindowClose } from '@fortawesome/free-solid-svg-icons'

function Task(props) {
    return (
        <Card style={{ width: '15rem' }}>
            <Form>
                <Form.Check
                    type="switch"
                    id={'z'+props.id}
                    label="Check this switch"

                />
           </Form>
            <Card.Img style={{ width: '5rem' }} variant="top-left" src={images[props.elem.icon]} />
            <Card.Text style={{ position: 'absolute', top: '30px', right: '20%' }}>
                {props.elem.weather}
            </Card.Text>
            <Card.Body>
                <Card.Title>{props.elem.date}</Card.Title>
                <Card.Text>
                    {props.elem.text}
                </Card.Text>
                <FontAwesomeIcon icon={faWindowClose} onClick={props.remove(props.id)} className={style.taskClose} />
            </Card.Body>
        </Card>
    );
}
export default memo(Task);