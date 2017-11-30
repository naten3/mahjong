import * as React from 'react';
import { Card, CardContent, CardActions, CardHeader, Button, TextField } from 'material-ui';
import { every } from 'lodash-es';
import { AuthService } from '../../../services';
import { Observable } from 'rxjs/Observable';

type Props = {
  pingAuthentication: () => void;
};
type State = {
  name: string;
  password: string;
  error: boolean;
};
class LoginPage extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = {
      name: '',
      password: '',
      error: false
    };
  }

  authenticate() {
    AuthService.JoinRoom({
      username: this.state.name,
      password: this.state.password
    })
    .catch((err) => {
      return Observable.of(err);
    }).first().subscribe((res) => {
      if (res.status === 204) {
        localStorage.setItem('password', this.state.password);
        localStorage.setItem('name', this.state.name);
        this.props.pingAuthentication();
        this.setState({
          name: '',
          password: '',
          error: false
        });
      } else {
        this.setState({error: true});
      }
    });
  }

  handleChange(key: 'name'|'password', value: string) {
    const state = { ...this.state };
    this.setState({
      ...state,
      [key]: value
    });
  }

  isValid(): boolean {
    return every([this.state.name, this.state.password]);
  }

  render () {
    return (
      <Card>
        <CardHeader
          title={'Join in the fun'}
        />
        <CardContent>
          <TextField
            label="Nickname"
            placeholder="Benjamin Boomin"
            helperText="This will show up with plays"
            margin="normal"
            onChange={(event) => this.handleChange('name', event.target.value)}
          />
          <TextField
            label="Password"
            placeholder="slalomboombox"
            helperText={`That's really ${this.state.error ? 'NOT' : ''} the password`}
            margin="normal"
            onChange={(event) => this.handleChange('password', event.target.value)}
            error={this.state.error}
          />
        </CardContent>
        <CardActions>
          <Button
            dense={true}
            raised={true}
            color={'primary'}
            disabled={!this.isValid()}
            onClick={() => this.authenticate()}
          >
            Join
          </Button>
        </CardActions>
      </Card>
    );
  }
}

export default LoginPage;
