import React, { PropTypes, Component } from 'react';
import scriptLoader from 'react-async-script-loader';

import { post } from 'utilities/api';

const plaidLinkUrl = 'https://cdn.plaid.com/link/stable/link-initialize.js';

class PlaidLink extends Component {
  static propTypes = {
    // Displayed once a user has successfully linked their account
    clientName: PropTypes.string.isRequired,

    // The Plaid API environment on which to create user accounts.
    env: PropTypes.oneOf(['tartan', 'production']).isRequired,

    // Open link to a specific institution, for a more custom solution
    institution: PropTypes.string,

    // Set to true to launch Link with longtail institution support enabled
    longtail: PropTypes.bool,

    // The public_key associated with your Plaid account
    publicKey: PropTypes.string.isRequired,

    // The Plaid product you wish to use, either auth or connect.
    product: PropTypes.oneOf(['auth', 'connect']).isRequired,

    // Specify an existing user's public token to launch Link in update mode. This will cause Link to open directly
    // to the authentication step for that user's institution.
    token: PropTypes.string,

    // A boolean describing whether or not to launch Link with the 'Select Account' pane enabled. Allows users to
    // select an individual account once they've authenticated
    selectAccount: PropTypes.bool,

    // Specify a webhook to associate with a user.
    webhook: PropTypes.string,

    // Called when a user has successfully onboarded their account. The function should expect two arguments, the
    // public_key and a metadata object
    onSuccess: PropTypes.func.isRequired,

    // A function that is called when a user has specifically exited Link flow
    onExit: PropTypes.func,

    // A function that is called when the Link module has finished loading. Calls to plaidLinkHandler.open() prior
    // to the onLoad callback will be delayed until the module is fully loaded.
    onLoad: PropTypes.func,

    // An internal boolean describing whether or not the script has been loaded
    isScriptLoaded: PropTypes.bool,

    // An internal boolean describing whether or not the script loaded successfully
    isScriptLoadSucceed: PropTypes.bool,

    // An internal function called when the script has finished loading
    onScriptLoaded: PropTypes.func,
  };

  static defaultProps = {
    institution: null,
    longtail: false,
    selectAccount: false,
  };

  constructor(props) {
    super(props);

    this.state = {
      // A boolean describing whether the button is clickable
      disabledButton: true,

      // A boolean describing whether Plaid successfully created the Plaid Link module
      linkLoaded: false,
    };
  }

  componentWillReceiveProps({ isScriptLoaded, isScriptLoadSucceed }) {
    if (isScriptLoaded && isScriptLoadSucceed) {
      this.linkHandler = Plaid.create({  // eslint-disable-line no-undef
        clientName: this.props.clientName,
        env: this.props.env,
        key: this.props.publicKey,
        longtail: this.props.longtail,
        product: this.props.product,
        token: this.props.token,
        selectAccount: this.props.selectAccount,
        webhook: this.props.webhook,
        onSuccess: this.handleOnSuccess,
        onLoad: this.handleLinkOnLoad,
        onExit: this.props.onExit,
      });

      this.setState({ disabledButton: false });
    }
  }

  handleLinkOnLoad = () => {
    if (this.props.onLoad) {
      this.props.onLoad();
    }

    this.setState({ linkLoaded: true });
  }

  handleOnClick = () => {
    const institution = this.props.institution || null;
    if (this.props.isScriptLoaded && this.props.isScriptLoadSucceed) {
      this.linkHandler.open(institution);
    } else {
       // TODO: Figure out something to do here.
    }
  }

  handleOnSuccess = async (token, metadata) => {
    const institution = metadata.institution.type;

    try {
      await post('/api/financial/token/convert', { token, institution });
      this.props.onSuccess();
    } catch (e) {
      console.error(e);
      return;
    }
  };

  render() {
    return (
      <button
        onClick={this.handleOnClick}
        disabled={this.state.disabledButton}
        {...this.props}
      >
        <span>Plaid Link</span>
      </button>
    );
  }
}

export default scriptLoader(plaidLinkUrl)(PlaidLink);
