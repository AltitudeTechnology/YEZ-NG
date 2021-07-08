import React from 'react'
import Dialog from 'material-ui/Dialog'
import RaisedButton from 'material-ui/RaisedButton'
import MuiThemeProvider from "material-ui/styles/MuiThemeProvider"
import getMuiTheme from 'material-ui/styles/getMuiTheme' 
import TextField from 'material-ui/TextField'
import SelectField from 'material-ui/SelectField'
import MenuItem from 'material-ui/MenuItem'
import {Tabs, Tab} from 'material-ui/Tabs'
import SwipeableViews from 'react-swipeable-views'
import { LoginModalContext } from '../../contexts/LoginModalContext'
import LoginButton from './LoginButton'
import RegisterButton from './RegisterButton'

const EMAIL_REGEX = new RegExp(/^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/);
const muiThemebtn = getMuiTheme()
const customContentStyle = {
  maxWidth: '40%',
};
const style = {
  margin: 12,
};
const styles = {
  headline: {
    fontSize: 24,
    paddingTop: 16,
    marginBottom: 12,
    fontWeight: 400,
  },
  slide: {
    paddingTop : 10,
    paddingBottom: 0,
    height : 325
  },
  tab: {
    backgroundColor : '#fff',
    color : '#646666'
  },
};

/**
 * A modal dialog can only be closed by selecting one of the actions.
 */
export default class CandidateModal extends React.Component {
  constructor({props}){
    super(props) ;
    this.showLoginError = this.showLoginError.bind(this);
    this.showLoginMessage = this.showLoginMessage.bind(this);
    this.showRegisterError = this.showRegisterError.bind(this);
    this.showRegisterMessage = this.showRegisterMessage.bind(this);
  }
  state = {
    username : '',
    password : '',
    usernameError : '',
    passwordError : '',
    regFullname : '' ,
    regEmail : '' ,
    regPassword : '' ,
    loginErrorText: '',
    loginSuccessText: '',
    registerErrorText: '',
    registerSuccessText: ''
  };

  usernameText = (event) => {
    this.setState({username : event.target.value})
    EMAIL_REGEX.test(this.state.username)? this.setState({usernameError:''}):this.setState({usernameError:'Invalid Email'})
  };

  showLoginError = (message) => {
    this.setState({loginErrorText: message})
    setTimeout(()=>{ this.setState({loginErrorText: ''}) },10*1000)
  }
  showLoginMessage = (message) => {
    this.setState({loginSuccessText: message})
  }

  showRegisterError = (message) => {
    this.setState({registerErrorText: message})
    setTimeout(()=>{ this.setState({registerErrorText: ''}) },5*1000)
  }
  showRegisterMessage = (message) => {
    this.setState({registerSuccessText: message})
  }

  render() {

    return (
      <LoginModalContext.Consumer>{
          ({slideIndex, handleTabChange, registerType, changeRegisterType, REGISTER_TYPES}) => {

            const actions = [
              (slideIndex == 0 ?
                <LoginButton {...this.state}
                  showLoginError={this.showLoginError}
                  showLoginMessage={this.showLoginMessage}
                />
                :
                <RegisterButton
                  REGISTER_TYPES={REGISTER_TYPES}
                  registerType={registerType}
                  showRegisterError={this.showRegisterError}
                  showRegisterMessage={this.showRegisterMessage}
                  {...this.state}/>
                ),
              <RaisedButton
                label="Cancel"
                style={style}
                backgroundColor='#DE5246'
                labelColor='rgb(255,255,255)'
                onClick={this.props.close}
              />
            ];

            return (
            <MuiThemeProvider muiTheme={muiThemebtn}>
              {/* <RaisedButton label="Modal Dialog" onClick={this.handleOpen} /> */}
              <Dialog
                style={{zIndex : 1000}}
                actions={actions}
                modal={true}
                open={this.props.isOpen}
                contentStyle={customContentStyle}
                >
                <Tabs
                  onChange={handleTabChange}
                  value={slideIndex}
                  inkBarStyle={{
                    color: '#ff5722',
                    backgroundColor: '#ff5722'
                  }}
                  >
                    <Tab label="Login" value={0} style={styles.tab} />
                    <Tab label="Signup" value={1} style={styles.tab}/>
                  </Tabs>
                  <SwipeableViews
                    index={slideIndex}
                    onChangeIndex={handleTabChange}
                    >
                      <div style={styles.slide}>
                        <TextField
                          underlineFocusStyle={{borderColor: "#26985E"}}
                          floatingLabelFocusStyle={{color: "#26985E"}}
                          fullWidth={true}
                          // errorText={this.state.usernameError}
                          value={this.state.username}
                          onChange={this.usernameText.bind(this)}
                          floatingLabelText="Email"
                          type="text"
                        />
                        <TextField
                          underlineFocusStyle={{borderColor: "#26985E"}}
                          floatingLabelFocusStyle={{color: "#26985E"}}
                          fullWidth={true}
                          value={this.state.password}
                          onChange={(e) => this.setState({password : e.target.value})}
                          errorText={this.state.passwordError}
                          floatingLabelText="Password"
                          type="password"
                        />
                        {this.state.loginErrorText && (
                          <p className='login-error-text'><strong>ERROR: </strong>{this.state.loginErrorText}</p>
                        )}
                        {this.state.loginSuccessText && (
                          <p className='login-success-text'><strong>SUCCESS: </strong>{this.state.loginSuccessText}</p>
                        )}

                      </div>
                      <div style={styles.slide}>
                        <TextField
                          underlineFocusStyle={{borderColor: "#268C95"}}
                          floatingLabelFocusStyle={{color: "#268C95"}}
                          style={styles.textfield}
                          // hintText={registerType == 0 ? 'e.g John Doe' : registerType == 1 ? 'e.g Google'  : 'Adviser Fullname'}
                          fullWidth={true}
                          errorText=''
                          value={this.state.regFullname}
                          onChange={(e) => this.setState({regFullname : e.target.value})}
                          floatingLabelText={registerType == 0 ? 'Fullname' : registerType == 1 ? 'Institution Name'  : 'Adviser Fullname'}
                          type="text"
                        />
                        <TextField
                          underlineFocusStyle={{borderColor: "#268C95"}}
                          floatingLabelFocusStyle={{color: "#268C95"}}
                          // hintText="example@gmail.com"
                          fullWidth={true}
                          errorText=''
                          value={this.state.regEmail}
                          onChange={(e) => this.setState({regEmail : e.target.value})}
                          floatingLabelText="Email"
                          type="text"
                        />
                        <TextField
                          underlineFocusStyle={{borderColor: "#268C95"}}
                          floatingLabelFocusStyle={{color: "#268C95"}}
                          // hintText="Password"
                          fullWidth={true}
                          value={this.state.regPassword}
                          onChange={(e) => this.setState({regPassword : e.target.value})}
                          errorText=''
                          floatingLabelText="Password"
                          type="password"
                        />
                        <SelectField
                          floatingLabelText="Register As"
                          selectedMenuItemStyle={{color: "#ff5722"}}
                          value={registerType}
                          onChange={changeRegisterType}
                          fullWidth={true}
                          >
                            {REGISTER_TYPES.map((type, index) => <MenuItem value={index} primaryText={type} />)}
                          </SelectField>
                          {this.state.registerErrorText && (
                            <p className='login-error-text'>{this.state.registerErrorText}</p>
                          )}
                          {this.state.registerSuccessText && (
                            <p className='login-success-text'>{this.state.registerSuccessText}</p>
                          )}
                        </div>
                      </SwipeableViews>
                      <style jsx>{`
                        .login-error-text {
                          padding-top: 10px;
                          color: #ec1818;
                          text-size-adjust: 100%;
                          font-family: Roboto,sans-serif;
                          font-size: 16px;
                          line-height: 1.6;
                          word-wrap: break-word;
                        }
                        .login-success-text {
                          padding-top: 10px;
                          color: #094211;
                          text-size-adjust: 100%;
                          font-family: Roboto,sans-serif;
                          font-size: 16px;
                          line-height: 1.6;
                          word-wrap: break-word;
                        }
                        ::-webkit-scrollbar {
                          width: 3px;
                        }
                        ::-webkit-scrollbar-track {
                          webkit-box-shadow: inset 0 0 6px #e3ebef;
                          -webkit-border-radius: 10px;
                          border-radius: 10px;
                          background: #e3ebef;
                        }
                        ::-webkit-scrollbar-thumb {
                          -webkit-border-radius: 10px;
                          border-radius: 10px;
                          background: #9fb6c3;
                          -webkit-box-shadow: none;
                        }
                        ::-webkit-scrollbar-thumb:window-inactive {
                          background: #9fb6c3;
                        }
                        `}</style>
                    </Dialog>
                  </MuiThemeProvider>

          )}
      }</LoginModalContext.Consumer>
    );
  }
}
