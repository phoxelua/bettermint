import React from 'react';
import { Link } from 'react-router';

const IndexView = () => {
  return (
    <div>
      <h1>Mint, but better</h1>
      <div>
        <h5>
          Manage your money automatically, the way you want to.
        </h5>
      </div>
      <div>
        <Link to={"/login"}>Get Started</Link>
      </div>
      <div>
        <div>
          <h5>Organize your transactions</h5>
          <p>
            Use Venmo, Square Cash, or other social payment platforms? We"ll take care of you.
            Split and recategorize your payments and credits however you"d like.
          </p>
        </div>
        <div>
          <h5>Build your financial goals</h5>
          <p>
            Keep track of whatever you what to.
            Your goals can be spending or saving across any types of accounts and any types of transactions.
          </p>
        </div>
        <div>
          <h5>Save more money</h5>
          <p>
            With your help, we can analyze your transactions and goals to help you achieve your goals faster.
          </p>
        </div>
      </div>
    </div>
  );
};

export default IndexView;
