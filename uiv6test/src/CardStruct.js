import React from 'react'
import { Card, CardActions, CardHeader, CardMedia, CardTitle, CardText } from 'material-ui/Card'
import FlatButton from 'material-ui/FlatButton'

const CardExampleWithAvatar = (props) => (
  <div style={{ width:500 }}>
    <Card>
      <CardTitle title={props.name} subtitle= {props.owner} />
      <CardText>
        <div className='CardStruct-Name' >
Name:  {props.name}
          <br />
          <br />
        </div>
        <div className='CardStruct-Price' >
Price:{props.price} ETH
          <br />
          <br />
        </div>
      </CardText>
      <CardActions>
        <FlatButton label='Buy' />
      </CardActions>
    </Card>
  </div>
)
export default CardExampleWithAvatar
