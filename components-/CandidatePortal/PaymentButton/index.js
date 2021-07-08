import { Component } from 'react';
// import PaystackButton from 'react-paystack';
import PaystackButton from './PaystackButton';
import { Mutation } from 'react-apollo';

import { CREATE_PAYMENT_MUTATION } from '../../../lib/graphql/mutations'
import { PAYMENT_PAGE_QUERY } from '../../../lib/graphql/queries'

//const PAYSTACK_PUBLIC_KEY = 'pk_test_43f8936830aea3a5b9838c4893b16c9f1e7dee34';
const PAYSTACK_PUBLIC_KEY = 'pk_live_ec169fc011a4a8a16544c851b69a5c89571f46a7 ';

export default class PaymentButton extends Component {

	state = {
		key: PAYSTACK_PUBLIC_KEY, // PAYSTACK PUBLIC KEY
		email: this.props.email,  // customer email
		amount: this.props.amount, // equals NGN100,
		message: ''
	}

	componentDidMount(){
		let paystackInline = document.createElement('script')
		paystackInline.src = 'https://js.paystack.co/v1/inline.js'

    document.getElementById('paystack-script').appendChild(paystackInline)
	}

	callback = (response, runMutation) => {
		// console.log(response); // card charged successfully, get reference here
		this.setState({message: ''})
		if (response.reference) {//successfully
			runMutation({
				variables: {
					paystackReference: response.reference
				}
			})
		}
	}

	close = () => {
		console.log("Payment closed");
		this.setState({message: ''})
	}

	getReference = () => {
		//you can put any unique reference implementation code here
		let text = "";
		let possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789-.=";

		for( let i=0; i < 15; i++ )
			text += possible.charAt(Math.floor(Math.random() * possible.length));

		return text;
	}

	onMutationCompleted = (cache, { data: { candidateFindOrCreatePaymentRecord } }) => {
		// Read the data from our cache for this query.
		const data = cache.readQuery({ query: PAYMENT_PAGE_QUERY });

		// Add the new education to PAYMENT_PAGE_QUERY
		data.viewerCandidate.candidate.payments = [
			candidateFindOrCreatePaymentRecord,
			...data.viewerCandidate.candidate.payments
		];

		// Write our data back to the cache.
		cache.writeQuery({ query: PAYMENT_PAGE_QUERY, data });
		//add payment to top of candidate payments
	}

	setMessage = (message)=>this.setState({message})

  render() {
		const {message} = this.state;
    return (
      // <div onClick={()=>this.setState({message: 'Contacting payment server please wait!'})}>
      <div>
				<div id="paystack-script"/>
				<Mutation mutation={CREATE_PAYMENT_MUTATION}
					update={this.onMutationCompleted}
					onError={(error) => {
          	console.log(error)
        	}}>
					{(candidateFindOrCreatePaymentRecord, {data, error}) => (
						<p className="pay-section">
							{message ? (
								<div className="spinner">
									<div className="rect1"></div>
									<div className="rect2"></div>
									<div className="rect3"></div>
									<div className="rect4"></div>
									<div className="rect5"></div>
								</div>
							) : (
								<PaystackButton
									text="Pay Now"
									btnClassName="payButton"
									callback={(response)=>{this.callback(response, candidateFindOrCreatePaymentRecord)}}
									close={this.close}
									disabled={this.props.disabled}
									embed={false}
									reference={this.getReference()}
									email={this.state.email}
									amount={this.state.amount}
									paystackkey={this.state.key}
									setMessage={this.setMessage}
									coupon={this.props.coupon}
									priceId={this.props.priceId}
								/>
							)}
							{error && <p>:( There was an generating your test code visit out help center here to resolve the issue</p>}
							{/* {message && <p className="payment-message">{message}</p>} */}
						</p>
					)}
				</Mutation>
				<style global jsx>{`
					// .pay-section{
					// 	display: inline;
					// }
					.payment-message {
						color: #3c763d;
					}
					.payButton {
						color: black;
					}
					.spinner {
					  // margin: 100px auto;
					  width: 50px;
					  height: 40px;
					  text-align: center;
					  font-size: 10px;
					}

					.spinner > div {
					  background-color: #00bcd4;
					  // background-color: #09925E;
					  // background-color: #ffffff;
					  height: 100%;
					  width: 6px;
					  display: inline-block;

					  -webkit-animation: sk-stretchdelay 1.2s infinite ease-in-out;
					  animation: sk-stretchdelay 1.2s infinite ease-in-out;
					}

					.spinner .rect2 {
					  -webkit-animation-delay: -1.1s;
					  animation-delay: -1.1s;
					}

					.spinner .rect3 {
					  -webkit-animation-delay: -1.0s;
					  animation-delay: -1.0s;
					}

					.spinner .rect4 {
					  -webkit-animation-delay: -0.9s;
					  animation-delay: -0.9s;
					}

					.spinner .rect5 {
					  -webkit-animation-delay: -0.8s;
					  animation-delay: -0.8s;
					}

					@-webkit-keyframes sk-stretchdelay {
					  0%, 40%, 100% { -webkit-transform: scaleY(0.4) }
					  20% { -webkit-transform: scaleY(1.0) }
					}

					@keyframes sk-stretchdelay {
					  0%, 40%, 100% {
					    transform: scaleY(0.4);
					    -webkit-transform: scaleY(0.4);
					  }  20% {
					    transform: scaleY(1.0);
					    -webkit-transform: scaleY(1.0);
					  }
					}
				`}</style>
      </div>
    );
  }
}
