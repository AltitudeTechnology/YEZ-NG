import { Component } from 'react'
import { Mutation, withApollo } from 'react-apollo';
import cookie from 'cookie'
import RaisedButton from 'material-ui/RaisedButton';

import { ToastContainer, toast} from 'react-toastify'
import { TOAST_STYLE } from '../../utils/common'
import redirect from '../../lib/auth/redirect'

import { SIGNUP_CANDIDATE_MUTATION, SIGNUP_INSTITUTION_MUTATION } from '../../lib/graphql/mutations'


export default withApollo(
  class RegisterButton extends Component{

    onsignUpCompleted = (data) => {
      const { REGISTER_TYPES, registerType } = this.props;

      let user, target;

      if (REGISTER_TYPES[registerType]=='Candidate') {
         user=data.candidateCreateAccount;
         target = `/user/dashboard`;
         document.cookie = cookie.serialize('userType', 'PretCandidate', {
           maxAge: 30 * 24 * 60 * 60 // 30 days
         })
       }
       // TODO
      if (REGISTER_TYPES[registerType]=='Institution') {
         user=data.institutionCreateAccount;
         target = `/institution/dashboard`;
         document.cookie = cookie.serialize('userType', 'Institution', {
           maxAge: 30 * 24 * 60 * 60 // 30 days
         })
       }

      // Store the token in cookie
      const {jwt, name} = user;
      // toast(`Welcome Back ${last}!`, {...TOAST_STYLE.success});
      console.log(`Welcome Back ${name}!`);
      this.props.showRegisterMessage(`Welcome ${name}!`)
      document.cookie = cookie.serialize('token', jwt, {
        maxAge: 30 * 24 * 60 * 60 // 30 days
      })
      // Force a reload of all the current queries now that the user is
      // logged in
      this.props.client.resetStore().then(() => {
        redirect({}, target)
      })
    }

    onsignUpError = (error) => {
      // If you want to send error to external service?
      console.log(error)
      if (error.graphQLErrors.length==0)
        this.props.showRegisterError("Something went wrong while contacting the server")
        // toast("Something Went Wrong With your request", {...TOAST_STYLE.fail});

      error.graphQLErrors.forEach(error=>{
        switch(error.message) {
          case `password incorrect`:
          this.props.showRegisterError("Incorrect username/password")
          // toast("Incorrect username/password", {...TOAST_STYLE.fail});
          break;
          case `email/user not found`:
          this.props.showRegisterError("Incorrect username/password")
          // toast("Incorrect username/password", {...TOAST_STYLE.fail});
          break;
          default:
          this.props.showRegisterError("Something went wrong while contacting the server")
          // toast("Something Went Wrong", {...TOAST_STYLE.fail});
        }
      })
    }

    dosignUp = (event, runMutation, doRegistrationAs) => {
      event.preventDefault()
      event.stopPropagation()

      let variables;
      const { regFullname, regEmail, regPassword } = this.props;

      const names = regFullname.split(' ', 2)

      doRegistrationAs=='Candidate' && (variables={
        firstName: names[0],
        lastName: names[1],
        email: regEmail,
        password: regPassword
      });
      doRegistrationAs=='Institution' && (variables={
        name: regFullname,
        email: regEmail,
        password: regPassword
      });

      // if(this.props.fullnameError.length < 1 ){
        runMutation({
          variables
        })
      // } else {
      //   if (!this.props.phone || !this.props.phoneValid) {
      //     this.setState({phoneValid: false})
      //   }
      //   if (!this.props.password) {
      //     this.setState({passwordValid: false})
      //   }
      //
      //   toast("Your Inputs are not valid", {...TOAST_STYLE.fail});
      // }

    }

    render(){
      const { REGISTER_TYPES, registerType } = this.props;
      // console.log(REGISTER_TYPES[registerType]);
      let mutation = SIGNUP_CANDIDATE_MUTATION;
      REGISTER_TYPES[registerType]=='Candidate' && (mutation=SIGNUP_CANDIDATE_MUTATION);
      REGISTER_TYPES[registerType]=='Institution' && (mutation=SIGNUP_INSTITUTION_MUTATION);
      // REGISTER_TYPES[registerType]=='Career Adviser' && (mutation=LOGIN_USER_MUTATION);

      return <Mutation mutation={mutation}
        onCompleted={this.onsignUpCompleted}
        onError={this.onsignUpError}>
        {(doMutation) => (
            <RaisedButton
            label='Register'
            backgroundColor="#13828C"
            labelColor='rgb(255,255,255)'
            onClick={e=>this.dosignUp(e, doMutation, REGISTER_TYPES[registerType])}
          />
        )}
      </Mutation>
    }
  }
)
