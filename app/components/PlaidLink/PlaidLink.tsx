import * as React from 'react';
import scriptLoader from 'react-async-script-loader';

import { post } from '../../utilities/api';

const plaidLinkUrl = 'https://cdn.plaid.com/link/stable/link-initialize.js';

interface IPlaidLinkProps extends React.Props<any> {
  // Displayed once a user has successfully linked their account
  clientName: string;

  // The Plaid API environment on which to create user accounts.
  env: 'tartan' | 'production';

  // Open link to a specific institution, for a more custom solution
  institution?: string;

  // Set to true to launch Link with longtail institution support enabled
  longtail?: boolean;

  // The public_key associated with your Plaid account
  publicKey: string;

  // The Plaid product you wish to use, either auth or connect.
  product: 'auth' | 'connect';

  // Specify an existing user's public token to launch Link in update mode. This will cause Link to open directly
  // to the authentication step for that user's institution.
  token?: string;

  // A boolean describing whether or not to launch Link with the 'Select Account' pane enabled. Allows users to
  // select an individual account once they've authenticated
  selectAccount?: boolean;

  // Specify a webhook to associate with a user.
  webhook?: string;

  // Called when a user has successfully onboarded their account. The function should expect two arguments, the
  // public_key and a metadata object
  onSuccess: () => void;

  // A function that is called when a user has specifically exited Link flow
  onExit?: () => void;

  // A function that is called when the Link module has finished loading. Calls to plaidLinkHandler.open() prior
  // to the onLoad callback will be delayed until the module is fully loaded.
  onLoad?: () => void;

  // An internal boolean describing whether or not the script has been loaded
  isScriptLoaded?: boolean;

  // An internal boolean describing whether or not the script loaded successfully
  isScriptLoadSucceed?: boolean;

  // An internal function called when the script has finished loading
  onScriptLoaded?: () => void;
}

interface IPlaidLinkState {
  disabledButton?: boolean,
  linkLoaded?: boolean,
}

// TODO: Move this into somewhere which makes sense, maybe.
declare var Plaid: any;

class PlaidLink extends React.Component<IPlaidLinkProps, IPlaidLinkState> {
  linkHandler: any;

  static defaultProps = {
    institution: null,
    longtail: false,
    selectAccount: false,
  };

  constructor(props: IPlaidLinkProps) {
    super(props);

    this.state = {
      // A boolean describing whether the button is clickable
      disabledButton: true,

      // A boolean describing whether Plaid successfully created the Plaid Link module
      linkLoaded: false,
    };
  }

  componentWillReceiveProps({ isScriptLoaded, isScriptLoadSucceed }: IPlaidLinkProps) {
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
